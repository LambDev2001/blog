import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    idAdmin: {
      type: String,
      require: [true, "The policy must have id Admin"],
    },
    content: {
      type: String,
      require: [true, "Missing the content"]
    },
    status: {
      type: String,
      default: "normal"
    },

  },{timestamps: true}
);

export default mongoose.model("policy", policySchema);
