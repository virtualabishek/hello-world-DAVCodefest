import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { Bell, Megaphone } from "lucide-react";
import { userAuthStore } from "../store/authStore";
import { useParams } from "react-router-dom";
import { CiUnread, CiRead } from "react-icons/ci";
import toast from "react-hot-toast";

const Notification = ({ setTriggerNotificationFetch }) => {
  const [notifications, setNotifications] = useState([]);
  const { user, fetchNotifications, markAsRead, deleteNotification } = userAuthStore();
  const { userId } = useParams();

  useEffect(() => {
   

    fetchNotification();
  }, [user]);
  const fetchNotification = async () => {
    try {
      if (user) {
        const response = await fetchNotifications(user._id);
        setNotifications(response.data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    const response = await markAsRead(notificationId);
    console.log("Mark as Read Response insiide of the notifiicatioin.jsx:", response);
    if (response.status === 200) {
      toast.success("Marked as read");
      // Refresh notifications
      const updated = await fetchNotifications(user._id);
      setNotifications(updated.data);
      setTriggerNotificationFetch(true);
    } else {
      toast.error("Mark as read failed");
    }
  };

  const handleDelete = async (notificationId) => {
    const response = await deleteNotification(notificationId);
    
    if (response.status === 200) {
      toast.success("Deleted successfully");
      // Refresh notifications
      const updated = await fetchNotifications(user._id);
      setNotifications(updated.data);
      setTriggerNotificationFetch(true);
    } else {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white min-h-screen rounded-lg relative">
      <h2 className="text-xl font-bold text-center mb-6">Notifications</h2>
      {notifications.map((notification) => (
        <div key={notification._id} className="mb-3 p-4 flex items-center gap-4 bg-white rounded-lg shadow">
          {notification.image && (
            <img
              src={notification.image}
              alt={notification.user}
              className="w-10 h-10 rounded-full"
            />
          )}
          {notification.icon && <span className="text-blue-500">{notification.icon}</span>}
          <div className="flex-1">
            <p className="text-gray-700">{notification.message}</p>
            <div className="flex justify-between items-center mt-2 p-2">
              {!notification.read ? (
                <Button
                  className="bg-blue-400 whitespace-nowrap flex items-center gap-2"
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  Read <CiUnread />
                </Button>
              ) : (
                <Button
                  className="bg-green-400 whitespace-nowrap flex items-center gap-2"
                  onClick={() =>  toast.success("Already read")}
                >
                  Read <CiRead />
                </Button>
              )}
              <Button className="bg-red-500" onClick={() => handleDelete(notification._id)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
