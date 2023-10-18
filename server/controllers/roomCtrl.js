import Rooms from "../models/roomModel.js";
import Users from "../models/userModel.js";

const groupCtrl = {
  // user
  listRoom: async (req, res) => {
    try {
      const idUser = req.user.id;

      let rooms = await Rooms.find({ member: idUser }).select(
        "-idUser -report -__v -createdAt -updatedAt"
      );

      return res.status(200).json(rooms);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  listMember: async (req, res) => {
    try {
      const { idRoom } = req.params;
      const idUser = req.user.id;

      const room = await Rooms.findOne({ _id: idRoom });
      if (!room) return res.json({ msg: "Room not found" });
      if (room.member.indexOf(idUser) === -1)
        return res.json({ msg: "You are not a member of this room" });

      const members = await Users.find({ _id: { $in: room.member } }).select("id username avatar");

      return res.status(200).json(members);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createRoom: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { nameRoom, avatarRoom } = req.body; // member: id user

      const newRoom = new Rooms({ idUser, nameRoom, avatarRoom, member: [idUser] });
      await newRoom.save();

      return res.status(200).json(newRoom);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  addMember: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { idRoom } = req.params;
      const { idMember } = req.body;
      const member = await Users.findOne({ _id: idMember });
      if (!member) return res.json({ err: "User not found" });

      const room = await Rooms.findOne({ _id: idRoom });
      if (room.member.indexOf(idUser) === -1)
        return res.json({ err: "You are not a member of this room" });
      if (room.member.indexOf(idMember) !== -1)
        return res.json({ err: "You are already member of this room" });

      await Rooms.findOneAndUpdate({ _id: idRoom }, { $push: { member: idMember } });

      return res.status(200).json({ msg: "Add new member successfully!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  },

  removeMember: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { idRoom } = req.params;
      const { idMember } = req.body;

      const room = await Rooms.findOne({ _id: idRoom });
      if (!room) return res.json({ err: "Room not found" });
      if (room.member.indexOf(idUser) === -1)
        return res.json({ err: "You are not a member of this room" });

      // if (idUser !== room.idUser && idUser !== idMember)
      //   return res.json({ err: "You are not owner" });

      await Rooms.findOneAndUpdate({ _id: idRoom }, { $pull: { member: idMember } });
      return res.status(200).json({ msg: "Remove member successfully!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },

  leaveMember: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { idRoom } = req.params;

      const room = await Rooms.findOne({ _id: idRoom });
      if (!room) return res.json({ err: "Room not found" });

      await Rooms.findOneAndUpdate({ _id: idRoom }, { $pull: { member: idUser } });
      return res.status(200).json({ msg: "Leave room successfully!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },

  updateRoom: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { idRoom } = req.params;
      const { nameRoom, avatarRoom } = req.body;

      if (nameRoom !== undefined) {
        await Rooms.findOneAndUpdate({ _id: idRoom }, { nameRoom });
      }
      if (avatarRoom !== undefined) {
        await Rooms.findOneAndUpdate({ _id: idRoom }, { avatarRoom });
      }

      return res.status(200).json({ msg: "Update room successfully!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  },

  deleteRoom: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { idRoom } = req.params;

      const room = await Rooms.findOne({ _id: idRoom });
      if (!room) return res.json({ msg: "Room not found" });
      if (room.member.indexOf(idUser) === -1)
        return res.json({ err: "You are not a member of this room" });

      await Rooms.findOneAndDelete({ _id: idRoom });

      return res.status(200).json({ msg: "Remove member successfully!" });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },
};

export default groupCtrl;
