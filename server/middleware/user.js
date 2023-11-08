import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";

const user = async (req, res, next) => {
  try {
    const token = req.header("Authorization"); // token = user._id
    if (!token) {
      return res.json({ err: "You are not logged in" });
    }
    const decode = jwt.decode(token, `${process.env.ACCESS_TOKEN_SECRET}`);
    if (!decode) return res.json({ err: "Invalid Authorization when decoding token" });

    const user = await Users.findOne({ _id: decode.id }, { projection: { password: 0 } });
    if (!user) return res.json({ err: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default user;
