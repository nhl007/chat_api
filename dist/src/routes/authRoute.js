"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authRouter = (0, express_1.Router)();
authRouter.route('/register').post(authController_1.register);
authRouter.route('/login').get(authController_1.login);
authRouter.route('/logout').get(authController_1.logout);
authRouter.route('/profile').get(authController_1.profile);
exports.default = authRouter;
