import express from "express";
import { eventController } from "../controllers/eventController.js";
import authMiddleware from "../middlewares/authMiddleware.js"

const eventRouter = express.Router();

eventRouter.get('/event', authMiddleware, eventController.getAllEvent);
eventRouter.get('/event/:id', authMiddleware, eventController.getEvent);
eventRouter.post('/event', authMiddleware, eventController.createEvent);
eventRouter.patch('/event/:id', authMiddleware, eventController.updateEvent);
eventRouter.delete('/event/:id', authMiddleware, eventController.deleteEvent);

export default eventRouter;