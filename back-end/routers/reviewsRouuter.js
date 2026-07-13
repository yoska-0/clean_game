import express from "express";
import authController from "../controllers/authController.js";
import reviewsController from "../controllers/reviewsController.js";
import reviewsValidator from "../utils/validators/reviewsValidator.js";

const reviewsRouter = express.Router({ mergeParams: true });

reviewsRouter
  .route("/")
  .post(
    authController.protect,
    reviewsController.setGameIdToBody,
    reviewsValidator.createReviewValidator,
    reviewsController.createReview,
  )
  .get(reviewsController.createFilterObjForGame, reviewsController.getReviews);

reviewsRouter
  .route("/:id")
  .get(reviewsController.getOneReview)
  .patch(
    authController.protect,
    reviewsValidator.updateReviewValidator,
    reviewsController.updateReview,
  )
  .delete(authController.protect, reviewsController.deleteReview);

export default reviewsRouter;
