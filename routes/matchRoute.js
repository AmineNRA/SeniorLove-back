import express from "express";
import { matchController } from "../controllers/matchController.js";
import authMiddleware from "../middlewares/authMiddleware.js"

const matchRouter = express.Router();

matchRouter.get('/matchs/', authMiddleware, matchController.getAllMatch);
matchRouter.get('/match', authMiddleware, matchController.createMatch);
matchRouter.delete('/match/delete', authMiddleware, matchController.deleteMatch);

export default matchRouter;