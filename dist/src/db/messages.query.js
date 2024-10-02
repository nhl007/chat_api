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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatHistory = exports.getMessages = exports.insertMessage = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../config/db");
const messages_schema_1 = require("./messages.schema");
const insertMessage = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db_1.db.insert(messages_schema_1.messages).values(params).returning();
        return data[0];
    }
    catch (error) {
        return null;
    }
});
exports.insertMessage = insertMessage;
const getMessages = (room) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const msgs = yield db_1.db
            .select()
            .from(messages_schema_1.messages)
            .where((0, drizzle_orm_1.eq)(messages_schema_1.messages.room, room))
            .orderBy((0, drizzle_orm_1.asc)(messages_schema_1.messages.date));
        return msgs;
    }
    catch (error) {
        return [];
    }
});
exports.getMessages = getMessages;
const getChatHistory = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const msgs = yield db_1.db
            .select({
            room: messages_schema_1.messages.room,
        })
            .from(messages_schema_1.messages)
            .where((0, drizzle_orm_1.eq)(messages_schema_1.messages.admin, false))
            .groupBy(messages_schema_1.messages.room)
            .then((users) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, users_1, users_1_1;
            var _b, e_1, _c, _d;
            const history = [];
            try {
                for (_a = true, users_1 = __asyncValues(users); users_1_1 = yield users_1.next(), _b = users_1_1.done, !_b; _a = true) {
                    _d = users_1_1.value;
                    _a = false;
                    const d = _d;
                    const data = yield db_1.db
                        .select({
                        message: messages_schema_1.messages.message,
                        date: messages_schema_1.messages.date,
                    })
                        .from(messages_schema_1.messages)
                        .where((0, drizzle_orm_1.eq)(messages_schema_1.messages.room, d.room))
                        .orderBy((0, drizzle_orm_1.desc)(messages_schema_1.messages.date))
                        .limit(1);
                    history.push({
                        room: d.room,
                        lastMessage: data.length ? data[0].message : "",
                        lastMessageDate: data.length ? data[0].date : "",
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_a && !_b && (_c = users_1.return)) yield _c.call(users_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return history;
        }));
        return msgs;
    }
    catch (error) {
        console.log(error);
        return [];
    }
});
exports.getChatHistory = getChatHistory;
