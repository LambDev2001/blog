let users = {};
const socketServer = async (socket) => {
  socket.on("join-room", (idRoom) => {
    socket.join(idRoom);
  });

  socket.on("user", () => {
    console.log(socket.adapter.rooms);
  });

  socket.on("leave-room", (socket) => {
    socket.leave(idRoom);
  });

  socket.on("connect_error", (error) => {
    console.log(error);
  });

  socket.on("disconnect", () => {
  });
};

export default socketServer;
