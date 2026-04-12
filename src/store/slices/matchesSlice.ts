import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { Match } from "@/types/match";
import type { RootState } from "../store";

interface MatchesState {
  matches: Match[];
  filter: "all" | "result" | "live" | "upcoming";
}

const initialState: MatchesState = { matches: [], filter: "all" };

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    setMatches: (state, action: PayloadAction<Match[]>) => {
      state.matches = action.payload;
    },
    updateMatch: (state, action: PayloadAction<Match>) => {
      const idx = state.matches.findIndex((m) => m.id === action.payload.id);
      if (idx !== -1) state.matches[idx] = action.payload;
    },
    setFilter: (state, action: PayloadAction<MatchesState["filter"]>) => {
      state.filter = action.payload;
    },
  },
});

export const { setMatches, updateMatch, setFilter } = matchesSlice.actions;

export const selectFilteredMatches = createSelector(
  (state: RootState) => state.matches.matches,
  (state: RootState) => state.matches.filter,
  (matches, filter) => {
    if (filter === "all") return matches;
    return matches.filter((m) => {
      if (filter === "result") return m.status.type === "finished";
      if (filter === "live") return m.status.type === "inprogress";
      if (filter === "upcoming") return m.status.type === "notstarted";
      return true;
    });
  },
);

export const selectCounts = createSelector(
  (state: RootState) => state.matches.matches,
  (matches) => ({
    all: matches.length,
    result: matches.filter((m) => m.status.type === "finished").length,
    live: matches.filter((m) => m.status.type === "inprogress").length,
    upcoming: matches.filter((m) => m.status.type === "notstarted").length,
  }),
);

export default matchesSlice.reducer;
