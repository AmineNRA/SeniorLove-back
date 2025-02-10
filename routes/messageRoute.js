import express from "express";
import { messageController } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.post('/message', messageController.createMessage);
messageRouter.patch('/message/:id', messageController.updateMessage);
messageRouter.delete('/message/:id', messageController.deleteMessage);

export default messageRouter;