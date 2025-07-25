import {verifyToken} from "../middleware/verifytoken.middleware.js";
import {getUnreadNotification, notification,markNotificationAsRead,deleteNotification} from "../controller/notification.controller.js";
import express from 'express';
const router = express.Router();

router.get("/user/:userId", notification)
router.get("/unread-notification", verifyToken, getUnreadNotification)
router.post("/mark-as-read", verifyToken, markNotificationAsRead)
router.delete("/delete",verifyToken,deleteNotification)
export default router;