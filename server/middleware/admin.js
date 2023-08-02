import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";

const checkAdmin = async(req, res, next) => {
  try {
    const token = req.header("Authorization"); // token = user._id
    if (!token) return res.status(403).json("Invalid Authorization");

    const decode = jwt.decode(token, `${process.env.ACCESS_TOKEN_SECRET}`);
    if (!decode)
    return res.status(403).json("Invalid Authorization when decoding token");

    const user = await Users.findOne({ _id: decode.id }).select("-password");
    if(!user) return res.status(403).json("Account not found");
    if(user.role !== "admin") return res.status(403).json({msg: "You are not an administrator"})

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export default checkAdmin;
