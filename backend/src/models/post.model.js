
import mongoose,{Schema} from "mongoose"

const CommunityPostSchema=new Schema({
    title:{
        type:String
    },
    photo:{
        type:String,
    },
    userPhoto:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }, comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }]
}, { timestamps: true })

CommunityPostSchema.pre("deleteOne", { document: true, query: false }, async function(next) {
    try {
        await Comment.deleteMany({ postId: this._id });
        next();
    } catch (err) {
        next(err);
    }
});

export const CommunityPost=mongoose.model("CommunityPost",CommunityPostSchema)