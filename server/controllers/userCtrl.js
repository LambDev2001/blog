import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import Users from "../models/userModel.js";

const userCtrl = {
  getUser: async (req, res) => {
    try {
      const id = req.user.id;
      if (!id)
        return res.status(400).json({ message: "Error when take user id" });

      const user = await Users.findById({ _id: id }).select("-password");

      res.status(200).json(user);

      return res.status(200).json({ msg: "" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  checkInfoUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      if (!userId) return res.status(400).json({ msg: "userId is required" });

      const user = await Users.findById({ _id: userId }).select([
        "username",
        "account",
        "avatar",
      ]);

      if (!user) return res.status(403).json({ msg: "User not found" });

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await Users.find({ role: "user" }).select([
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

  getAdmins: async (req, res) => {
    try {
      if (req.user.role !== "admin")
        return res.status(403).json({ msg: "Only admin is allowed" });

      const users = await Users.find({ role: "admin" }).select([
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

  updateUser: async (req, res) => {
    try {
      if (req.user.id !== req.params.userId)
        return res.status(403).json({ msg: "You are not owner" });

      const { username, avatar } = req.body;
      await Users.findByIdAndUpdate({ _id: req.user.id }, { username, avatar });

      return res.status(200).json({ msg: "Updated information successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { token } = req.params; // change this
      const newInfo = jwt.verify(token, `${process.env.TEMP_TOKEN}`); // change this
      const passwordHash = await bcrypt.hash(newInfo.password, 12);

      await Users.findOneAndUpdate(
        { _id: newInfo.id },
        { password: passwordHash }
      );

      return res.status(200).json({ msg: "Update password successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const adminId = req.user.id;
      const userId = req.params.userId;

      const admin = await Users.findById({ _id: adminId });
      if (!admin || admin.role !== "admin")
        return res
          .status(403)
          .json({ msg: "you don't have permission to delete this user" });

      const user = await Users.findOne({ _id: userId });
      if (!user) return res.status(403).json({ msg: "User not found" });

      await Users.findOneAndDelete({ _id: userId });

      return res
        .status(200)
        .json({ msg: `Delete ${user.account} successfully` });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  manageRole: async (req, res) => {
    try {
      const adminId = req.user.id;
      const { userId, role } = req.body;

      const admin = await Users.findById({ _id: adminId });
      if (!admin || admin.role !== "admin")
        return res
          .status(403)
          .json({ msg: "you don't have permission to delete this user" });

      const user = await Users.findOne({ _id: userId });
      if (!user) return res.status(403).json({ msg: "User not found" });

      await Users.findByIdAndUpdate({ _id: userId }, { role });

      return res.status(200).json({ msg: `Change ${user.account} to ${role}` });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  sendRequestFriend: async (req, res) => {
    try {
      if (req.user.id === req.body.id)
        return res.status(400).json({ msg: "You do not send friend to you" });

      const user = await Users.findById({ _id: req.body.id });
      if (!user) return res.status(403).json({ msg: "User not found" });

      // check has been friend
      const friends = user.friends;
      if (friends.indexOf(req.user.id) !== -1) {
        return res.status(400).json({ msg: "They has been add friend before" });
      }

      // check id in the requestFriends
      const requestFriends = user.requestFriends;
      if (requestFriends.indexOf(req.user.id) !== -1) {
        return res.status(400).json({ msg: "Friend request already sent" });
      }

      await Users.findByIdAndUpdate(
        { _id: req.user.id },
        { $push: { sendingRequestFriends: req.body.id } }
      );

      await Users.findByIdAndUpdate(
        { _id: req.body.id },
        { $push: { requestFriends: req.user.id } }
      );

      return res
        .status(200)
        .json({ msg: "Send request add friend successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  declineFriend: async (req, res) => {
    try {
      if (req.user.id === req.body.id)
        return res
          .status(400)
          .json({ msg: "Your id duplicate with id send request" });

      const user = await Users.findById({ _id: req.user.id });
      if (!user) return res.status(403).json({ msg: "User not found" });

      // check id in the requestFriends
      const requestFriends = user.requestFriends;
      console.log(user.username);
      if (requestFriends.indexOf(req.body.id) !== -1) {
        await Users.findByIdAndUpdate(
          { _id: req.body.id },
          { $pull: { sendingRequestFriends: req.user.id } }
        );

        await Users.findByIdAndUpdate(
          { _id: req.user.id },
          { $pull: { requestFriends: req.body.id } }
        );
        return res
          .status(200)
          .json({ msg: "you declined the request successfully" });
      } else {
        return res
          .status(400)
          .json({ msg: "Not found the request add friend" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  acceptFriend: async (req, res) => {
    try {
      if (req.user.id === req.body.id)
        return res.status(400).json({ msg: "You do not accept friend to you" });

      const user = await Users.findById({ _id: req.body.id });
      if (!user) return res.status(403).json({ msg: "User not found" });

      const requestFriends = user.requestFriends;
      if (requestFriends.indexOf(req.user.id) !== -1) {
        return res
          .status(400)
          .json({ msg: "You are not send request add friend" });
      }

      // check has been friend
      const friends = user.friends;
      if (friends.indexOf(req.user.id) !== -1) {
        return res.status(400).json({ msg: "They has been add friend before" });
      }

      await Users.findByIdAndUpdate(
        { _id: req.body.id },
        { $pull: { sendingRequestFriends: req.user.id } }
      );

      await Users.findByIdAndUpdate(
        { _id: req.user.id },
        { $pull: { requestFriends: req.body.id } }
      );

      await Users.findByIdAndUpdate(
        { _id: req.user.id },
        { $push: { friends: req.body.id } }
      );

      return res.status(200).json({ msg: "They are add friend successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  removeFriend: async (req, res) => {
    try {
      if (req.user.id === req.body.id)
        return res
          .status(400)
          .json({ msg: "Your id duplicate with id send request" });

      const user = await Users.findById({ _id: req.user.id });
      if (!user) return res.status(403).json({ msg: "User not found" });

      // check id in the requestFriends
      const requestFriends = user.friends;
      if (requestFriends.indexOf(req.body.id) !== -1) {
        await Users.findByIdAndUpdate(
          { _id: req.user.id },
          { $pull: { friends: req.body.id } }
        );
        return res
          .status(200)
          .json({ msg: "you declined the request successfully" });
      } else {
        return res.status(400).json({ msg: "Not found your friend" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  listFriends: async (req, res) => {
    try {
      const { friends } = await Users.findById({
        _id: req.params.idUser,
      }).select("friends");
      return res.status(200).json(friends);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

};

export default userCtrl;
