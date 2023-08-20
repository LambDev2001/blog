import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema({
  idUser: {
    type: String,
    require: [true, "The policy must have id user"],
  },
  receiver: {
    type: String,
    require: [true, "Missing the id receiver"],
  },
});

export default mongoose.model("friendRequest", friendRequestSchema);
