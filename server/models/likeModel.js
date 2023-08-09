import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    idUser: {
      type: String,
      require: [true, "The category must have id user"],
    },
    idBlog: {
      type: String,
      require: [true, "The category must have id blog"],
    },
    like: {
      type: Boolean,
      require: [true, "Must have like or dislike"]
    }
  }
);

export default mongoose.model("like", likeSchema);
