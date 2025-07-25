import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ShareIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { userAuthStore } from "../../store/authStore";

// --- This is now a fully functional comment form ---
const PostCommentForm = ({ user, postId, onCommentPosted }) => {
  const [newComment, setNewComment] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") {
      return toast.error("Comment cannot be empty.");
    }
    setIsSending(true);
    try {
      await axios.post("http://localhost:7180/community/comment", {
        content: newComment,
        postId: postId,
        userId: user._id,
      });
      setNewComment("");
      toast.success("Comment posted!");
      // Optionally, you could call a function here to refetch the post data
      if(onCommentPosted) onCommentPosted();
    } catch (error) {
      toast.error("Failed to post comment.");
      console.error("Comment post error:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSendComment} className="flex items-center gap-2 pt-3">
      <img
        src={user?.avatar || "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"}
        alt="Your avatar"
        className="h-9 w-9 flex-shrink-0 rounded-full bg-slate-200 object-cover"
      />
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
        disabled={isSending}
        className="block w-full rounded-full border-slate-300 bg-slate-100 px-4 py-2 text-sm focus:border-green-500 focus:ring-green-500 disabled:opacity-70"
      />
      <button
        type="submit"
        disabled={isSending || !newComment.trim()}
        className="flex-shrink-0 rounded-full p-2 text-white bg-green-600 shadow-sm transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <PaperAirplaneIcon className="h-5 w-5" />
      </button>
    </form>
  );
};


const PostCard = ({ post, user, onShare }) => {
  const [isLiked, setIsLiked] = useState(false);
  const owner = post.owner;

  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-md">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Link to={owner ? `/profile/${owner._id}` : "#"}>
            <img
              src={owner?.avatar || "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"}
              alt={owner?.name || owner?.username}
              className="h-12 w-12 rounded-full bg-slate-200 object-cover"
            />
          </Link>
          <div>
            <Link
              to={owner ? `/profile/${owner._id}` : "#"}
              className="font-semibold text-slate-800 hover:underline"
            >
              {owner?.name || owner?.username || "Unknown User"}
            </Link>
            <p className="text-xs text-slate-500">
              <Link to={`/post/${post._id}`} className="hover:underline">
                {new Date(post.createdAt).toLocaleString()}
              </Link>
            </p>
          </div>
        </div>
        <p className="mt-4 text-base text-slate-700">{post.content}</p>
      </div>

      {post.photo && (
        <div className="w-full bg-slate-100">
          <Link to={`/post/${post._id}`}>
            <img
              src={post.photo}
              alt="Post content"
              className="h-auto w-full max-h-[70vh] object-contain"
            />
          </Link>
        </div>
      )}

      <div className="flex items-center justify-between px-4 pt-3 text-sm text-slate-500">
        <span>{post.likes?.length || 0} Likes</span>
        <span>{post.comments?.length || 0} Comments</span>
      </div>

      <div className="m-2 flex justify-around border-t border-slate-100">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors hover:bg-slate-100 ${
            isLiked ? "text-red-500" : "text-slate-600"
          }`}
        >
          {isLiked ? <HeartIconSolid className="h-5 w-5" /> : <HeartIconOutline className="h-5 w-5" />}
          <span>Like</span>
        </button>
        <Link
          to={`/post/${post._id}`}
          className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
          <span>Comment</span>
        </Link>
        <button
          onClick={() => onShare(post)}
          className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
        >
          <ShareIcon className="h-5 w-5" />
          <span>Share</span>
        </button>
      </div>
      
      {user && (
        <div className="border-t border-slate-100 p-4">
          <PostCommentForm user={user} postId={post._id} />
        </div>
      )}
    </div>
  );
};

const Discussion = ({ posts, user, onShare }) => {
  const {user:loggedInUser}=userAuthStore();
  if (!posts || posts.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-white p-5 text-center shadow-md">
        <h3 className="text-xl font-semibold text-slate-700">The Feed is Quiet...</h3>
        <p className="mt-2 text-slate-500">Why not be the first to share something with the community?</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} user={loggedInUser} onShare={onShare} />
      ))}
    </div>
  );
};

export default Discussion;