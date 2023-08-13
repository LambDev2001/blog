import Chats from "../models/chatModel.js";

const chatCtrl = {
  sendMessage: async (idRoom, idUser, message, socket) => {
    try {
      const newMessage = new Chats({ idRoom, idUser, message });
      await newMessage.save();

      socket.broadcast.to(idRoom).emit("new-message", { message });
    } catch (err) {
      console.log({ smg: err });
    }
  },

  recoverMessage: async (idRoom, idUser, idMessage, socket) => {
    try {
      const chat = await Chats.findOneAndDelete({ _id: idMessage, idUser });
      if (!chat) socket.to(idRoom).emit("recover-message-server", { err: "Message not found" });
      else socket.broadcast.to(idRoom).emit("recover-message-server", { idMessage });

    } catch (err) {
      console.log({ smg: err });
    }
  },
};

export default chatCtrl;
