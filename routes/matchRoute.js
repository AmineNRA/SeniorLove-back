import express from "express";
import { matchController } from "../controllers/matchController.js";
import authMiddleware from "../middlewares/authMiddleware.js"

const matchRouter = express.Router();

matchRouter.get('/matchs/', authMiddleware, matchController.getAllMatch);
matchRouter.post('/match', authMiddleware, matchController.createMatch);
matchRouter.delete('/match', authMiddleware, matchController.deleteMatch);

export default matchRouter;