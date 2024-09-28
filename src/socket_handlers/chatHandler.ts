import { DefaultEventsMap, Server, Socket } from "socket.io";
import { getMessages, getUserGroup, insertMessage } from "../db/messages.query";

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
  // ! get all message group
  socket.on("getChatHistory", async () => {
    const data = await getUserGroup();
    socket.emit("getChatHistory", JSON.stringify(data));
  });
  //! get all messages
  socket.on("getAllMessage", async (data: { room: string }) => {
    const msgs = await getMessages(data.room);
    socket.emit("getAllMessage", JSON.stringify(msgs));
  });

  socket.on("chatStart", (start: TChatStartParams) => {
    //!if admin
    if (start.admin) {
      const rooms = io.sockets.adapter.rooms.keys();
      return socket.emit("room_list", JSON.stringify(rooms));
    }

    //! else user
    socket.join(start.name);
    socket.emit("chatStart", `Room Created!`);
  });

  //! Admin
  socket.on("joinRoom", (join: TAdminJoinRoomParams) => {
    socket.join(join.room);
    socket.emit("joined_room", `${join.room}-- Room Joined!`);
  });

  //! All
  socket.on("message", async (message: TMessageParams) => {
    await insertMessage({
      admin: message.admin,
      sender: message.sender,
      message: message.message,
      room: message.room,
    });

    socket.to(message.room).emit("message", message.message);
  });

  // Disconnect user
  socket.on("disconnect", (reason) => {
    console.log(`${socket.id} disconnected due to`, reason);
  });
};
