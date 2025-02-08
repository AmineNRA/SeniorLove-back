import express from "express";
import { profileController } from "../controllers/profileController.js";

const profileRouter = express.Router();

profileRouter.get('/profile/:id', profileController.getProfile);
profileRouter.get('/profile', profileController.filterProfile);
profileRouter.patch('/profile/:id', profileController.updateProfile);
profileRouter.delete('/profile/:id', profileController.deleteProfile);

export default profileRouter;