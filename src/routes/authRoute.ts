import { Router } from 'express';
import {
  login,
  logout,
  profile,
  register,
} from '../controllers/authController';

const authRouter = Router();

authRouter.route('/register').post(register);
authRouter.route('/login').get(login);
authRouter.route('/logout').get(logout);
authRouter.route('/profile').get(profile);

export default authRouter;
