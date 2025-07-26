import { Notification } from "../models/notification.model.js";
import User from "../models/user.model.js";


export const notification = async (req, res) => { 
    try {


        const { userId } = req.params;
                const notification = await Notification.find ({ user: userId }).sort({createdAt:-1});
        res.status(200).json(notification);
} catch (error) {
        console.error("Notification Error:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
}

export const getUnreadNotification = async (req, res) => { 
    const user = await User.findById(req.userId).select("-password")
    if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    try { 
        const notification = await Notification.find({ user: user._id, read: false }).sort({ createdAt: -1 });
        const unreadNotifications = notification.filter(n => !n.read);

        res.status(200).json({ success: true, count: unreadNotifications.length });
    }
    catch (error) { 
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

export const markNotificationAsRead = async (req, res) => { 

    const user =await User.findById(req.userId).select("-password")

    const { notificationId } = req.body

    try {
        const notification=await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ success: false, message: "Notification not found" });
        }

        if(notification.user.toString() !== user._id.toString()) {
            return res.status(403).json({ success: false, message: "You do not have permission to mark this notification as read" });
        }
        notification.read = true;
        await notification.save();
        return res.status(200).json({ success: true, message: "Notification marked as read", notification });

    }catch (error) {
        console.error("Error marking notification as read:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }

}
export const deleteNotification = async (req, res) => { 
    const { notificationId } = req.body;
    const user =await User.findById(req.userId).select("-password")
    try {
        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ success: false, message: "Notification not found" });
        }
        if (notification.user.toString() !== user._id.toString()) {
            return res.status(403).json({ success: false, message: "You do not have permission to delete this notification" });
        }
        const result = await Notification.findByIdAndDelete(notificationId);
        return res.status(200).json({ success: true, message: "Notification deleted successfully" });
    }catch (error) {
        console.error("Error deleting notification:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
   


}