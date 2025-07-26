import axios from "axios";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { uploadoncloudinary } from "../utils/cloudinary.utility.js";
import { sendEmail } from "../utils/email.utility.js";
import { sendNotification } from "../utils/notification.utility.js";
import {
  generateTokenAndSetCookie,
  generateVerificationCOde,
} from "../utils/verificationToken.js";

export const registerUser = async (req, res) => {
  const { name, email, password, number } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required" });
    }

    const ipRes = await axios.get("https://api64.ipify.org?format=json");
    console.log("ipRes", ipRes.data);
    const ip = ipRes.data.ip;
    console.log("ip", ip);

    console.log("Detected Public IP:", ip);

    const locationResponse = await axios.get(
      `https://ipinfo.io/${ip}/json?token=${process.env.LOCATIONAPIKEY}`
    );
    console.log("Location Response:", locationResponse.data);
    const location =
      locationResponse.data.city + "," + locationResponse.data.region;
    console.log(location);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.log("existing user check");
    let avatarUrl = null;
    if (req.file) {
      const imagePath = req.file.path;
      avatarUrl = await uploadoncloudinary(imagePath, { folder: "user" });
      console.log("avatar url", avatarUrl);
    }
    console.log("cloudinary upload");
    const verificationToken = generateVerificationCOde();
    const emailsending = await sendEmail({
      to: email,
      subject: "Account Activation",
      heading: "Welcome to saralKrishi",
      text: `Thank you for signing up. Please verify your email to continue. \n Here is your Verification code ${verificationToken}`,
    });
    console.log("emailsending", emailsending);
    console.log("verifiacatin token check");
    const hashPassword = await bcryptjs.hash(password, 10);
    console.log("hashing");

    // Create a new user
    const newUser = new User({
      username: name,
      email,
      password: hashPassword,
      phoneNumber: number,
      avatar: avatarUrl ? avatarUrl.url : null,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      location: location,
    });
    const result = await sendNotification({
      userId: newUser._id,
      topic: "Sign up completed",
      message: "Welcome to the KhetAI",
      image:
        "https://png.pngtree.com/png-clipart/20190516/original/pngtree-check-mark-icon-design-template-vector-isolated-png-image_4085369.jpg",
    });
    console.log(newUser);
    console.log(result);
    console.log("datbase saved");
    // Save the new user
    await newUser.save();
    console.log("new user", newUser);
    generateTokenAndSetCookie(res, newUser._id);
    console.log("token crated and saved");

    console.log("sending rsponse");

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        avatar: newUser.avatar,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const verifyemail = async (req, res) => {
  try {
    const { code } = req.body;
    console.log(code);

    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gte: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "invalid or expired verification code",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    const result = await sendNotification({
      userId: user._id,
      topic: "Verification Completed",
      message: "Your Id has been Verified Successfully",
      image:
        "https://png.pngtree.com/png-clipart/20190516/original/pngtree-check-mark-icon-design-template-vector-isolated-png-image_4085369.jpg",
    });
    console.log("result", result);

    return res.status(200).json({
      success: true,
      message: "email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in verifyEmail ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const forgetpassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("invalid creditencial");
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAr = Date.now() + 1 * 60 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAr;

    await user.save();

    return res.status(200).json({ success: true, message: "reset email sent" });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ success: false, message: "foregt passwo unsuccessfull" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    console.log("working");
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user doesnot exits" });
    }
    const userPassword = await bcryptjs.compare(password, user.password);
    if (!userPassword) {
      return res
        .status(400)
        .json({ success: false, message: "incorrect password " });
    }
    const token = generateTokenAndSetCookie(res, user._id);
    console.log("token", token);
    user.lastLogin = new Date();
    const loguser = await user.save();
    console.log(loguser);
    const now = new Date();

    const result = await sendNotification({
      userId: loguser._id,
      topic: "Login Completed",
      message: `Your id has been Loggedin at ${now.toString()}`,
      image:
        "https://png.pngtree.com/png-clipart/20190516/original/pngtree-check-mark-icon-design-template-vector-isolated-png-image_4085369.jpg",
    });
    console.log("result", result);
    return res.status(200).json({
      success: true,
      message: "login successfull",
      token: token,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "login unsuccessfull" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "logout successful" });
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "invalid creditional" });
    }
    // update password
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    //  await sentResetSuccessEmail(user.email);
    return res
      .status(200)
      .json({ success: true, message: "successful reset password" });
  } catch (error) {
    console.log("error at reset password", error);
    return res
      .status(400)
      .json({ success: false, message: "unsucessful reset password" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const Home = async (req, res) => {
  try {
    // Get the real user IP
    const userIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Get location details using IP API
    const locationResponse = await axios.get(
      `https://ipinfo.io/${userIP}/json?token=${process.env.LOCATIONAPIKEY}`
    );
    console.log(locationResponse);
    if (!locationResponse.data.city) {
      return res.status(400).json({ error: "Unable to fetch location" });
    }

    console.log("Location Response:", locationResponse.data);

    const { city, region } = locationResponse.data;
    const formattedLocation = `${city}, ${region}`;

    // Fetch weather data using OpenWeatherMap API
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.WEATHERAPIKEY}`
    );

    console.log("Weather Response:", weatherResponse.data);

    // Respond with location and weather details
    res.json({
      location: formattedLocation,
      weather: weatherResponse.data,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

export const weatherAPI = async (req, res) => {
  try {
    const WEATHERAPI = process.env.WEATHERAPI; // Ensure this is defined
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=Birgunj&units=metric&appid=${WEATHERAPI}`
    );

    // Check if API call was successful
    if (response.status !== 200) {
      return res
        .status(response.status)
        .json({ success: false, message: "Failed to fetch weather data" });
    }

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error("Weather API Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const handleAddFriend = async (req, res) => {
  const { userId } = req.body;
  console.log("working", userId);

  try {
    const userID = await User.findById(userId);

    // Check if friend request already sent
    if (userID.friends.includes(req.params.friendId)) {
      return res.status(200).json({ message: "Friend request already sent!" });
    }
    if (userId === req.params.friendId) {
      return res
        .status(200)
        .json({ message: "You cannot send a friend request to yourself" });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: req.params.friendId } }, // Ensures no duplicates
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const Friend = await User.findById(req.params.friendId);
    const usermessage = await sendNotification({
      userId: userId,
      topic: ` Friend Request Sent`,
      message: `You Send a Friend Request to ${Friend.username}`,
      image:
        "https://png.pngtree.com/png-clipart/20190516/original/pngtree-check-mark-icon-design-template-vector-isolated-png-image_4085369.jpg",
    });
    console.log("usermessage", usermessage);
    console.log("----------");
    const friendmessage = await sendNotification({
      userId: Friend._id,
      topic: ` Friend Request received`,
      message: `You Got a Friend Request From ${user.username}`,
      image:
        "https://png.pngtree.com/png-clipart/20190516/original/pngtree-check-mark-icon-design-template-vector-isolated-png-image_4085369.jpg",
    });
    console.log("friendmessage", friendmessage);

    return res.status(200).json({ message: "Friend added successfully" });
  } catch (error) {
    console.log("Error adding friend:", error);
  }
};

export const getFriendList = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    const user = await User.findById(userId).populate("friends");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(user);
    return res
      .status(200)
      .json({ message: "Friend fetched successfully", friends: user.friends });
  } catch (error) {}
};
