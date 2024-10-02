"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatHandler = void 0;
const messages_query_1 = require("../db/messages.query");
const chatHandler = (io, socket) => {
    socket.on("chatStart", (start) => __awaiter(void 0, void 0, void 0, function* () {
        if (start.admin) {
            const data = yield (0, messages_query_1.getChatHistory)();
            return socket.emit("room_list", JSON.stringify(data));
        }
        socket.join(start.name);
        const msgs = yield (0, messages_query_1.getMessages)(start.name);
        socket.emit("userAllMsgs", JSON.stringify(msgs));
    }));
    socket.on("joinRoom", (join) => __awaiter(void 0, void 0, void 0, function* () {
        socket.join(join.room);
        const msgs = yield (0, messages_query_1.getMessages)(join.room);
        socket.emit("joined_room", JSON.stringify(msgs));
    }));
    socket.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, messages_query_1.insertMessage)({
            admin: message.admin,
            sender: message.sender,
            message: message.message,
            room: message.room,
        });
        socket.to(message.room).emit("message", {
            admin: message.admin,
            sender: message.sender,
            message: message.message,
            room: message.room,
        });
    }));
    socket.on("disconnect", (reason) => {
        console.log(`${socket.id} disconnected due to`, reason);
    });
};
exports.chatHandler = chatHandler;
