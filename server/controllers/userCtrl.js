import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import Users from "../models/userModel.js";
import Admins from "../models/adminModel.js";
import Blogs from "../models/blogModel.js";
import Reports from "../models/reportModel.js";
import Views from "../models/viewModel.js";

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
      const { token, value } = req.body;
      const decode = jwt.decode(token, `${process.env.ACCESS_TOKEN_SECRET}`);

      const user =
        (await Users.findOne({ _id: decode.id }, { projection: { password: 0 } })) ||
        (await Admins.findOne({ _id: decode.id }, { projection: { password: 0 } }));

      if (!user) return res.json({ err: "Account not found" });

      const check = await bcrypt.compare(value.currentPassword, user.password);
      if (!check) return res.json({ err: "Wrong password" });
      user.password = await bcrypt.hash(value.newPassword, 12);
      user.save();
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

  follow: async (req, res) => {
    try {
      const { idUser } = req.body;
      const user = await Users.findById({ _id: req.user.id });
      if (!user) return res.json({ msg: "User not found" });

      user.following.push(idUser);
      await user.save();
      return res.status(200).json({ msg: "Follow successfully" });
    }
    catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  unFollow: async (req, res) => {
    try {
      const { idUser } = req.body;
      const user = await Users.findById({ _id: req.user.id });
      if (!user) return res.json({ msg: "User not found" });

      user.following.splice(user.following.indexOf(idUser), 1);
      await user.save();
      return res.status(200).json({ msg: "Follow successfully" });
    }
    catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // admin
  getUser: async (req, res) => {
    try {
      const { idUser } = req.params;

      const user = await Users.findById({ _id: idUser }).select("-password -__v -updatedAt");
      if (!user) return res.json({ err: "User not found" });

      const friends = await Users.find({ _id: { $in: user.friends } });
      let blogs = await Blogs.find({ idUser: idUser });
      blogs = await Promise.all(
        blogs.map(async (blog) => {
          const views = await Views.findOne({ idBlog: blog._id });
          return { ...blog._doc, views: views.view };
        })
      );

      let reports = await Reports.find({ reportedIdUser: idUser });
      reports = await Promise.all(
        reports.map(async (report) => {
          const user = await Users.findById({ _id: report.idUser });
          return { ...report._doc, sender: user.username };
        })
      );

      return res.status(200).json({ ...user._doc, blogs, friends, reports });
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
  changeStatus: async (req, res) => {
    try {
      const { idUser } = req.params;
      const { status } = req.body;
      
      const user = await Users.findById({ _id: idUser });
      if (!user) return res.json({ msg: "User not found" });

      user.status = status;
      await user.save();

      return res.status(200).json({ msg: "Change status successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default userCtrl;
