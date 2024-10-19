import * as dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { createServer as createHttpsServer } from "node:https";
import { Server } from "socket.io";
import { client } from "./config/db";
import { chatHandler } from "./socket_handlers/chatHandler";
import fs from "fs";
import path from "path";

// Fetch SSL certs (use the correct paths for your certs)

const privateKey = fs.readFileSync(
  path.resolve(__dirname, "privatekey.pem"),
  "utf8"
);
const certificate = fs.readFileSync(
  path.resolve(__dirname, "certificate.pem"),
  "utf8"
);

// const ca = fs.readFileSync(path.resolve(__dirname, 'path/to/your/ca_bundle.pem'), 'utf8');

const credentials = { key: privateKey, cert: certificate };

const PORT = process.env.PORT || 3001;
const MODE = process.env.NODE_ENV || "development";

// Use HTTPS server instead of HTTP
const server = createHttpsServer(credentials, app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  chatHandler(io, socket);
});

server.listen(PORT, async () => {
  await client.connect().then(() => {
    console.log("Connected to db!");
  });

  console.log(`App is running on port : ${PORT} in ${MODE} mode with HTTPS`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.log("Shutting down the server due to: " + err.message);
  server.close(() => {
    process.exit(1);
  });
});
