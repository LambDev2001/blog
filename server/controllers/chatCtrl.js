import Chats from "../models/chatModel.js";
import Rooms from "../models/roomModel.js";

const chatCtrl = {
  listChat: async (req, res) => {
    try {
      const { idRoom } = req.body;
      const room = await Rooms.findOne({ _id: idRoom });
      if (!room) return res.status(400).json({ msg: "Room not found" });
      if (room.member.indexOf(req.user.id) === -1)
        return res.status(400).json({ msg: "You are not a member of this room" });

      const listChat = await Chats.find({ idRoom: idRoom });

      return res.status(200).json(listChat);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createChat: async (req, res) => {
    try {
      const { idRoom, message } = req.body;
      const idUser = req.user.id;

      const newMessage = new Chats({ idRoom, idUser, message });
      await newMessage.save();

      socket.broadcast.to(idRoom).emit("new-message", { message });
      return res.status(200).json({ msg: "Send message successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteChat: async (req, res) => {
    try {
      const { idMessage, idRoom } = req.body;
      const idUser = req.user.id;

      const chat = await Chats.findOneAndDelete({ _id: idMessage, idUser });
      if (!chat) {
        socket.to(idRoom).emit("recover-message-server", { err: "Message not found" });
        return res.status(200).json({ msg: "Delete message failed" });
      }

      socket.broadcast.to(idRoom).emit("recover-message-server", { idMessage });
      return res.status(200).json({ msg: "Delete message successfully!" });
    } catch (err) {
      console.log({ smg: err });
    }
  },
};

export default chatCtrl;
