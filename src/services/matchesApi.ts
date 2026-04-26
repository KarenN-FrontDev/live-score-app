import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Match } from "@/shared/types/match";

import { mockWebSocket } from "./mockWebSocket";

export const matchesApi = createApi({
  reducerPath: "matchesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (builder) => ({
    getMatches: builder.query<Match[], void>({
      query: () => ({
        url:
          process.env.NEXT_PUBLIC_SPORTS_API_URL ??
          "https://raw.githubusercontent.com/spinbet/fe-interview-test/master/data/sports.json",
        responseHandler: (response) => response.json(),
      }),

      // === REAL-TIME WEBSOCKET CACHE LOGIC ===
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ): Promise<void> {
        mockWebSocket.connect();

        try {
          await cacheDataLoaded;

          const listener = (updatedMatch: Match) => {
            if (!updatedMatch?.id) return;

            updateCachedData((draft: Match[]) => {
              const index = draft.findIndex((m) => m.id === updatedMatch.id);
              if (index !== -1) {
                draft[index] = { ...draft[index], ...updatedMatch };
              }
            });
          };

          mockWebSocket.onMessage(listener);
        } catch {
          // No-op – cacheEntryRemoved may resolve before cacheDataLoaded
        }

        await cacheEntryRemoved;
        mockWebSocket.close();
      },
    }),
  }),
});

export const { useGetMatchesQuery } = matchesApi;
