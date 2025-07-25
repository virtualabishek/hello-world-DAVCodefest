import {
  completeKhaltiPayment,
  getKhaltiPayment,
  initializeKhalti,
} from "../controller/khalti.main.controller.js";
import { verifyToken } from "../middleware/verifytoken.middleware.js";

import express from "express";
const router = express.Router();

router.post("/initialize-khalti", verifyToken, initializeKhalti);
router.get("/complete-khalti-payment", verifyToken, completeKhaltiPayment);
router.get("/get-khalti-history", verifyToken, getKhaltiPayment);
export default router;
