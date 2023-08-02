import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "The category must have to name category"],
    },
  }
);

export default mongoose.model("category", categorySchema);
