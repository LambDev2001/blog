import Users from "../models/userModel.js";
import Admins from "../models/adminModel.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization"); // token = user._id
    if (!token) {
      return res.status(403).json("Invalid Authorization");
    }
    const decode = jwt.decode(token, `${process.env.ACCESS_TOKEN_SECRET}`);
    if (!decode)
      return res.status(403).json("Invalid Authorization when decoding token");

    const user = await Users.findOne({ _id: decode.id }).select("-password");
    const admin = await Admins.findOne({ _id: decode.id }).select("-password");

    if (user) {
      req.user = user
    } else if (admin) {
      req.user = admin
    } else {
      return res.status(403).json("Account not found");
    }

  
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export default auth;
