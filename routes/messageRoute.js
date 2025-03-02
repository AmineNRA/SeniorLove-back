import express from "express";
import { messageController } from "../controllers/messageController.js";
import authMiddleware from "../middlewares/authMiddleware.js"

const messageRouter = express.Router();

messageRouter.post('/message', authMiddleware, messageController.createMessage);
messageRouter.patch('/message/:id', authMiddleware, messageController.updateMessage);
messageRouter.delete('/message/:id', authMiddleware, messageController.deleteMessage);

export default messageRouter;