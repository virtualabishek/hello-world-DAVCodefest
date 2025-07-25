
import express from "express"
import { handleCommunityPost, getCommunityPost,getMedia,getCommunityPostById } from "../controller/community.controller.js"
import { getSingleProduct } from "../controller/marketplace.controller.js"
import { upload } from "../middleware/multer.middleware.js"
import { addProduct,getProduct } from "../controller/marketplace.controller.js"

import {createComment,getCommentsByPostId} from "../controller/comment.controller.js"

const router = express.Router()

router.post('/post/:id',upload.single('photo'),handleCommunityPost)
router.get('/post',getCommunityPost)
router.post('/addproduct', upload.single('image'), addProduct)
router.get('/getProduct', getProduct)

router.get('/getsingle-Product/:id', getSingleProduct)
router.post('/comment', createComment)
router.get('/get-comments', getCommentsByPostId)
router.get('/get-media', getMedia)
router.get('/get-community-post/:id',  getCommunityPostById) 





export {router as community}

