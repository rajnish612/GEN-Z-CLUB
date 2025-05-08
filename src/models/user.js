import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  followers: [{ type: String, ref: "user" }],
  followings: [{ type: String, ref: "user" }],
  isVerified: { type: Boolean, default: false },
  avatar:{type: String,required: true},
  verifytoken: { type: String },
  stories: [
    {
      Story: { type: String, required: true },
      userId: { type: String, ref: "User" },
      expireAt: {
        type: Date,
        expires: "24h",
        default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      createdAt: { type: Date, default: Date.now() },
      username: { type: String, required: true },
      publicId: { type: String },
    },
  ],
  verificationTime: { type: Date, default: Date.now() },
});

let User = mongoose.models.user || mongoose.model("user", userSchema);
export default User;
