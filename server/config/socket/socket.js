
const socketServer = (socket) => {

  

  socket.on("disconnect", () => {
    console.log("User disconnected");
  })
}

export default socketServer