import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import Users from "../models/userModel.js";
import {
  generateToken,
  generateActiveToken,
  generateAccessToken,
  generateRefreshToken,
} from "../config/generateToken.js";
import sendMail from "../config/sendMail.js";
import { validateEmail } from "../config/valid.js";

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

      const user = await Users.findById(decoded.id).select("-password +refreshToken");

      if (!user) return res.json({ msg: "This account does not exist." });
      if (refreshToken !== user.refreshToken) return res.json({ msg: "Please login now!" });

      const access_token = generateAccessToken({ id: user._id });
      const refresh_token = generateRefreshToken({ id: user._id }, res);

      await Users.findOneAndUpdate(
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

  activeAccount: async (req, res) => {
    try {
      const encodeNewUser = req.params.token; // change to req.body when have frond-end
      if (!encodeNewUser) {
        return res.json({ msg: "The frond-end not send active token or not valid" });
      }

      const decoded = jwt.verify(encodeNewUser, `${ACTIVE_TOKEN_SECRET}`);
      if (!decoded) {
        return res.json({ msg: "The error when decoding the active token" });
      }

      const { newUser } = decoded;
      const user = await Users.findOne({ account: newUser.account });

      if (user) {
        return res.json({ msg: "Token has been active" });
      } else {
        registerUser(newUser, res);
      }
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

      const user = await Users.findOne({ account }).select("-__v -status -report -updatedAt");
      if (!user) return res.json({ err: "Account not found" });

      loginUser(user, password, res);
    } catch (error) {
      return res.status(500).json({ err: error.message });
    }
  },

  register: async (req, res) => {
    try {
      const { username, account, password } = req.body;
      if (!username || !account || !password) {
        return res.json({ msg: "Fill all fields" });
      }

      const user = await Users.findOne({ account });
      if (user) return res.json({ msg: "User already exists" });

      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = { username, account, password: passwordHash };
      const encodeNewUser = generateActiveToken({ newUser });
      const url = `${BASE_URL}:${PORT}/api/active/${encodeNewUser}`; // have frond-end delete api
      console.log(url);
      if (validateEmail(account)) {
        sendMail(account, url, "Verify your account", "register");
        return res.status(200).json({ msg: "Click button on the email to active this account" });
      } else {
        return res.json({ msg: "Your mail address is not valid" });
      }
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { account } = req.body;

      if (!account) return res.json({ msg: "Account is required" });

      const user = await Users.findOne({ account });
      if (!user) return res.json({ msg: "Account not found" });

      const token = generateToken({ id: user._id });
      const url = `http://localhost:3000/reset-password/${token}`; // have frond-end delete api
      console.log(url);

      sendMail(account, url, "Reset your password", "forgotPassword");

      return res.status(200).json({ msg: "Check your email and follow link" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // user
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: `/api/refresh_token` });

      await Users.findOneAndUpdate(
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
};

const registerUser = async (user, res) => {
  const newUser = new Users(user);

  const access_token = generateAccessToken({ id: newUser._id });
  const refresh_token = generateRefreshToken({ id: newUser._id }, res);

  newUser.refreshToken = refresh_token;

  await newUser.save();

  res.json({
    msg: "Register Success!",
    access_token,
    user: { ...newUser._doc, password: "" },
  });
};

const loginUser = async (user, password, res) => {
  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ err: "The account or password is incorrect" });
    }

    if (!!user.ban) {
      return res.json({
        err:
          "Your account has been banned.\n" +
          user.ban +
          "\nPlease contact with admin to remove ban by admin@gmail.com",
      });
    }

    const accessToken = generateAccessToken({ id: user._id });
    const refreshToken = generateRefreshToken({ id: user._id }, res);
    await Users.findByIdAndUpdate({ _id: user._id }, { refreshToken: refreshToken });

    const friends = await Users.find({ _id: { $in: user.friends } }).select("username avatar");

    res.status(200).json({
      msg: "Login Success!",
      accessToken,
      user: { ...user._doc, password: "", friends },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};

export default authCtrl;
