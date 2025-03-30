import express from 'express';
import { interestController } from '../controllers/interestController.js';

export const interestRouter = express.Router();

interestRouter.get('/interests/', interestController.getAllInterests);

export default interestRouter;