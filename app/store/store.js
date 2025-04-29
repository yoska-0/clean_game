import { configureStore } from "@reduxjs/toolkit";
import APIGamesRducer from "../features/APIGames/APIGamesSlice";

export const store = configureStore({
  reducer: {
    APIGames: APIGamesRducer,
  },
});
