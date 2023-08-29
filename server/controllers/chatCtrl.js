import Chats from "../models/chatModel.js";
import Rooms from "../models/roomModel.js";

const chatCtrl = {
  listChat: async (req, res) => {
    try {
      const { idRoom } = req.params;
      const room = await Rooms.findOne({ _id: idRoom });
      if (!room) return res.json({ msg: "Room not found" });
      if (room.member.indexOf(req.user.id) === -1)
        return res.json({ msg: "You are not a member of this room" });

      let listChat = await Chats.find({ idRoom: idRoom })
        .sort({ createdAt: 1 })
        .select("-__v -updatedAt");

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
      const { idRoom } = req.body;
      const { idChat } = req.params;
      const idUser = req.user.id;

      const chat = await Chats.findOne({ _id: idChat });
      if (!chat) {
        socket.to(idRoom).emit("delete-chat-server", { err: "Message not found" });
        return res.status(200).json({ msg: "Delete message failed" });
      }
      if (chat.idUser !== idUser) {
        socket.to(idRoom).emit("delete-chat-server", { err: "You are not owner" });
        return res.status(200).json({ msg: "Delete message failed" });
      }

      await Chats.findOneAndDelete({ _id: idChat, idUser });

      socket.broadcast.to(idRoom).emit("delete-message-server", { idMessage });
      return res.status(200).json({ msg: "Delete message successfully!" });
    } catch (err) {
      err.log({ smg: err });
    }
  },
};

export default chatCtrl;
