import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add your name"],
      trim: true,
      maxLength: [20, "Your name is up to 20 chars long."],
    },
    account: {
      type: String,
      required: [true, "Please add your email or phone"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add your password"],
    },
    birthday: {
      type: Date,
    },
    numberPhone: {
      type: Number,
      maxLength: 12,
      minLength: 10,
    },
    friends: {
      type: [String],
      default: [],
    },
    following: {
      type: [String],
      default: [],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },

    refreshToken: { type: String, select: false },
    status: { type: Number, default: 0 },
    report: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
