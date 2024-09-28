import { desc, eq } from "drizzle-orm";
import { db } from "../config/db";
import { messages } from "./messages.schema";

export const insertMessage = async (params: typeof messages.$inferInsert) => {
  try {
    const data = await db.insert(messages).values(params).returning();
    return data[0];
  } catch (error) {
    return null;
  }
};

export const getMessages = async (room: string) => {
  try {
    const msgs = await db
      .select()
      .from(messages)
      .where(eq(messages.room, room))
      .orderBy(desc(messages.date));
    return msgs;
  } catch (error) {
    return null;
  }
};

export const getUserGroup = async () => {
  try {
    const msgs = await db
      .select({
        sender: messages.sender,
      })
      .from(messages)
      .where(eq(messages.admin, false))
      .groupBy(messages.sender);
    return msgs;
  } catch (error) {
    console.log(error);
    return null;
  }
};
