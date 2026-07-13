import express from "express";
import userController from "../controllers/userController.js";
import userValidator from "../utils/validators/userValidator.js";
import authController from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.post(
  "/",
  userValidator.createUserValidator,
  userController.createUser,
);

userRouter.get(
  "/me",
  authController.protect,
  userController.getMe,
  userController.getOneUser,
);

export default userRouter;
