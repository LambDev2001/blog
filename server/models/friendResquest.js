import mongoose from "mongoose";

const friendRequest = new mongoose.Schema(
  {
    idUser: {
      type: String,
      require: [true, "The policy must have id user"],
    },
    receiver: {
      type: String,
      require: [true, "Missing the id receiver"]
    },
    status: {
      type: String,
      default: "normal"
    },

  }
);

export default mongoose.model("friendRequest", friendRequest);
