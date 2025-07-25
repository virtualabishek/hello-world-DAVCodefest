import express from "express";
import { handleCommunityPost, getCommunityPost, getMedia, getCommunityPostById } from "../controller/community.controller.js";
import { getSingleProduct } from "../controller/marketplace.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { addProduct, getProduct } from "../controller/marketplace.controller.js";
import { createComment, getCommentsByPostId } from "../controller/comment.controller.js";

const router = express.Router();

// Community Posts
router.post('/post/:id', upload.single('photo'), handleCommunityPost);
router.get('/post', getCommunityPost);
// THIS IS THE CORRECTED ROUTE FOR A SINGLE POST
router.get('/post/:id', getCommunityPostById); 
router.get('/get-media', getMedia);

// Marketplace
router.post('/addproduct', upload.single('image'), addProduct);
router.get('/getProduct', getProduct);
router.get('/getsingle-Product/:id', getSingleProduct);

// Comments
router.post('/comment', createComment);
router.get('/get-comments', getCommentsByPostId);

export { router as community };