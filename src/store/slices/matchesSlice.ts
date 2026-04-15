import type { PayloadAction} from "@reduxjs/toolkit";
import { createSelector,createSlice } from "@reduxjs/toolkit";

import type { Match } from "@/types/match";

import type { RootState } from "../store";

interface MatchesState {
  matches: Match[];
  filter: "all" | "result" | "live" | "upcoming" | "favorites";
  allMatches: Match[]; // Store all fetched matches
  // Track displayed count per filter
  displayedMatches: {
    all: number;
    result: number;
    live: number;
    upcoming: number;
    favorites: number;
  };
}

const MATCHES_PER_PAGE = 10;
const initialState: MatchesState = {
  matches: [],
  filter: "all",
  allMatches: [],
  displayedMatches: {
    all: MATCHES_PER_PAGE,
    result: MATCHES_PER_PAGE,
    live: MATCHES_PER_PAGE,
    upcoming: MATCHES_PER_PAGE,
    favorites: MATCHES_PER_PAGE,
  },
};

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    setMatches: (state, action: PayloadAction<Match[]>) => {
      state.allMatches = action.payload;
      state.matches = action.payload.slice(0, MATCHES_PER_PAGE);
      // Reset all filter display counts
      if (state.matches.length === 0) {
        state.displayedMatches = {
          all: MATCHES_PER_PAGE,
          result: MATCHES_PER_PAGE,
          live: MATCHES_PER_PAGE,
          upcoming: MATCHES_PER_PAGE,
          favorites: MATCHES_PER_PAGE,
        };
      }
    },
    loadMoreMatches: (state) => {
      const currentFilter = state.filter;
      state.displayedMatches[currentFilter] = Math.min(
        state.displayedMatches[currentFilter] + MATCHES_PER_PAGE,
        state.allMatches.length,
      );
    },
    updateMatch: (state, action: PayloadAction<Match>) => {
      const idx = state.matches.findIndex((m) => m.id === action.payload.id);
      if (idx !== -1) state.matches[idx] = action.payload;

      // Also update in allMatches
      const allIdx = state.allMatches.findIndex(
        (m) => m.id === action.payload.id,
      );
      if (allIdx !== -1) state.allMatches[allIdx] = action.payload;
    },
    setFilter: (state, action: PayloadAction<MatchesState["filter"]>) => {
      state.filter = action.payload;
    },
  },
});

export const { setMatches, loadMoreMatches, updateMatch, setFilter } =
  matchesSlice.actions;

export const selectFilteredMatches = createSelector(
  (state: RootState) => state.matches.allMatches,
  (state: RootState) => state.matches.filter,
  (state: RootState) => state.matches.displayedMatches,
  (state: RootState) => state.favorites.ids,

  (allMatches, filter, displayedMatches, favoriteIds) => {
    const limit = displayedMatches[filter];

    let filtered = allMatches;

    if (filter !== "all") {
      filtered = allMatches.filter((m) => {
        if (filter === "result") return m.status.type === "finished";
        if (filter === "live") return m.status.type === "inprogress";
        if (filter === "upcoming") return m.status.type === "notstarted";
        if (filter === "favorites") {
          return favoriteIds.includes(m.id);
        }

        return true;
      });
    }

    return filtered.slice(0, limit);
  },
);

export const selectCounts = createSelector(
  (state: RootState) => state.matches.allMatches,
  (state: RootState) => state.favorites.ids,

  (matches, favoriteIds) => ({
    all: matches.length,
    result: matches.filter((m) => m.status.type === "finished").length,
    live: matches.filter((m) => m.status.type === "inprogress").length,
    upcoming: matches.filter((m) => m.status.type === "notstarted").length,
    favorites: favoriteIds.length,
  }),
);

export const selectCanLoadMore = (state: RootState) => {
  const currentFilter = state.matches.filter;
  return (
    state.matches.displayedMatches[currentFilter] <
    state.matches.allMatches.length
  );
};

export const selectDisplayedCount = (state: RootState) =>
  state.matches.displayedMatches[state.matches.filter];

// Get total count of matches matching current filter from ALL matches
export const selectTotalFilteredCount = createSelector(
  (state: RootState) => state.matches.allMatches,
  (state: RootState) => state.matches.filter,
  (state: RootState) => state.favorites.ids,

  (allMatches, filter, favoriteIds) => {
    if (filter === "all") return allMatches.length;

    return allMatches.filter((m) => {
      if (filter === "result") return m.status.type === "finished";
      if (filter === "live") return m.status.type === "inprogress";
      if (filter === "upcoming") return m.status.type === "notstarted";
      if (filter === "favorites") {
        return favoriteIds.includes(m.id);
      }

      return true;
    }).length;
  },
);

// Get current displayed count of matches matching current filter
export const selectCurrentFilteredCount = createSelector(
  selectFilteredMatches,
  (filtered) => filtered.length,
);

// Check if there are more filtered matches available to load
export const selectCanLoadMoreFiltered = createSelector(
  selectTotalFilteredCount,
  selectCurrentFilteredCount,
  (state: RootState) => state.matches.filter,
  (state: RootState) => state.matches.displayedMatches,
  (total, _current, filter, displayedMatches) => {
    // Check if displayed count for this filter is less than total filtered count
    return displayedMatches[filter] < total;
  },
);

export default matchesSlice.reducer;
