import express from 'express';
import { conversationController } from '../controllers/conversationController.js';
import authMiddleware from "../middlewares/authMiddleware.js"

export const conversationRouter = express.Router();

conversationRouter.get('/conversations/', authMiddleware, conversationController.getAllConversation);
conversationRouter.get('/conversation', authMiddleware, conversationController.getConversation);
conversationRouter.delete('/conversation/:id', authMiddleware, conversationController.deleteConversation);

export default conversationRouter;