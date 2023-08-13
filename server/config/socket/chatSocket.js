import chatCtrl from "../../controllers/chatCtrl.js";

const chatSocket = (socket) => {
  socket.on("join-room", (idRoom) => {
    socket.join(idRoom);
  });

  socket.on("send-message", (idRoom, idUser, message) => {
    chatCtrl.sendMessage(idRoom, idUser, message, socket);
  })

  socket.on("recover-message", (idRoom, idUser, idMessage) => {
    console.log({idRoom, idUser, idMessage});
    chatCtrl.recoverMessage(idRoom, idUser, idMessage, socket);
  })


  socket.on("leave-room", (socket) => {
    socket.leave(idRoom);
  });
};

export default chatSocket;
