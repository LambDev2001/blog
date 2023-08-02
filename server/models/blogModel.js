import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    idUser: { type: string, require: true },
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
      minLength: 2000,
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
      default: "normal",
    },
    view: { type: Number },
    permit: { type: String, require: true },
    comment: { type: [String], default: [] },
    report: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("blog", blogSchema);
