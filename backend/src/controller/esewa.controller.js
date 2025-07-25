import axios from "axios";
import { Transaction } from "../models/Transaction.model.js";
import User from "../models/user.model.js";
import {
  generateHmacSha256Hash,
  safeStringify,
} from "../utils/esewaSecurity.js";
import { sendNotification } from "../utils/notification.utility.js";

export const handleInitialPayment = async (req, res) => {
  console.log("function ewnter");
  const user = await User.findById(req.userId).select("-password");
  console.log(user);
  console.log("working brto ");
  console.log("process.env.FAILURE_URL", process.env.FAILURE_URL);
  console.log("MERCHANT_ID", process.env.MERCHANT_ID);
  console.log("success_url", process.env.SUCCESS_URL);
  console.log("req.body", req.body);
  const { amount, productId, transactionId } = req.body;
  let paymentData = {
    amount,
    failure_url: process.env.FAILURE_URL,
    product_delivery_charge: "0",
    product_service_charge: "0",
    product_code: process.env.MERCHANT_ID,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    success_url: process.env.SUCCESS_URL,
    tax_amount: "0",
    total_amount: amount,
    transaction_uuid: transactionId,
  };
  console.log("paymentData", paymentData);
  const data = `total_amount=${paymentData.total_amount},transaction_uuid=${paymentData.transaction_uuid},product_code=${paymentData.product_code}`;
  const signature = generateHmacSha256Hash(data, process.env.SECRET);
  console.log("signature", signature);
  paymentData = { ...paymentData, signature };
  try {
    const payment = await axios.post(process.env.ESEWAPAYMENT_URL, null, {
      params: paymentData,
    });

    // const payment = await axios.post(process.env.ESEWAPAYMENT_URL,
    //   qs.stringify(paymentData), // form-encoded body
    //   {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     }
    //   }
    // );

    const reqPayment = JSON.parse(safeStringify(payment));
    if (reqPayment.status === 200) {
      const transaction = new Transaction({
        product_id: productId,
        amount: amount,
        user_id: user._id, // Assuming user ID is available in req.user
        paymentMethod: "esewa",
        transaction_uuid: transactionId,
      });
      await transaction.save();
      return res.send({
        url: reqPayment.request.res.responseUrl,
      });
    }
  } catch (error) {
    console.log("error", error);
    res.send(error);
  }
};
// Route to handle payment status update
export const paymentStatus = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  console.log(user);
  const { transactionId } = req.body; // Extract data from request body
  console.log("req.body in the payment status ", req.body);
  console.log("transactionId", transactionId);

  try {
    // Find the transaction by its signature
    const transaction = await Transaction.findOne({
      transaction_uuid: transactionId,
    });

    console.log("transaction inside of the paymeny status", transaction);
    if (!transaction) {
      return res.status(400).json({ message: "Transaction not found" });
    }
    const paymentData = {
      product_code: "EPAYTEST",
      total_amount: transaction.amount,
      transaction_uuid: transaction.transaction_uuid,
    };
    const response = await axios.get(
      process.env.ESEWAPAYMENT_STATUS_CHECK_URL,
      {
        params: paymentData,
      }
    );
    const paymentStatusCheck = JSON.parse(safeStringify(response));
    if (paymentStatusCheck.status !== 200) {
      const result = await sendNotification({
        userId: user._id,
        topic: "Esewa Transaction Failed",
        message: `Your transaction with esewa has been failed`,
        image:
          "https://e7.pngegg.com/pngimages/261/608/png-clipar…play-iphone-iphone-electronics-text-thumbnail.png",
      });
      console.log("Transaction Failed", result);
      return res.status(400).json({ message: "Transaction Failed" });
    }
    // Update the transaction status
    transaction.status = paymentStatusCheck.data.status;
    await transaction.save();
    const result = await sendNotification({
      userId: user._id,
      topic: "Esewa Transaction Completed",
      message: `Your transaction has been completed using esewa`,
      image:
        "https://e7.pngegg.com/pngimages/261/608/png-clipar…play-iphone-iphone-electronics-text-thumbnail.png",
    });
    return res
      .status(200)
      .json({ message: "Transaction status updated successfully" });
  } catch (error) {
    console.error("Error updating transaction status:", error);
    const result = await sendNotification({
      userId: user._id,
      topic: "Esewa Transaction Failed",
      message: `Your transaction with esewa has been failed`,
      image:
        "https://e7.pngegg.com/pngimages/261/608/png-clipar…play-iphone-iphone-electronics-text-thumbnail.png",
    });

    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getTransactionHistory = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    const transactions = await Transaction.find({ user_id: user._id }).populate(
      "product_id user_id"
    ); // Assuming product_id has name and price fields
    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
