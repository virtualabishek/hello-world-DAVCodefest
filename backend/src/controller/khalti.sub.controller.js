// const axios = require("axios");
import axios from "axios";

async function verifyKhaltiPayment(pidx) {
  try {
    let headersList = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
    };

    let bodyContent = JSON.stringify({
      pidx,
    });

    let reqOptions = {
      url: `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/lookup/`,
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

async function initializeKhaltiPayment({
  return_url,
  website_url,
  amount,
  purchase_order_id,
  purchase_order_name,
}) {
  try {
    console.log("initialize khalti");
    let headersList = {
      Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      return_url,
      website_url,
      amount,
      purchase_order_id,
      purchase_order_name,
    });

    let reqOptions = {
      url: `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/initiate/`,
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    console.log("Request Options:", reqOptions); // Debugging

    let response = await axios.request(reqOptions);
    return response.data;
  } catch (error) {
    console.error("Error initializing Khalti payment:", error); // Debugging
    throw error.response?.data || error.message;
  }
}

export { initializeKhaltiPayment, verifyKhaltiPayment };
