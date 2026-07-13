import express from "express";
import authValidator from "../utils/validators/authValidator.js";
import authController from "../controllers/authController.js";
import { createPendingUserValidator } from "../utils/validators/pendingUserValidator.js";

const authRouter = express.Router();

authRouter.post("/signup", createPendingUserValidator, authController.signUp);

authRouter.post(
  "/confirmEmail",
  authValidator.verifyConfirmCodeValidator,
  authController.verifyConfirmCode,
);

authRouter.post("/login", authValidator.loginValidation, authController.logIn);

authRouter.post("/forgotPassword", authController.forgatPassword);

authRouter.post("/verifyResetCode", authController.verifyResetCode);

authRouter.post("/resetPassword", authController.resetPassword);

export default authRouter;
