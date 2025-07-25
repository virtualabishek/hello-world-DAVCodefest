import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { userAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";

import axios from "axios";

export default function FriendList() {
  const { userId } = useParams();
  const [friends, setFriends] = useState([]);
  const { user } = userAuthStore()

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`http://localhost:7180/user/get-friend/${userId}`);
        setFriends(response.data.friends);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [userId]);

  const handleAddFriend = async (friendId) => {
    try {
     const response= await axios.post(`http://localhost:7180/user/add-friend/${friendId}`, {
        userId,
     });
      console.log("response",response)
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

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Friend List</h2>
      <ul className="space-y-4">
        {friends.map((friend) => (
          <li key={friend._id} className="flex justify-between items-center border-b pb-2">
            <Link to={`/profile/${friend._id}`}> 
            <div>
              <img
                src={friend.avatar}
                alt={friend.username}
                className="w-10 h-10 rounded-full inline-block mr-3"
              />
              <span className="text-lg font-medium">{friend.username}</span>
              </div>
            </Link>

            {user && ((user.friends).includes(friend._id) ? (
              <span className="text-green-500">Friend</span>
            ) : user._id === friend._id?" You": ( 
                <button
                  onClick={() => handleAddFriend(friend._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Add Friend
                </button>            ))}
           
          </li>
        ))}
      </ul>
    </div>
  );
}
