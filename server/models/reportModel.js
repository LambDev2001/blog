import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    idUser: {
      type: String,
      require: true,
    },

    ids: {
      type: String,
      require: true,
    },

    type: {
      type: String,
      require: true,
    },

    content: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("report", reportSchema);
