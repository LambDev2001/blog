import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
mongoose.plugin(mongooseDelete);

const reportSchema = new mongoose.Schema(
  {
    idUser: {
      type: String,
      require: true,
    },

    reportedIdUser: {
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

reportSchema.plugin(mongooseDelete);

export default mongoose.model("report", reportSchema);
