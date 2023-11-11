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
      default: "",
    },
    role: {
      type: String,
      default: "permit",
    },
    refreshToken: { type: String, select: false },
  },
  { timestamps: true }
);

export default mongoose.model("admin", adminSchema);
