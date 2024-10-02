import { DefaultEventsMap, Server, Socket } from "socket.io";
import {
  getMessages,
  getChatHistory,
  insertMessage,
} from "../db/messages.query";

type TChatStartParams = {
  admin: boolean;
  id: string;
  name: string;
  image: string;
  email: string;
};

type TAdminJoinRoomParams = {
  room: string;
};

type TMessageParams = {
  room: string;
  message: string;
  sender: string;
  admin: boolean;
};

export const chatHandler = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: Socket
) => {
  socket.on("chatStart", async (start: TChatStartParams) => {
    //!if admin
    if (start.admin) {
      // ! get all message group
      const data = await getChatHistory();
      return socket.emit("room_list", JSON.stringify(data));
    }

    //! else user
    socket.join(start.name);

    const msgs = await getMessages(start.name);
    socket.emit("userAllMsgs", JSON.stringify(msgs));
  });

  //! Admin
  socket.on("joinRoom", async (join: TAdminJoinRoomParams) => {
    socket.join(join.room);

    const msgs = await getMessages(join.room);

    socket.emit("joined_room", JSON.stringify(msgs));
  });

  //! All
  socket.on("message", async (message: TMessageParams) => {
    await insertMessage({
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
  });

  // Disconnect user
  socket.on("disconnect", (reason) => {
    console.log(`${socket.id} disconnected due to`, reason);
  });
};
