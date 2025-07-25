import express from "express";
import {
  handleAIRequest,
  handletext,
  handleTexttoText,
} from "../controller/ai.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = express.Router();

router.post("/crop-health", upload.single("image"), handleAIRequest);

router.post("/text-to-text", handleTexttoText);
router.post("/text", handletext);

// import multer from 'multer';
// import axios from 'axios';
// import fs from 'fs';
// import path from 'path';

// const BASE_URL = "https://api.openai.com/v1";
// const API_KEY = "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";

// router.post('/detect-image', upload.single('image'), async (req, res) => {
//     try {
//         const imagePath = req.file.path;
//         const image = fs.readFileSync(imagePath);

//         const response = await axios.post(
//             `${BASE_URL}/vision`,
//             { image },
//             {
//                 headers: {
//                     'Authorization': `Bearer ${API_KEY}`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );

//         fs.unlinkSync(imagePath); // Delete image after processing
//         res.json(response.data);
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ error: error.message });
//     }
// });

export default router;
