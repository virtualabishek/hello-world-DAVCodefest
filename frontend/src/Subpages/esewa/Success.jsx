import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

import axios from "axios";
const Success = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  // Create a new URLSearchParams object using the search string from location
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("data");
  // Decode the JWT without verifying the signature
  const decoded = base64Decode(token);
  const verifyPaymentAndUpdateStatus = async () => {
    try {
      const response = await axios.post(
        "http://localhost:7180/esewa/payment-status",
        {
          transactionId: decoded.transaction_uuid,
        }
      );
      if (response.status === 200) {
        setIsLoading(false);
        setIsSuccess(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error initiating payment:", error);
    }
  };
  useEffect(() => {
    verifyPaymentAndUpdateStatus();
  }, []);
  if (isLoading && !isSuccess) return <>Loading...</>;
  if (!isLoading && !isSuccess)
    return (
      <>
        <h1>Oops!..Error occurred on confirming payment</h1>
        <h2>We will resolve it soon.</h2>
        <button onClick={() => navigate("/")} className="go-home-button">
          Go to Homepage
        </button>
      </>
    );
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
        <FaCheckCircle className="text-green-500 text-6xl animate-bounce mx-auto" />
        <h1 className="text-2xl font-bold text-green-700 mt-4">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">Thank you for your payment. Your transaction was successful.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-5 bg-green-600 text-white px-6 py-2 rounded-lg text-lg shadow-md hover:bg-green-700 transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};
export default Success;
//using the utility fucntion in the same page for simplicity
//you can create a separate directory and serve it 
function base64Decode(base64) {
  // Convert Base64Url to standard Base64
  let standardBase64 = base64.replace(/-/g, "+").replace(/_/g, "/");
  
  // Fix padding issue (Base64 requires length to be a multiple of 4)
  while (standardBase64.length % 4 !== 0) {
    standardBase64 += "=";
  }

  // Decode Base64 string to a byte array
  const binaryString = atob(standardBase64);

  // Convert binary string to UTF-8
  const decoded = decodeURIComponent(
    binaryString.split("").map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`).join("")
  );

  return JSON.parse(decoded);
}
