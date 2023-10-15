import React, { useContext, useEffect } from "react";
import SocketContext from "../utils/SocketContext";

const Test = () => {
  const socket = useContext(SocketContext);

  const handleEmit = () => {
    socket.emit("test");
  };

  useEffect(() => {
    if (socket) {
      socket.on("test-server", (data) => {
        console.log(data);
      });
    }
  }, [socket]);

  return (
    <div>
      <button className="bg-blue-400 p-2" onClick={handleEmit}>
        Click
      </button>
    </div>
  );
};

export default Test;
