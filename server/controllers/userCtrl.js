import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import Users from "../models/userModel.js";

const userCtrl = {
  // auth
  checkInfoUser: async (req, res) => {
    try {
      const userId = req.params.idUser;
      if (!userId) return res.status(400).json({ msg: "userId is required" });

      const user = await Users.findById({ _id: userId }).select(["username", "account", "avatar"]);
      if (!user) return res.status(403).json({ msg: "User not found" });

      return res.status(200).json(user);
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
        return res.status(400).json({ msg: "Your id duplicate with id send request" });

      const user = await Users.findById({ _id: req.user.id });
      if (!user) return res.status(403).json({ msg: "User not found" });

      // check id in the requestFriends
      const requestFriends = user.friends;
      if (requestFriends.indexOf(req.params.idUser) !== -1) {
        await Users.findByIdAndUpdate({ _id: req.user.id }, { $pull: { friends: req.body.id } });
        return res.status(200).json({ msg: "you declined the request successfully" });
      } else {
        return res.status(400).json({ msg: "Not found your friend" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      if (req.user.id !== req.params.idUser)
        return res.status(403).json({ msg: "You are not owner" });

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
      const id = req.user.id;

      const user = await Users.findById({ _id: id }).select("-password");

      res.status(200).json(user);

      return res.status(200).json({ msg: "" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await Users.find({}).select([
        "username",
        "account",
        "avatar",
        "role",
        "createdAt",
      ]);

      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default userCtrl;
