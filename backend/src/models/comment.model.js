import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    content: {
        type:String
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommunityPost",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }, like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    },
},{timestamps: true});
export const Comment = mongoose.model("Comment", commentSchema);