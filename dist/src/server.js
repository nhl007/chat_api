"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app_1 = __importDefault(require("./app"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const db_1 = require("./config/db");
const chatHandler_1 = require("./socket_handlers/chatHandler");
const PORT = process.env.PORT || 3000;
const MODE = process.env.NODE_ENV || "development";
const server = (0, node_http_1.createServer)(app_1.default);
const io = new socket_io_1.Server(server);
io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    (0, chatHandler_1.chatHandler)(io, socket);
});
server.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.client.connect().then(() => {
        console.log("Connected to db!");
    });
    console.log(`App is running on port : ${PORT} in ${MODE} mode `);
}));
process.on("unhandledRejection", (err) => {
    console.log("Shutting down the server due to: " + err.message);
    server.close(() => {
        process.exit(1);
    });
});
