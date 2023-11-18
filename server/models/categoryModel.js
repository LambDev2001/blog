import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
mongoose.plugin(mongooseDelete);

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "The category must have to name category"],
    },
  }
);

categorySchema.plugin(mongooseDelete, {
  overrideMethods: "all",
})

export default mongoose.model("category", categorySchema);
