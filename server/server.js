import "./config/access.env.js"

import express from "express";
import { createServer } from "http";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";

import routers from "./routers/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// connect database
import "./config/database.js";

// routers
app.use("/api", routers);

// const httpServer = createServer();
// const io = new Server(httpServer, {
//   cors: {
//     origin: ["http://localhost:5000"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("login");
//   socket.on("msg_from_client", function (from, msg) {
//     console.log("Message is " + from, msg);
//   });
// });

// httpServer.listen(process.env.PORT, () => {
//   console.log(`Listening on http://localhost:${process.env.PORT}/api`);
// });
app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}/api`);
});
