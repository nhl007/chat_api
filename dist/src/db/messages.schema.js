"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
const pg_core_3 = require("drizzle-orm/pg-core");
const pg_core_4 = require("drizzle-orm/pg-core");
const pg_core_5 = require("drizzle-orm/pg-core");
exports.messages = (0, pg_core_5.pgTable)("messages", {
    id: (0, pg_core_4.uuid)("id").defaultRandom().primaryKey(),
    room: (0, pg_core_1.varchar)("room").notNull(),
    sender: (0, pg_core_1.varchar)("sender_id").notNull(),
    admin: (0, pg_core_3.boolean)("is_admin").notNull(),
    message: (0, pg_core_2.text)("message").notNull(),
    date: (0, pg_core_1.timestamp)("date", {
        mode: "string",
    }).defaultNow(),
});
