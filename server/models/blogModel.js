import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
mongoose.plugin(mongooseDelete);

const blogSchema = new mongoose.Schema(
  {
    idUser: { type: String, require: true },
    title: {
      type: String,
      require: true,
      trim: true,
      minLength: 10,
      maxLength: 50,
    },
    content: {
      type: String,
      require: true,
      minLength: 20,
    },
    thumbnail: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
      trim: true,
      minLength: 50,
      maxLength: 200,
    },
    category: {
      type: String,
      require: [true, "The blog must have to the category"],
    },
    status: {
      type: String,
      default: "waiting",
    },
    permit: { type: String },
    share: { type: Number, default: 0 },
    report: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

mongoose.plugin(mongooseDelete, {
  overrideMethods: "all",
});

export default mongoose.model("blog", blogSchema);
