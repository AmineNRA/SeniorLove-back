import express from 'express';
import { reservationController } from '../controllers/reservationController.js';
import authMiddleware from "../middlewares/authMiddleware.js";

export const reservationRouter = express.Router();

reservationRouter.get('/reservation/:event_id', authMiddleware, reservationController.createReservation);
reservationRouter.delete('/reservation/:event_id', authMiddleware, reservationController.deleteReservation)

export default reservationRouter;