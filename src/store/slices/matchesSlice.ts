import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { Match } from "@/types/match";
import type { RootState } from "../store";

interface MatchesState {
  matches: Match[];
  filter: "all" | "result" | "live" | "upcoming";
  loading: boolean;
  allMatches: Match[]; // Store all fetched matches
  // Track displayed count per filter
  displayedMatches: {
    all: number;
    result: number;
    live: number;
    upcoming: number;
  };
}

const MATCHES_PER_PAGE = 10;
const initialState: MatchesState = {
  matches: [],
  filter: "all",
  loading: true,
  allMatches: [],
  displayedMatches: {
    all: MATCHES_PER_PAGE,
    result: MATCHES_PER_PAGE,
    live: MATCHES_PER_PAGE,
    upcoming: MATCHES_PER_PAGE,
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
      state.displayedMatches = {
        all: MATCHES_PER_PAGE,
        result: MATCHES_PER_PAGE,
        live: MATCHES_PER_PAGE,
        upcoming: MATCHES_PER_PAGE,
      };
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    loadMoreMatches: (state) => {
      const currentFilter = state.filter;
      state.displayedMatches[currentFilter] = Math.min(
        state.displayedMatches[currentFilter] + MATCHES_PER_PAGE,
        state.allMatches.length
      );
    },
    updateMatch: (state, action: PayloadAction<Match>) => {
      const idx = state.matches.findIndex((m) => m.id === action.payload.id);
      if (idx !== -1) state.matches[idx] = action.payload;

      // Also update in allMatches
      const allIdx = state.allMatches.findIndex((m) => m.id === action.payload.id);
      if (allIdx !== -1) state.allMatches[allIdx] = action.payload;
    },
    setFilter: (state, action: PayloadAction<MatchesState["filter"]>) => {
      state.filter = action.payload;
    },
  },
});

export const { setMatches, setLoading, loadMoreMatches, updateMatch, setFilter } =
  matchesSlice.actions;

export const selectFilteredMatches = createSelector(
  (state: RootState) => state.matches.allMatches,
  (state: RootState) => state.matches.filter,
  (state: RootState) => state.matches.displayedMatches,
  (allMatches, filter, displayedMatches) => {
    // Get the display limit for current filter
    const limit = displayedMatches[filter];
    
    // First filter by type
    let filtered = allMatches;
    if (filter !== "all") {
      filtered = allMatches.filter((m) => {
        if (filter === "result") return m.status.type === "finished";
        if (filter === "live") return m.status.type === "inprogress";
        if (filter === "upcoming") return m.status.type === "notstarted";
        return true;
      });
    }
    // Then respect pagination limit for current filter
    return filtered.slice(0, limit);
  },
);

export const selectCounts = createSelector(
  (state: RootState) => state.matches.allMatches,
  (matches) => ({
    all: matches.length,
    result: matches.filter((m) => m.status.type === "finished").length,
    live: matches.filter((m) => m.status.type === "inprogress").length,
    upcoming: matches.filter((m) => m.status.type === "notstarted").length,
  }),
);

export const selectLoading = (state: RootState) => state.matches.loading;

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
  (allMatches, filter) => {
    if (filter === "all") return allMatches.length;
    return allMatches.filter((m) => {
      if (filter === "result") return m.status.type === "finished";
      if (filter === "live") return m.status.type === "inprogress";
      if (filter === "upcoming") return m.status.type === "notstarted";
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
  (total, current, filter, displayedMatches) => {
    // Check if displayed count for this filter is less than total filtered count
    return displayedMatches[filter] < total;
  },
);

export default matchesSlice.reducer;
