import { configureStore } from "@reduxjs/toolkit";
import { loadFavorites, saveFavorites } from "./localStorage";
import matchesReducer from "./slices/matchesSlice";
import favoritesReducer from "./slices/favoritesSlice";
import { matchesApi } from "@/services/matchesApi";

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
