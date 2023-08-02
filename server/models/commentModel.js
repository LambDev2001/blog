import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    idUser: {
      type: String,
      require: [true, "The comment must have to name author"],
    },
    idBlog: {
      type: String,
    },
    replyCM: {
      type: [String],
      default: [],
    },
    content: {
      type: String,
      require: [true, "You the content fried"],
    },

    status: {
      type: String,
      require: "normal",
    },
    report: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("comment", commentSchema);
