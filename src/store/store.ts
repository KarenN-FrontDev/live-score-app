import { configureStore } from "@reduxjs/toolkit";

import { matchesApi } from "@/services/matchesApi";

import { loadFavorites, saveFavorites } from "./localStorage";
import favoritesReducer from "./slices/favoritesSlice";
import matchesReducer from "./slices/matchesSlice";

export const store = configureStore({
  reducer: {
    matches: matchesReducer,
    favorites: favoritesReducer,
    [matchesApi.reducerPath]: matchesApi.reducer,
  },
  preloadedState: {
    favorites: {
      ids: loadFavorites(),
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(matchesApi.middleware),
});

store.subscribe(() => {
  const state = store.getState();
  saveFavorites(state.favorites.ids);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
