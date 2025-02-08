import express from "express";
import { matchController } from "../controllers/matchController.js";

const matchRouter = express.Router();

matchRouter.get('/match/:id', matchController.getAllMatch);
matchRouter.get('/match', matchController.createMatch);
matchRouter.delete('/match/delete', matchController.deleteMatch);

export default matchRouter;