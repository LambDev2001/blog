
const socketServer = async (socket) => {
  socket.on("join-room", (idRoom) => {
    socket.join(idRoom);
  });

  socket.on("user" , ()=>{
    console.log(socket.adapter.rooms)
  })
  
  socket.on("typing-started", (idRoom)=>{
    socket.broadcast.to(idRoom).emit("typing-started-server");
  })

  socket.on("typing-stopped", (idRoom)=>{
    socket.broadcast.to(idRoom).emit("typing-stopped-server");
  })

  socket.on("leave-room", (socket) => {
    socket.leave(idRoom);
  });
  

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
};

export default socketServer;
