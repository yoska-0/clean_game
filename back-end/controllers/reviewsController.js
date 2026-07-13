import Review from "../models/reviewsModel.js";
import asyncHandler from "express-async-handler";
import factorController from "./factorController.js";

const createReview = factorController.createOne(Review);
const getReviews = factorController.getAll(Review, {
  path: "user",
  select: "name",
});
const getOneReview = factorController.getOne(Review);
const updateReview = factorController.updateOne(Review);
const deleteReview = factorController.deleteOne(Review);

const setGameIdToBody = (req, res, next) => {
  if (req.params.gameId) req.body.game = req.params.game;
  next();
};

const createFilterObjForGame = (req, res, next) => {
  let filterObj = {};
  if (req.params.gameId) filterObj = { game: req.params.gameId };
  req.filterObj = filterObj;
  next();
};

export default {
  createReview,
  getReviews,
  getOneReview,
  updateReview,
  deleteReview,
  createFilterObjForGame,
  setGameIdToBody,
};
