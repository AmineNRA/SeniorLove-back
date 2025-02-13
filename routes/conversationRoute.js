import express from 'express';
import { conversationController } from '../controllers/conversationController.js';

export const conversationRouter = express.Router();

conversationRouter.get('/conversation/:profile_id', conversationController.getAllConversation);
conversationRouter.get('/conversation', conversationController.getConversation);
conversationRouter.delete('/conversation/:id', conversationController.deleteConversation);

export default conversationRouter;