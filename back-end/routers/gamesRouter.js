import express from "express";
import gamesController from "../controllers/gamesController.js";
import gamesValidator from "../utils/validators/gamesValidator.js";
import authController from "../controllers/authController.js";
import reviewsRouter from "./reviewsRouuter.js";

const gamesRouter = express.Router();

gamesRouter.use("/:gameId/reviews", reviewsRouter);

gamesRouter
  // .post(
  //   "/",
  //   authController.protect,
  //   gamesValidator.createGameValidator,
  //   gamesController.createGame,
  // )
  .get("/", gamesController.getGames);
// gamesRouter
//   .get("/:id", gamesController.getOneGame)
//   .patch("/:id", gamesController.updateGame)
//   .delete("/:id", gamesController.deleteGame);
gamesRouter.get(
  "/search",
  gamesController.filterGamesSearch,
  gamesController.searchGames,
);

export default gamesRouter;
