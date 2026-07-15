import factroController from "./factorController.js";
import asyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";
import Game from "../models/gamesModel.js";

// TODO: Redis caching , search return list like (google search) , autocomplete
const getGameFromRAWG = async (name) => {
  let searchGame;
  try {
    searchGame = await fetch(
      `https://api.rawg.io/api/games?search=${name}&key=${process.env.RAWG_API}`,
    );
  } catch (error) {
    throw new AppError("Failed to connect to RAWG API", 500);
  }

  if (!searchGame.ok) {
    throw new AppError("RAWG API error", 500);
  }

  const searchGameData = await searchGame.json();

  if (!searchGameData.results || searchGameData.results.length === 0) {
    throw new AppError("No game found with that name", 404);
  }

  // be sure this game is not already in the database
  const game = await Game.findOne({
    name: searchGameData.results[0].name.toLowerCase(),
  });

  if (!game) {
    const newGame = await Game.create({
      name: searchGameData.results[0].name,
      image: searchGameData.results[0].background_image,
    });

    return newGame;
  }

  return game;
};

const getGames = asyncHandler(async (req, res, next) => {
  const name = req.query.name;

  if (!name) {
    return next(new AppError("Name is required", 400));
  }

  let game = await Game.findOne({ name: name.toLowerCase() });

  if (!game) {
    game = await getGameFromRAWG(name);
  }

  res.status(200).json({
    status: "success",
    data: game,
  });
});

const createGame = factroController.createOne(Game);

const getOneGame = factroController.getOne(Game);

const updateGame = factroController.updateOne(Game);

const deleteGame = factroController.deleteOne(Game);

// search games
const searchGames = factroController.getAll(Game);

// filter to get games by part of name
const filterGamesSearch = (req, res, next) => {
  let filterObj = {};
  if (req.query.name)
    filterObj = { name: { $regex: `^${req.query.name}`, $options: "i" } };
  req.filterObj = filterObj;
  next();
};

export default {
  createGame,
  getGames,
  getOneGame,
  updateGame,
  deleteGame,
  searchGames,
  filterGamesSearch,
};
