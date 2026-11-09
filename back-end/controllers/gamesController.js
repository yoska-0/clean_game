import factroController from "./factorController.js";
import asyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";
import Game from "../models/gamesModel.js";
import axios from "axios";

// TODO: Redis caching , search return list like (google search) , autocomplete
const getGameFromAPI = async (name) => {
  let searchGame;
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${process.env.RAWG_API_KEY}`,
    );

    searchGame = response.data.results?.[0];
  } catch (error) {
    console.log(error);
  }

  // if no game found or thare an error
  if (!searchGame) {
    try {
      const res = await axios.get("https://api.gamebrain.co/v1/games", {
        params: { query: name },
        headers: {
          "x-api-key": process.env.GAMEBRAIN_API,
        },
      });

      searchGame = res.data.results?.[0];
    } catch (error) {
      console.log(error);
    }
  }

  if (!searchGame) {
    throw new AppError("No game found with that name", 404);
  }

  // 4. Normalize game data
  const gameName = searchGame.name;
  const gameImage = searchGame.background_image || searchGame.image;

  // be sure this game is not already in the database
  const game = await Game.findOne({
    name: gameName.toLowerCase(),
  });

  if (!game) {
    const newGame = await Game.create({
      name: gameName,
      image: gameImage,
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
    game = await getGameFromAPI(name);
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
    filterObj = { name: { $regex: `${req.query.name}`, $options: "i" } };
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
