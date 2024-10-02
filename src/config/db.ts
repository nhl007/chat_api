import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

export const client = new Client({
  connectionString: process.env.DB_CONNECTION_STRING,
});

export const db = drizzle(client);
