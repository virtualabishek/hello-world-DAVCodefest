import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { userAuthStore } from "../../store/authStore";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Comments from "./Comments";

const PostCard = ({ post }) => {
    const owner = post.owner;
    return (
        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="p-5">
            <div className="flex items-center gap-3">
                <Link to={owner ? `/profile/${owner._id}` : "#"}>
                    <img src={owner?.avatar} alt={owner?.name || owner?.username} className="h-12 w-12 rounded-full bg-slate-200 object-cover" />
                </Link>
                <div>
                    <Link to={owner ? `/profile/${owner._id}` : "#"} className="font-semibold text-slate-800 hover:underline">
                        {owner?.name || owner?.username || "Unknown User"}
                    </Link>
                    <p className="text-xs text-slate-500">{new Date(post.createdAt).toLocaleString()}</p>
                </div>
            </div>
            <p className="mt-4 text-base text-slate-700">{post.content}</p>
            </div>
            {post.photo && (
                <div className="w-full bg-slate-100">
                    <img src={post.photo} alt="Post content" className="w-full h-auto object-contain" />
                </div>
            )}
        </div>
    );
};

const SinglePostPage = () => {
  const { id } = useParams();
  const { user } = userAuthStore();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:7180/community/post/${id}`);
        setPost(response.data.post);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);
  
  if (isLoading) return <p className="text-center py-20">Loading post...</p>;
  if (!post) return <p className="text-center py-20 text-red-500">Post not found.</p>;

  return (
    <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 py-8">
            <main className="lg:col-span-2 space-y-6">
                 <Link to="/community" className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 transition-colors hover:text-green-800">
                    <ArrowLeftIcon className="h-4 w-4" />
                    <span>Back to Community</span>
                </Link>
                <PostCard post={post} />
            </main>
            <aside className="lg:col-span-1">
                <div className="sticky top-24 rounded-xl bg-white shadow-lg">
                    <Comments post={post} user={user} />
                </div>
            </aside>
        </div>
    </div>
  );
};

export default SinglePostPage;