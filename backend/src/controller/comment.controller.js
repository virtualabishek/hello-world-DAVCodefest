
import { Comment } from '../models/comment.model.js';
import {CommunityPost} from '../models/post.model.js';
export const createComment = async (req, res) => {


    const { content, postId, userId } = req.body
    console.log("req.body", req.body);
    try { 
        if (!content || !postId || !userId) {
            return res.status(400).json({ error: "Content, postId, and userId are required" });
        }
    
    const comment = new Comment({
        content,
        postId,
        userId
    });
        
        await comment.save();
    const commentAddeedToId=await CommunityPost.findByIdAndUpdate(postId, {
            $push: { comments: comment._id }
    });
        console.log("commentAddeedToId",commentAddeedToId)

        console.log("Comment created successfully:", comment);
        // Optionally, you can return the created comment or a success message
    res.status(200).json({ message: "Comment created successfully", content, postId, userId });
    }
    catch (error) {
        console.log("Error creating comment:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
    

}


export const getCommentsByPostId = async (req, res) => { 
    const { postId } = req.query; // Assuming postId is passed as a query parameter
    console.log("postId", postId)
    console.log("get comment by postid got hit")
    console.log("-------------------")
    console.log("-------------------")

    console.log("-------------------")

    try { 

        if (!postId) {
            return res.status(400).json({ error: "postId is required" });
        }

        const comments = await Comment.find({ postId }).sort({ createdAt: -1 }) // Sort by creation date, most recent first
            .populate('userId', 'username email avatar'); // Populate userId with name and email

        console.log("Comments fetched successfully:", comments);
        
        // if (comments.length === 0) {
        //     return res.status(404).json({ message: "No comments found for this post" });
        // }

        res.status(200).json({comments});
    }
    catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }

}