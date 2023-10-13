import Chats from "../models/chatModel.js";
import Rooms from "../models/roomModel.js";
import Users from "../models/userModel.js";

const chatCtrl = {
  listChat: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { idRoom } = req.params;

      const room = await Rooms.findOne({ _id: idRoom });
      if (!room) return res.json({ err: "Room not found" });

      let listChat = await Chats.find({ idRoom: idRoom })
        .sort({ createdAt: -1 })
        .select("-__v -updatedAt");

      listChat = await Promise.all(
        listChat.map(async (item) => {
          const owner = idUser === item.idUser ? true : false;
          const author = await Users.findById(item.idUser).select("_id username avatar");
          
          return {
            ...item._doc,
            author,
            owner,
            message: item.message,
          };
        })
      );

      return res.status(200).json(listChat);
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },

  createChat: async (req, res) => {
    try {
      const { idRoom, message, type } = req.body;
      const idUser = req.user.id;

      const newMessage = new Chats({ idRoom, idUser, message, type });
      await newMessage.save();

      // socket.broadcast.to(idRoom).emit("new-message", { message });
      return res.status(200).json({ msg: "Send message successfully!" });
    } catch (err) {
      return res.status(500).json({ err: err.message });
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
      console.error(err);
    }
  },
};

export default chatCtrl;
