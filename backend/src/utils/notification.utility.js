import { Notification } from "../models/notification.model.js";
/**
 * Send a notification to a user
 * @param {Object} params
 * @param {mongoose.Types.ObjectId} params.userId - The user who will receive the notification
 * @param {string} params.topic - The topic/title of the notification
 * @param {string} params.message - The notification message
 * @param {string} [params.image] - Optional: Image URL related to the notification
 * @returns {Promise<Object>} - The created notification document
 */
export const sendNotification = async ({ userId, topic, message, image }) => {
    try {
        const notification = new Notification({
            user: userId,
            topic,  
            message,
            image: image || null, 
        });

        await notification.save(); 
        console.log("✅ Notification sent:", notification);
        return { success: true, notification };
    } catch (error) {
        console.error("❌ Error sending notification:", error.message);
        return { success: false, error: error.message };
    }
};
