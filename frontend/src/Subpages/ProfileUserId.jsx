import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { userAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import {
  UserPlusIcon,
  CheckIcon,
  UsersIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

const LoadingSkeleton = () => (
  <div className="mx-auto max-w-3xl animate-pulse p-4">
    <div className="h-24 rounded-t-xl bg-slate-200"></div>
    <div className="relative -mt-12 flex justify-center">
      <div className="h-24 w-24 rounded-full border-4 border-slate-50 bg-slate-300"></div>
    </div>
    <div className="mt-4 h-8 w-1/2 mx-auto rounded-md bg-slate-200"></div>
    <div className="mt-2 h-5 w-1/3 mx-auto rounded-md bg-slate-200"></div>
    <div className="mt-4 flex justify-center gap-4">
        <div className="h-10 w-28 rounded-lg bg-slate-200"></div>
        <div className="h-10 w-28 rounded-lg bg-slate-200"></div>
    </div>
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="h-48 rounded-lg bg-slate-200"></div>
      <div className="h-48 rounded-lg bg-slate-200"></div>
    </div>
  </div>
);

const ErrorDisplay = () => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
        <ExclamationTriangleIcon className="h-12 w-12 text-red-400" />
        <h2 className="mt-4 text-xl font-semibold text-slate-800">Profile Not Found</h2>
        <p className="mt-2 text-slate-500">The user you are looking for does not exist.</p>
        <Link
            to="/community"
            className="mt-6 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700"
        >
            Back to Community
        </Link>
    </div>
);


export default function ProfileUserId() {
  const { profileID } = useParams();
  const navigate = useNavigate();
  const { user } = userAuthStore(); // Logged-in user
  
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isProcessingFriend, setIsProcessingFriend] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await axios.get(`http://localhost:7180/user/${profileID}`);
        setProfile(response.data);
        setIsFriend(user?.friends?.includes(response.data._id) || false);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [profileID, user?.friends]);

  const handleAddFriend = async () => {
    if (!user) {
        toast.error("Please log in to add friends.");
        return navigate("/login");
    }
    setIsProcessingFriend(true);
    try {
      const response = await axios.post(`http://localhost:7180/user/add-friend/${profile._id}`, { userId: user._id });
      if (response.status === 200) {
        toast.success(response.data.message || "Friend request sent!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send friend request.");
    } finally {
        setIsProcessingFriend(false);
    }
  };

  if (isLoading) return <div className="min-h-screen bg-slate-50 py-8"><LoadingSkeleton /></div>;
  if (error || !profile) return <div className="min-h-screen bg-slate-50 py-8"><ErrorDisplay /></div>;

  const isOwnProfile = user?._id === profile._id;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        
        <div className="rounded-xl bg-white shadow-lg">
            <div className="h-24 rounded-t-xl bg-green-600 bg-gradient-to-r from-green-500 to-green-700"></div>
            <div className="relative flex justify-center">
              <img
                className="absolute -top-12 h-24 w-24 rounded-full border-4 border-white bg-slate-200 object-cover shadow-md"
                src={profile.avatar}
                alt="User Avatar"
              />
            </div>
            <div className="px-6 pb-6 pt-16 text-center">
                <h2 className="text-2xl font-bold text-slate-800">{profile.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{profile.email}</p>
                
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    {!isOwnProfile && (
                        <button
                            onClick={handleAddFriend}
                            disabled={isProcessingFriend || isFriend}
                            className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors ${
                                isFriend 
                                    ? "bg-slate-300 cursor-default" 
                                    : "bg-green-600 hover:bg-green-700"
                            } disabled:opacity-70 disabled:cursor-not-allowed`}
                        >
                            {isFriend ? <CheckIcon className="h-5 w-5" /> : <UserPlusIcon className="h-5 w-5" />}
                            <span>{isFriend ? "Friends" : "Add Friend"}</span>
                        </button>
                    )}
                    <Link
                        to={`/friends/${profile._id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-200"
                    >
                        <UsersIcon className="h-5 w-5" />
                        <span>Friend List</span>
                    </Link>
                </div>
            </div>
        </div>

        <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800">Community Posts</h3>
            {profile.communityPosts?.length > 0 ? (
                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {profile.communityPosts.map((post) => (
                    <Link key={post._id} to={`/post/${post._id}`} className="group block overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div className="aspect-video w-full overflow-hidden bg-slate-200">
                        <img
                            src={post.image || post.photo}
                            alt={post.title || "Post image"}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        </div>
                        <div className="p-4">
                            <p className="font-semibold text-slate-700 line-clamp-2 group-hover:text-green-700">
                                {post.content || post.title}
                            </p>
                        </div>
                    </Link>
                    ))}
                </div>
            ) : (
                <div className="mt-4 rounded-lg border-2 border-dashed border-slate-200 bg-white p-12 text-center">
                    <p className="text-slate-500">This user hasn't made any posts yet.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}