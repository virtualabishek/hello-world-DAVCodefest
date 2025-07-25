import express from "express"
import { registerUser ,checkAuth,verifyemail,forgetpassword,resetPassword,login,logout,handleAddFriend,getFriendList} from "../controller/user.controller.js"
import { upload } from "../middleware/multer.middleware.js"
import { verifyToken } from "../middleware/verifytoken.middleware.js"
import User from "../models/user.model.js"
import { Home } from "../controller/user.controller.js"
import { weatherAPI } from "../controller/user.controller.js"
const router = express.Router()

router.post('/signup',upload.single('image'), registerUser)

router.get('/check-auth',verifyToken,checkAuth)

router.post("/verify-email",verifyemail)
router.post("/forget-password",forgetpassword) 
router.post("/reset-password/:token",resetPassword)

router.post("/login",login)

router.post("/logout", logout)

router.get("/home", Home)
router.get("/weather",weatherAPI)

router.post("/add-friend/:friendId", handleAddFriend)
router.get("/get-friend/:userId",getFriendList)
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("communityPosts");
    if (!req.user) {
  return res.status(401).json({ message: "Not authenticated" });
}
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/add-friend/:friendId", async (req, res) => {
  const { friendId } = req.params;
  const userId = req.body.userId; 

  if (userId === friendId) return res.status(400).json({ error: "You cannot add yourself as a friend" });

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) return res.status(404).json({ error: "User not found" });

    if (user.friends.includes(friendId)) return res.status(400).json({ error: "Already friends" });

    user.friends.push(friendId);
    friend.friends.push(userId);

    await user.save();
    await friend.save();

    res.json({ message: "Friend added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


export default router