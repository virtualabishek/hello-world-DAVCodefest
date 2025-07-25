import express from "express"
import { upload } from "../middleware/multer.middleware.js"
import { addNews } from "../controller/news.controller.js";
import { verifyToken } from "../middleware/verifytoken.middleware.js";
import { getNews } from "../controller/news.controller.js";
import { getSingleNews } from "../controller/news.controller.js";
const router = express.Router();

router.post('/add-news',upload.single("image"),addNews)
router.get('/all-news', getNews)
router.get('/getsingle-news/:id',getSingleNews)




export default router;

