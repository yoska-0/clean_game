import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//import fuse js to imporove search
import Fuse from "fuse.js";

const initialState = {
  status: "idle",
  data: [],
  error: null,
};

export const fetchGamesAPI = createAsyncThunk(
  "APIGames/fetchGamesAPI",
  async () => {
    const res = await axios.get(
      "https://wwxtwxdsgxujnncqlhiv.supabase.co/rest/v1/games?select=*",
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
          Authorization: process.env.NEXT_PUBLIC_SUPABASE_AUTH_TOKEN,
        },
      }
    );
    return res.data;
  }
);

export function getGame(state, name) {
  if (Array.isArray(state) && state.length > 0) {
    const fuse = new Fuse(state, {
      keys: ["name"],
      threshold: 0.4,
    });
    const result = fuse.search(decodeURIComponent(name.toLowerCase()));
    return result.length > 0 ? result[0].item : undefined;
  }
}

export const APIGamesSlice = createSlice({
  name: "APIGames",
  initialState,
  reducers: {
    clearGamesData: (state) => {
      state.data = [];
      state.status = "idle";
      state.error = null;
      currentGame = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGamesAPI.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchGamesAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchGamesAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "حدث خطاءثناء جلب البيانات";
      });
  },
});

export const { clearGamesData } = APIGamesSlice.actions;
export default APIGamesSlice.reducer;
