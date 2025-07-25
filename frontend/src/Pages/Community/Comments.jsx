import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { userAuthStore } from "../../store/authStore";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const Comments = ({ post, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const fetchComments = async () => {
    if (!post?._id) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:7180/community/get-comments`,
        { params: { postId: post._id } }
      );
      setComments(response.data.comments || []);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      toast.error("Could not load comments.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post?._id]);

  const handleSendComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "" || !user) {
      return toast.error("Comment cannot be empty.");
    }
    setIsSending(true);
    try {
      await axios.post("http://localhost:7180/community/comment", {
        content: newComment,
        postId: post._id,
        userId: user._id,
      });
      setNewComment("");
      toast.success("Comment posted!");
      fetchComments(); // Refetch comments to show the new one
    } catch (error) {
      toast.error("Failed to post comment.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex h-[80vh] flex-col">
      <div className="border-b border-slate-200 p-4">
        <h3 className="text-lg font-bold text-slate-800">Comments</h3>
        <p className="truncate text-sm text-slate-500">
          on "{post?.content}"
        </p>
      </div>

      <div className="flex-grow overflow-y-auto p-4">
        {isLoading ? (
          <p className="text-center text-slate-500">Loading comments...</p>
        ) : comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment._id} className="flex items-start gap-3">
                <img
                  src={comment.userId?.avatar}
                  alt={comment.userId?.name}
                  className="h-9 w-9 flex-shrink-0 rounded-full bg-slate-200 object-cover"
                />
                <div className="flex-1 rounded-lg bg-slate-100 px-3 py-2">
                  <p className="text-sm font-semibold text-slate-800">
                    {comment.userId?.name}
                  </p>
                  <p className="text-sm text-slate-600">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="pt-8 text-center text-sm text-slate-500">
            No comments yet. Be the first to reply!
          </p>
        )}
      </div>

      {user && (
        <div className="border-t border-slate-200 bg-white p-4">
          <form onSubmit={handleSendComment} className="flex items-center gap-2">
            <img
              src={user.avatar}
              alt="Your avatar"
              className="h-9 w-9 rounded-full bg-slate-200 object-cover"
            />
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="block w-full rounded-full border-slate-300 bg-slate-100 px-4 py-2 text-sm focus:border-green-500 focus:ring-green-500"
              disabled={isSending}
            />
            <button
              type="submit"
              disabled={isSending || !newComment.trim()}
              className="flex-shrink-0 rounded-full bg-green-600 p-2 text-white shadow-sm transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;