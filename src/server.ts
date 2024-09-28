import * as dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { client } from "./config/db";
import { chatHandler } from "./socket_handlers/chatHandler";

const PORT = process.env.PORT || 3000;
const MODE = process.env.NODE_ENV || "development";

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  chatHandler(io, socket);
});

server.listen(PORT, async () => {
  await client.connect().then(() => {
    console.log("Connected to db!");
  });

  console.log(`App is running on port : ${PORT} in ${MODE} mode `);
});

process.on("unhandledRejection", (err: Error) => {
  console.log("Shutting down the server due to: " + err.message);
  server.close(() => {
    process.exit(1);
  });
});
