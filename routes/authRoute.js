import express from "express";
import { authController } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post('/auth/register', authController.register);
authRouter.post('/auth/login', authController.login);
authRouter.post('/auth/logout', authController.logout);

export default authRouter;