import { Payment } from "../models/payment.model.js";
import { PurchasedItem } from "../models/purchasedItem.model.js";
import User from "../models/user.model.js";
import { sendNotification } from "../utils/notification.utility.js";
import {
  initializeKhaltiPayment,
  verifyKhaltiPayment,
} from "./khalti.sub.controller.js";

// app.post("/initialize-khalti",
export const initializeKhalti = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");

  try {
    //try catch for error handling
    const { itemId, totalPrice, website_url } = req.body;
    // const itemData = await Item.findOne({
    //   _id: itemId,
    //   price: Number(totalPrice),
    // });

    if (!itemId || !totalPrice || !website_url) {
      return res.status(400).send({
        success: false,
        message: "item not found",
      });
    }

    const purchasedItemData = await PurchasedItem.create({
      item: itemId,
      paymentMethod: "khalti",
      totalPrice: totalPrice,
      user_id: user._id, // Assuming user ID is available in req.user
    });

    const paymentInitate = await initializeKhaltiPayment({
      amount: totalPrice * 100, // amount should be in paisa (Rs * 100)
      purchase_order_id: purchasedItemData._id,
      purchase_order_name: "sample",
      return_url: `${process.env.BACKEND_URI}/khalti/complete-khalti-payment`,
      website_url,
    });
    if (!paymentInitate) {
      const result = await sendNotification({
        userId: user._id,
        topic: "Khalti  Transaction Failed",
        message: `Your transaction with khalti has been failed`,
        image:
          "https://png.pngtree.com/png-clipart/20190516/original/pngtree-check-mark-icon-design-template-vector-isolated-png-image_4085369.jpg",
      });

      return res
        .status(400)
        .json({
          data: { payment: { payment_url: `${process.env.FAILURE_URL}` } },
        });
    }

    res.json({
      success: true,
      purchasedItemData,
      payment: paymentInitate,
    });
  } catch (error) {
    // res.json({
    //   success: false,
    //   error,
    // });
    const result = await sendNotification({
      userId: user._id,
      topic: "Khalti  Transaction Failed",
      message: `Your transaction with khalti has been failed`,
      image:
        "https://techsathi.com/wp-content/uploads/2021/06/Khalti-1024x640.jpg",
    });

    res.render("failure.ejs");
  }
};
//app.get("/complete-khalti-payment",
export const completeKhaltiPayment = async (req, res) => {
  const {
    pidx,
    txnId,
    amount,
    mobile,
    purchase_order_id,
    purchase_order_name,
    transaction_id,
  } = req.query;
  const user = await User.findById(req.userId).select("-password");

  try {
    const paymentInfo = await verifyKhaltiPayment(pidx);

    // Check if payment is completed and details match
    if (
      paymentInfo?.status !== "Completed" ||
      paymentInfo.transaction_id !== transaction_id ||
      Number(paymentInfo.total_amount) !== Number(amount)
    ) {
      // return res.status(400).json({
      //   success: false,
      //   message: "Incomplete information",
      //   paymentInfo,
      // });
      const result = await sendNotification({
        userId: user._id,
        topic: "Khalti  Transaction Failed",
        message: `Your transaction with khalti has been failed`,
        image:
          "https://techsathi.com/wp-content/uploads/2021/06/Khalti-1024x640.jpg",
      });

      return res.render("failure.ejs");
    }

    // Check if payment done in valid item
    const purchasedItemData = await PurchasedItem.find({
      _id: purchase_order_id,
      totalPrice: amount,
    });

    if (!purchasedItemData) {
      return res.status(400).send({
        success: false,
        message: "Purchased data not found",
      });
    }
    await PurchasedItem.findByIdAndUpdate(
      purchase_order_id,

      {
        $set: {
          status: "completed",
        },
      }
    );

    // Create a new payment record
    const paymentData = await Payment.create({
      pidx,
      transactionId: transaction_id,
      productId: purchase_order_id,
      amount: amount / 100,
      dataFromVerificationReq: paymentInfo,
      apiQueryFromUser: req.query,
      paymentGateway: "khalti",
      status: "success",
      userId: user._id, // Assuming user ID is available in req.user
    });

    // Send success response

    // res.json({
    //   success: true,
    //   message: "Payment Successful",
    //   paymentData,
    // });
    console.log("paymentData", paymentData);
    const result = await sendNotification({
      userId: user._id,
      topic: "Khalti  Transaction Success",
      message: `Your transaction with khalti has been Successed`,
      image:
        "https://techsathi.com/wp-content/uploads/2021/06/Khalti-1024x640.jpg",
    });

    return res.render("success.ejs", { paymentData });
    // return res.status(200).json({
    //       success: true,
    //       message: "Payment Successful",
    //       paymentData,
    //       url:`${FRONTEND_URI}/khalti/success`,
    //     });
  } catch (error) {
    console.error(error);
    // res.status(500).json({
    //   success: false,
    //   message: "An error occurred",
    //   error,
    // });
    const result = await sendNotification({
      userId: user._id,
      topic: "Khalti  Transaction Failed",
      message: `Your transaction with khalti has been failed`,
      image:
        "https://techsathi.com/wp-content/uploads/2021/06/Khalti-1024x640.jpg",
    });

    return res.render("failure.ejs");
  }
};

export const getKhaltiPayment = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  try {
    const payments = await Payment.find({ userId: user._id })
      .populate("productId  userId")
      .sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching Khalti payments:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
