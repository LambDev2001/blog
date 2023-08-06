import mongoose from "mongoose";

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
    view: { type: Number, default: 0 },
    permit: { type: String },
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
