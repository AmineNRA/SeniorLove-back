import express from "express";
import { eventController } from "../controllers/eventController.js";

const eventRouter = express.Router();

eventRouter.get('/event', eventController.getAllEvent);
eventRouter.get('/event/:id', eventController.getEvent);

export default eventRouter;