import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FavoritesState = {
  ids: string[];
};

const initialState: FavoritesState = {
  ids: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      const exists = state.ids.includes(id);

      if (exists) {
        state.ids = state.ids.filter((x) => x !== id);
      } else {
        state.ids.push(id);
      }
    },

    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.ids = action.payload;
    },

    clearFavorites: (state) => {
      state.ids = [];
    },
  },
});

export const { toggle, setFavorites, clearFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
