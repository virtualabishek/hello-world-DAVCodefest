import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import { userAuthStore } from "../../store/authStore";
import {
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ShareIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import MarketplaceSidebar from "../../Subpages/MarketplaceSidebar";

// --- A self-contained component to handle comments for a single post ---
const InlineComments = ({ post, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!post?._id) return;
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:7180/community/get-comments`, { params: { postId: post._id } });
        setComments(response.data.comments || []);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        toast.error("Could not load comments.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [post?._id]);

  const handleSendComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "" || !user) {
      toast.error("Comment cannot be empty or user not logged in.");
      return;
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
      const response = await axios.get(`http://localhost:7180/community/get-comments`, { params: { postId: post._id } });
      setComments(response.data.comments || []);
    } catch (error) {
      console.error("Failed to post comment:", error);
      toast.error("Failed to post comment.");
    } finally {
      setIsSending(false);
    }
  };

  if (!post) {
    return <p className="text-sm text-slate-500">No post selected.</p>;
  }

  return (
    <div className="space-y-4 pt-4">
      {isLoading ? (
        <p className="text-sm text-slate-500">Loading comments...</p>
      ) : comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="flex items-start gap-3">
            <img
              src={comment.userId?.avatar || "/default-avatar.png"}
              alt={comment.userId?.name || comment.userId?.username || "User"}
              className="h-9 w-9 flex-shrink-0 rounded-full bg-slate-200 object-cover"
            />
            <div className="flex-1 rounded-lg bg-slate-100 px-3 py-2">
              <p className="text-sm font-semibold text-slate-800">
                {comment.userId?.name || comment.userId?.username || "Unknown User"}
              </p>
              <p className="text-sm text-slate-600">{comment.content}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-slate-500">No comments yet. Be the first to reply!</p>
      )}

      {user && (
        <form onSubmit={handleSendComment} className="flex items-center gap-2 pt-2">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="Your avatar"
            className="h-9 w-9 rounded-full bg-slate-200 object-cover"
          />
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="block w-full rounded-full border-slate-300 bg-slate-100 px-4 py-2 text-sm focus:border-green-500 focus:ring-green-500"
            disabled={isSending}
          />
          <button
            type="submit"
            disabled={isSending || !newComment.trim()}
            className="flex-shrink-0 rounded-full bg-green-600 p-2 text-white shadow-sm transition-colors hover:bg-green-700 disabled:opacity-50"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </form>
      )}
    </div>
  );
};

const PostCard = ({ post, user, onShare }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const owner = post?.owner;

  if (!post) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-md">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Link to={owner ? `/profile/${owner._id}` : "#"}>
            <img
              src={owner?.avatar || "/default-avatar.png"}
              alt={owner?.username || "User"}
              className="h-12 w-12 rounded-full bg-slate-200 object-cover"
            />
          </Link>
          <div>
            <Link
              to={owner ? `/profile/${owner._id}` : "#"}
              className="font-semibold text-slate-800 hover:underline"
            >
              {owner?.username || "Unknown User"}
            </Link>
            <p className="text-xs text-slate-500">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="mt-4 text-base text-slate-700">{post.title}</p>
      </div>

      {post.photo && (
        <div className="w-full bg-slate-100">
          <img
            src={post.photo}
            alt="Post content"
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </div>
      )}

      <div className="m-2 flex justify-around border-t border-slate-100">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors hover:bg-slate-100 ${
            isLiked ? "text-red-500" : "text-slate-600"
          }`}
        >
          {isLiked ? <HeartIconSolid className="h-5 w-5" /> : <HeartIcon className="h-5 w-5" />}
          <span>Like</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
          <span>Comment</span>
        </button>
        <button
          onClick={() => onShare(post)}
          className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
        >
          <ShareIcon className="h-5 w-5" />
          <span>Share</span>
        </button>
      </div>

      {showComments && (
        <div className="border-t border-slate-100 p-4">
          <InlineComments post={post} user={user} />
        </div>
      )}
    </div>
  );
};

const Discussion = ({ totalPosts, user, posts, totalPages, onPageChange }) => {
  const [page, setPage] = useState(1);

  const handleShare = (post) => {
    // Placeholder for share functionality (replace with ShareBox or other logic)
    toast.success(`Shared post: ${post.title}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <main className="lg:col-span-2 space-y-6">
          {totalPosts > 0 ? (
            posts.map((p) => (
              <PostCard key={p._id} post={p} user={user} onShare={handleShare} />
            ))
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-white p-5 text-center shadow-md">
              <h3 className="text-xl font-semibold text-slate-700">No Posts Yet</h3>
              <p className="mt-2 text-slate-500">Be the first to share something with the community!</p>
            </div>
          )}
          {totalPosts > 0 && totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-5">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </main>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <MarketplaceSidebar />
          </div>
        </aside>
      </div>

      {user && (
        <Link to={`/post/${user._id}`}>
          <button className="fixed bottom-20 right-5 bg-green-700 text-white w-12 h-12 rounded-full text-2xl flex items-center justify-center shadow-md hover:bg-green-800 transition">
            +
          </button>
        </Link>
      )}
    </div>
  );
};

export default Discussion;