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
import {
  generateAccessToken,
  generateActiveToken,
  generateRefreshToken,
} from "../config/generateToken.js";
import sendMail from "../config/sendMail.js";
import { now } from "mongoose";

const { ACTIVE_TOKEN_SECRET, REFRESH_TOKEN_SECRET, BASE_URL, PORT } = process.env;

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

      const topIdBlogs = await Views.find({}).sort({ view: -1 });
      const topBlogs = await Blogs.find({
        _id: { $in: topIdBlogs.map((view) => view.idBlog) },
      });

      info = { blogs, categories, views: views[0].totalViews, reports, users, topBlogs };

      return res.status(200).json(info);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  permits: async (req, res) => {
    try {
      const permits = await Admins.find({ role: "permit" });
      if (!permits) return res.json({ err: "No permits" });

      return res.status(200).json(permits);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createPermit: async (req, res) => {
    try {
      let { account, username, password } = req.body;
      if (!account || !password) {
        return res.json({ err: "Fill all fields" });
      }

      const permit = await Admins.findOne({ account });
      if (!!permit) return res.json({ err: "Account already exists" });
      password = await bcrypt.hash(password, 12);
      const newPermit = {
        account,
        username,
        password,
        role: "permit",
        status: "waiting",
        createdAt: new Date(),
        avatar:
          "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1699798246/blog/user-avatar_zvprbh.png",
      };

      const encodeNewPermit = generateActiveToken({ newPermit });

      const url = `${BASE_URL}:${PORT}/api/active-permit/${encodeNewPermit}`;
      console.log(url);

      sendMail(account, url, "Verify your account", "register");
      return res.json({ msg: "Click button on the email to active this account", data: newPermit });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  activePermit: async (req, res) => {
    try {
      const encodeNewPermit = req.params.token; // change to req.body when have frond-end
      if (!encodeNewPermit) {
        return res.json({ msg: "The frond-end not send active token or not valid" });
      }

      const decoded = jwt.verify(encodeNewPermit, `${ACTIVE_TOKEN_SECRET}`);
      if (!decoded) {
        return res.json({ msg: "The error when decoding the active token" });
      }

      const { newPermit } = decoded;
      const user = await Admins.findOne({ account: newPermit.account });

      if (!!user) {
        return res.json({ msg: "Token has been active" });
      } else {
        registerUser(newPermit, res);
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deletePermit: async (req, res) => {
    try {
      console.log(req.params.idPermit);
      const user = await Admins.findById(req.params.idPermit);

      if (!user) return res.json({ err: "User not found" });
      await Admins.findByIdAndDelete(req.params.idPermit);
      return res.json({ msg: "Delete user successfully" });
    } catch (err) {
      console.error(err);
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

const registerUser = async (permit, res) => {
  const newPermit = new Admins({ ...permit, status: "active" });

  const access_token = generateAccessToken({ id: newPermit._id });
  const refresh_token = generateRefreshToken({ id: newPermit._id }, res);

  newPermit.refreshToken = refresh_token;

  await newPermit.save();

  res.json({
    msg: "Register Success!",
    access_token,
    user: { ...newPermit._doc, password: "" },
  });
};

export default authCtrl;
