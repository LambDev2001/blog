import Admins from "../models/adminModel.js";
import jwt from "jsonwebtoken";

const permit = async (req, res, next) => {
  try {
    const token = req.header("Authorization"); // token = user._id
    if (!token) {
      return res.json("Invalid Authorization");
    }
    const decode = jwt.decode(token, `${process.env.ACCESS_TOKEN_SECRET}`);
    if (!decode) return res.json("Invalid Authorization when decoding token");

    const adminIdExists = await Admins.distinct("_id", { _id: decode.id });
    if (!adminIdExists) {
      return res.json("Admin not found");
    }

    const admin = await Admins.findOne(
      {
        _id: decode.id,
        role: { $in: ["permit", "admin"] },
      },
      { projection: { password: 0 } }
    );

    req.user = admin;
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export default permit;
