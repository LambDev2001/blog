import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
mongoose.plugin(mongooseDelete);

const commentSchema = new mongoose.Schema(
  {
    idUser: {
      type: String,
      require: [true, "The comment must have to name author"],
    },
    idBlog: {
      type: String,
      require: [true, "The comment must have to id blog"],
    },
    replyCM: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      require: [true, "You the content fried"],
    },

    status: {
      type: String,
      default: "normal",
    },
    report: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

commentSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
})

export default mongoose.model("comment", commentSchema);
