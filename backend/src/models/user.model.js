import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    default: null,
  },
  avatar: {
    type: String,
    default: "https://i.pinimg.com/736x/58/51/2e/58512eb4e598b5ea4e2414e3c115bef9.jpg",
  },
  devices: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "IoTDevice",
    default:null
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
    }, location: {
      type:String
  },
  isVerified: {
    type: Boolean,
    default: false,
  },  resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken:String,
    verificationTokenExpiresAt: Date,
  communityPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommunityPost",
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);

export default User;