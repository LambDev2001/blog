import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
mongoose.plugin(mongooseDelete);

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
    sex: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    numberPhone: {
      type: String,
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
        "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1699798246/blog/user-avatar_zvprbh.png",
    },

    refreshToken: { type: String, select: false },
    status: { type: Number, default: 0 },
    report: {
      type: Number,
      default: 0,
    },
    ban: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
});

export default mongoose.model("user", userSchema);
