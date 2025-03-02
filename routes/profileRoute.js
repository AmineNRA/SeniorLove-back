import express from "express";
import { profileController } from "../controllers/profileController.js";
import { testController } from "../controllers/testController.js";
import authMiddleware from "../middlewares/authMiddleware.js"

const profileRouter = express.Router();

profileRouter.get('/profile/find', authMiddleware, profileController.getProfile);
profileRouter.get('/profiles', authMiddleware, profileController.filterProfile);
profileRouter.patch('/profile/', authMiddleware, profileController.updateProfile);
profileRouter.delete('/profile/', profileController.deleteProfile);
profileRouter.get('/test/', authMiddleware, testController.interestService);

export default profileRouter;