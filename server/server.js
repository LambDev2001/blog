import "./config/access.env.js";

import express from "express";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";

import routers from "./routers/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors("http://localhost:3000"));

// connect database
import "./config/database.js";

// routers
app.use("/api", routers);

// socket io
const http = createServer(app);
export const io = new Server(http);

import socketServer from "./config/socket.js";

io.on("connection", (socket) => {
  socketServer(socket);
});

// start server
http.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}/api`);
});
