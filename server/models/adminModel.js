import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "The admin must have username"],
    },
    account: {
      type: String,
      require: [true, "Missing the account"],
    },
    password: {
      type: String,
      require: [true, "Missing the password"],
    },
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1699798246/blog/user-avatar_zvprbh.png",
    },
    role: {
      type: String,
      default: "permit",
    },
    status: {
      type: String,
      default: "waiting",
    },
    refreshToken: { type: String, select: false },
  },
  { timestamps: true }
);

export default mongoose.model("admin", adminSchema);
