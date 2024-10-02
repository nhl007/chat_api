"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.client = void 0;
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
exports.client = new pg_1.Client({
    connectionString: process.env.DB_CONNECTION_STRING,
});
exports.db = (0, node_postgres_1.drizzle)(exports.client);
