import express from "express";
import { eventController } from "../controllers/eventController.js";

const eventRouter = express.Router();

eventRouter.get('/event', eventController.getAllEvent);
eventRouter.get('/event/:id', eventController.getEvent);
eventRouter.post('/event', eventController.createEvent);
eventRouter.patch('/event/:id', eventController.updateEvent);
eventRouter.delete('/event/:id', eventController.deleteEvent);

export default eventRouter;