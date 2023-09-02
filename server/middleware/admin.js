import Admins from "../models/adminModel.js";
import jwt from "jsonwebtoken";

const admin = async (req, res, next) => {
  try {
    const token = req.header("Authorization"); // token = user._id
    if (!token) {
      return res.json({ err: "Invalid Authorization" });
    }
    const decode = jwt.decode(token, `${process.env.ACCESS_TOKEN_SECRET}`);
    if (!decode) return res.json({ err: "Invalid Authorization when decoding token" });

    const admin = await Admins.findOne({ _id: decode.id }, { projection: { password: 0 } });
    if (!admin) return res.json({ err: "Admin not found" });

    req.user = admin;
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export default admin;
