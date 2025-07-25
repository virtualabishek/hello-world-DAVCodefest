import express from "express";
import {
  getTransactionHistory,
  handleInitialPayment,
  paymentStatus,
} from "../controller/esewa.controller.js";
import { verifyToken } from "../middleware/verifytoken.middleware.js";
const router = express.Router();

router.post("/initiate-payment", verifyToken, handleInitialPayment);
router.post("/payment-status", verifyToken, paymentStatus);
router.get("/transaction-history", verifyToken, getTransactionHistory);

export default router;
