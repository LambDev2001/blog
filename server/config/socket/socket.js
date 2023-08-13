import chatSocket from "./chatSocket.js";

const socketServer = async (socket) => {
  chatSocket(socket);
  
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
};

export default socketServer;
