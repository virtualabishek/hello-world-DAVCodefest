import express from "express";
import {
  handleAIRequest,
  handleText,
  handleTexttoText,
} from "../controller/ai.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = express.Router();

router.post("/crop-health", upload.single("image"), handleAIRequest);

router.post("/text-to-text", handleTexttoText);
router.post("/text", handleText);

export default router;
