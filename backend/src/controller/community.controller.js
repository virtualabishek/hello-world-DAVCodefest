
import { News } from "../models/news.model.js"
import { CommunityPost } from "../models/post.model.js"
import User from "../models/user.model.js"
import { uploadoncloudinary } from "../utils/cloudinary.utility.js"
import mongoose from "mongoose"
export const handleCommunityPost = async (req, res) => {

    const {id}=req.params
    const photopath = req.file?.path
    console.log("req.file", req.file)
    console.log("photopath",photopath)

try {
        const user=await User.findById(id)
        
        if(!user){
           
    
            return res.status(400).json({success:false,message:"user not found "})
        }
       
          const photo=await uploadoncloudinary(photopath, { folder: 'community' })
         console.log(photo)
          const photoUrl=photo.url
         
      
        const {title}=req.body
        const newtexts= new CommunityPost({
            title:title,
            userPhoto:user.avatar,
            photo:photoUrl||null,
            owner:user?user._id:null
    
             
        })
    console.log("newtexts",newtexts)
    const post = await CommunityPost.find({ owner: user._id }).populate('owner');
    await newtexts.save()
    const usermain=await User
        .findByIdAndUpdate(id, { $push: { communityPosts: newtexts._id } }, { new: true })
    console.log("usermain",usermain)
    console.log("post", post)
    console.log("---------------")
        console.log(newtexts)
    
    
      
        if(!post){
          
            
          
    
            return res.status(400).json({success:false,message:"post not found"})
        }
    
    
        return res.status(200).json({success:true,message:"community post successfull"})
} catch (error) {
    console.log("handle community error:", error)
    res.status(400).json({success:false,message:"error in community post"})
}
}



export const getCommunityPost = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10; 
        const skip = (page - 1) * limit;

        const texts = await CommunityPost.find({})
            .populate('owner')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        const total = await CommunityPost.countDocuments();

        return res.status(200).json({ success: true, post: texts ,total});
    } catch (error) {
        console.log("Error getting community post:", error);
        return res.status(400).json({ success: false, message: "Error getting the community post" });
    }
};


export const getMedia = async (req, res) => {
    try {
        
        
        const media = await CommunityPost.find({},{title:0,})
            .populate('owner')
            .sort({ createdAt: -1 })
        
        console.log("texts :", media);
        res.status(200).json({ success: true, media });
    }catch(error) {
        console.log("Error getting media:", error);
        return res.status(400).json({ success: false, message: "Error getting media" });
    }
}

export const  getCommunityPostById = async (req, res) => { 

    const { id } = req.params;
    try {
        const post = await CommunityPost.findById(id).populate('owner');
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        return res.status(200).json({ success: true, post });
    } catch (error) {
        console.log("Error getting community post by ID:", error);
        return res.status(400).json({ success: false, message: "Error getting the community post" });
    }


}