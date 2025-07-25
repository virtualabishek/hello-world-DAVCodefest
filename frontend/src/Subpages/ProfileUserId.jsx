import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { userAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export default function ProfileUserId() {
  const { profileID } = useParams();
  const navigate = useNavigate();
  const [userprofile, setUserprofile] = useState(null);
  const [isFriend, setIsFriend] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = userAuthStore(); // Logged-in user

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:7180/user/${profileID}`);
        setUserprofile(response.data);
        setIsFriend(response.data.isFriend);
        console.log("response.data", response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [profileID]);
    const handleAddFriend = async (friendId) => {
      try {
        const response = await axios.post(`http://localhost:7180/user/add-friend/${friendId}`, {
          userId: user ? user._id : null,
        });
        console.log("response", response)
        if (response.status === 200) {
          toast.success(response.data.message);

        } else {
          toast.error("Friend request sent unsuccessfully.");

        }

      } catch (error) {
        console.error("Error adding friend:", error);
        alert("Failed to send friend request.");
      }
    };
 

  if (!userprofile) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex items-center">
        {userprofile && (
          <img
            className="h-20 w-20 rounded-full border-2 border-gray-300"
            src={userprofile.avatar}
            alt="User Avatar"
          />
        )}
        <div className="ml-4">
          <h2 className="text-xl font-bold">{userprofile.username}</h2>
          <p className="text-gray-600">{userprofile.email}</p>
        </div>
      </div>

      <div className="mt-4">
        {/* Fix the userId and user._id comparison */}
        {String(user ? user._id : null) !== String(userprofile._id) && (
          <button
            onClick={() => (user?handleAddFriend(userprofile._id):navigate("/login"))}
            disabled={loading || isFriend}

            className={`px-4 py-2 rounded-md  bg-blue-600 hover:bg-blue-700
               text-white`}
          >
            {/* {user.friends includes userprofile._id ? "Friends" : "Add Friend"} */}
            {   user?.friends?.includes(userprofile?._id) ? "Friends" : "Add Friend"}

          </button>
        )}

        <button
          onClick={() => navigate(`/friends/${profileID}`)}
          className="ml-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
        >
          Friend List
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Community Posts</h3>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {userprofile.communityPosts.map((post) => (
            <div key={post._id} className="p-3 border rounded-md shadow-md">
              <p className="mt-2 text-gray-800 font-medium">{post.title}</p>

              <img src={post.photo} alt={post.title} className="w-full h-40 object-cover rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
