import Rooms from "../models/roomModel.js";
import Users from "../models/userModel.js";

const groupCtrl = {
  // user
  listRoom: async (req, res) => {
    try {
      const idUser = req.user.id;

      const rooms = await Rooms.find({ member: idUser });

      return res.status(200).json(rooms);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  listMember: async (req, res) => {
    try {
      const idRoom = req.params.idRoom;
      const idUser = req.user.id;

      const room = await Rooms.findOne({ _id: idRoom });
      if (!room) return res.status(400).json({ msg: "Room not found" });
      if (room.member.indexOf(idUser) === -1)
        return res.status(400).json({ msg: "You are not a member of this room" });

      return res.status(200).json(room.member);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createRoom: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { nameRoom, avatarRoom, idMember } = req.body; // member: id user
      console.log({ idUser, idMember });

      const newGroup = new Rooms({ idUser, nameRoom, avatarRoom, member: [idUser, idMember] });
      await newGroup.save();

      return res.status(200).json({ msg: "Create new room successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  addMember: async (req, res) => {
    try {
      const idUser = req.user.id;
      const idRoom = req.params.idRoom;
      const { idMember } = req.body;
      const member = await Users.findOne({ _id: idMember });
      if (!member) return res.status(400).json({ msg: "User not found" });

      const room = await Rooms.findOne({ _id: idRoom });
      if (room.member.indexOf(idUser) === -1)
        return res.status(400).json({ msg: "You are not a member of this room" });
      if (room.member.indexOf(idMember) !== -1)
        return res.status(400).json({ msg: "You are already member of this room" });

      await Rooms.findOneAndUpdate({ _id: idRoom }, { $push: { member: idMember } });

      return res.status(200).json({ msg: "Add new member successfully!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },

  removeMember: async (req, res) => {
    try {
      const idUser = req.user.id;
      const idRoom = req.params.idRoom;
      const { idMember } = req.body;

      const room = await Rooms.findOne({ _id: idRoom });
      if (!room) return res.status(400).json({ msg: "Room not found" });
      if (room.member.indexOf(idUser) === -1)
        return res.status(400).json({ msg: "You are not a member of this room" });

      if (idUser !== room.idUser && idUser !== idMember)
        return res.status(400).json({ msg: "You are not owner" });

      if (room.member.length <= 2) {
        await Rooms.findOneAndDelete({ _id: idRoom });
        return res.status(200).json({ msg: "Room auto delete because no member" });
      } else {
        await Rooms.findOneAndUpdate({ _id: idRoom }, { $pull: { member: idMember } });
        return res.status(200).json({ msg: "Remove member successfully!" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteRoom: async (req, res) => {
    try {
      const idUser = req.user.id;
      const idRoom = req.params.idRoom;
      const { idMember } = req.body;

      const room = await Rooms.findOne({ _id: idRoom });
      if (!room) return res.status(400).json({ msg: "Room not found" });
      if (room.member.indexOf(idUser) === -1)
        return res.status(400).json({ msg: "You are not a member of this room" });

      if (idUser !== room.idUser && idUser !== idMember)
        return res.status(400).json({ msg: "You are not owner" });

      await Rooms.findOneAndUpdate({ _id: idRoom }, { $pull: { member: idMember } });

      return res.status(200).json({ msg: "Remove member successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default groupCtrl;
