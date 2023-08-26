import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import Users from "../models/userModel.js";
import Admins from "../models/adminModel.js";
import Blogs from "../models/blogModel.js";
import Reports from "../models/reportModel.js";

const userCtrl = {
  // auth
  checkInfoUser: async (req, res) => {
    try {
      const { idUser } = req.params;
      if (!idUser) return res.json({ msg: "idUser is required" });

      let user = await Users.findById({ _id: idUser }).select(
        "-password -__v -createdAt -updatedAt -report -status"
      );
      if (!user) {
        const admin = await Admins.findById(req.user.id);
        if (admin)
          user = await Admins.findById({ _id: idUser }).select(
            "-password -__v -createdAt -updatedAt"
          );
        else {
          return res.json({ msg: "User not found" });
        }
      }

      const friends = await Users.find({ _id: { $in: user.friends } }).select(
        "-account -friends -password -__v -createdAt -updatedAt -report -status"
      );

      return res.status(200).json({ ...user._doc, friends });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  searchUser: async (req, res) => {
    try {
      var users = await Users.aggregate([
        {
          $search: {
            index: "searchUser",
            autocomplete: {
              query: `${req.query.search}`,
              path: "username",
            },
          },
        },
        { $sort: { createdAt: -1 } },
        { $limit: 10 },
        {
          $project: {
            username: 1,
            account: 1,
            avatar: 1,
          },
        },
      ]);

      if (users.length < 1) {
        users = await Users.aggregate([
          {
            $search: {
              index: "searchUser",
              autocomplete: {
                query: `${req.query.search}`,
                path: "account",
              },
            },
          },
          { $sort: { createdAt: -1 } },
          { $limit: 10 },
          {
            $project: {
              username: 1,
              account: 1,
              avatar: 1,
            },
          },
        ]);
      }

      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // user
  resetPassword: async (req, res) => {
    try {
      const { token } = req.params; // change this
      const newInfo = jwt.verify(token, `${process.env.TEMP_TOKEN}`); // change this
      const passwordHash = await bcrypt.hash(newInfo.password, 12);

      await Users.findOneAndUpdate({ _id: newInfo.id }, { password: passwordHash });

      return res.status(200).json({ msg: "Update password successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  listFriends: async (req, res) => {
    try {
      const { friends } = await Users.findById({
        _id: req.user.id,
      }).select("friends");

      return res.status(200).json(friends);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  removeFriend: async (req, res) => {
    try {
      if (req.user.id === req.params.idUser)
        return res.json({ msg: "Your id duplicate with id send request" });

      const user = await Users.findById({ _id: req.user.id });
      if (!user) return res.json({ msg: "User not found" });

      // check id in the requestFriends
      const requestFriends = user.friends;
      if (requestFriends.indexOf(req.params.idUser) !== -1) {
        await Users.findByIdAndUpdate({ _id: req.user.id }, { $pull: { friends: req.body.id } });
        return res.status(200).json({ msg: "you declined the request successfully" });
      } else {
        return res.json({ msg: "Not found your friend" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      if (req.user.id !== req.params.idUser) return res.json({ msg: "You are not owner" });

      const { username, avatar } = req.body;
      await Users.findByIdAndUpdate({ _id: req.user.id }, { username, avatar });

      return res.status(200).json({ msg: "Updated information successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // admin
  getUser: async (req, res) => {
    try {
      const { idUser } = req.params;

      const user = await Users.findById({ _id: idUser }).select("-password -__v -updatedAt");
      if (!user) res.json({ err: "User not found" });

      const friends = await Users.find({ _id: { $in: user.friends } });
      const blogs = await Blogs.find({ idUser: idUser });
      const reports = await Reports.find({ idUser: idUser });

      return res.status(200).json({ ...user._doc, blogs, reports, friends });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUsers: async (req, res) => {
    try {
      let users = await Users.find({}).select([
        "account",
        "username",
        "avatar",
        "status",
        "report",
      ]);

      users = await Promise.all(
        users.map(async (user) => {
          const countBlogs = await Blogs.count({ idUser: user._id });
          return { ...user._doc, countBlogs };
        })
      );

      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default userCtrl;
