import asyncHandler from "express-async-handler";
import factorController from "./factorController.js";
import User from "../models/userModel.js";

const createUser = factorController.createOne(User);

const deleteUser = factorController.deleteOne(User);

const getAllUsers = factorController.getAll(User);

const getOneUser = factorController.getOne(User);

// get curent logged user
const getMe = asyncHandler(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

export default { createUser, getMe, getOneUser };
