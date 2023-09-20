import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import Admins from "../models/adminModel.js";
import Blogs from "../models/blogModel.js";
import Categories from "../models/categoryModel.js";
import Views from "../models/viewModel.js";
import Reports from "../models/reportModel.js";
import Users from "../models/userModel.js";
import { generateAccessToken, generateRefreshToken } from "../config/generateToken.js";

const { REFRESH_TOKEN_SECRET } = process.env;

const authCtrl = {
  // none auth
  refreshToken: async (req, res) => {
    // refresh access and refresh token when expired
    try {
      const refreshToken = req.cookies.refreshtoken;
      if (!refreshToken) return res.json({ msg: "Please login now!" });

      // Take refreshToken from cookie
      const decoded = jwt.verify(refreshToken, `${REFRESH_TOKEN_SECRET}`);
      if (!decoded.id) return res.json({ msg: "Please login now!" });

      const user = await Admins.findById(decoded.id).select("-password +refreshToken");

      if (!user) return res.json({ msg: "This account does not exist." });
      if (refreshToken !== user.refreshToken) return res.json({ msg: "Please login now!" });

      const access_token = generateAccessToken({ id: user._id });
      const refresh_token = generateRefreshToken({ id: user._id }, res);

      await Admins.findOneAndUpdate(
        { _id: user._id },
        {
          refreshToken: refresh_token,
        }
      );

      res.json({ access_token, user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { account, password } = req.body;
      if (!account || !password) {
        return res.json({ msg: "Fill all fields" });
      }
      const user = await Admins.findOne({ account });
      if (!user) return res.json({ msg: "Account not found" });

      loginUser(user, password, res);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // admin
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: `/api/refresh_token` });

      await Admins.findOneAndUpdate(
        { _id: req.user._id },
        {
          refreshToken: "",
        }
      );

      return res.status(200).json({ msg: "Logged out!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  dashboard: async (req, res) => {
    try {
      let info = {};
      const blogs = await Blogs.countDocuments();
      const categories = await Categories.countDocuments();
      const reports = await Reports.countDocuments();
      const views = await Views.aggregate([
        {
          $group: {
            _id: null,
            totalViews: { $sum: "$view" },
          },
        },
      ]);
      const users = await Users.countDocuments();

      info = { blogs, categories, views: views[0].totalViews, reports, users };
      
      return res.status(200).json(info);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const loginUser = async (user, password, res) => {
  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ msg: "The account or password is incorrect" });

    const accessToken = generateAccessToken({ id: user._id });
    const refreshToken = generateRefreshToken({ id: user._id }, res);

    await Admins.findByIdAndUpdate({ _id: user._id }, { refreshToken: refreshToken });

    res.status(200).json({
      msg: "Login Success!",
      accessToken,
      user: { ...user._doc, password: "" },
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export default authCtrl;
