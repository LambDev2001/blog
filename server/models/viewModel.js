import mongoose from "mongoose";

const viewSchema = new mongoose.Schema({
  idBlog: {
    type: String,
    require: [true, "Missing id blog"],
  },
  view: {
    type: Number,
    default: 0,
  },
  viewMonthly: {
    type: Number,
    default: 0,
  },
}, {timestamps: true});

export default mongoose.model("view", viewSchema);
