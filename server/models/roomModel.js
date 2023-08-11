import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    nameRoom: {
      type: String,
      require: true,
    },
    avatarRoom: {
      type: String,
      default: ""
    },
    idUser: { // author
      type: String,
      require: true,
    },
    member: {
      type: [String], //user id
      default: [],
    },
    report: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("room", roomSchema);
