import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    idRoom: {
      type: String,
      require: [true, "The chat must have to room id"],
    },
    idUser: {
      type: String,
      require: [true, "The chat must have to user id"],
    },
    message: {
      type: String,
      require: [true, "Please fill the message"],
    },
    type: {
      type: String,
      default: "text",
    }
  },
  { timestamps: true }
);

export default mongoose.model("chat", chatSchema);
