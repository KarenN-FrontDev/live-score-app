import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Match } from "@/shared/types/match";
import { createWebSocketClient } from "./websocket/factory";
import { WebSocketMessageHandler } from "@/shared/types/websocket";

let wsClient: ReturnType<typeof createWebSocketClient> | null = null;

export const matchesApi = createApi({
  reducerPath: "matchesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getMatches: builder.query<Match[], void>({
      query: () => ({
        url:
          process.env.NEXT_PUBLIC_SPORTS_API_URL ??
          "https://raw.githubusercontent.com/spinbet/fe-interview-test/master/data/sports.json",
        responseHandler: (response) => response.json(),
      }),

      async onCacheEntryAdded(
        _arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData },
      ) {
        // Initialize the WS client if it has not yet been created.
        if (!wsClient) {
          wsClient = createWebSocketClient(
            process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001",
          );
          wsClient.connect();
        }

        try {
          // Wait until the initial cache is loaded before subscribing to WS updates
          const cacheEntry = await cacheDataLoaded;
          const matches = (cacheEntry as { data: Match[] }).data;

          // Set initial matches in WS client if supported (for mock compatibility)
          if (wsClient && "setInitialMatches" in wsClient) {
            wsClient.setInitialMatches(matches);
          }

          // Handler for incoming score updates from the WS
          const handleScoreUpdate = (update: {
            matchId: string;
            homeScore: number;
            awayScore: number;
          }) => {
            updateCachedData((draft) => {
              const match = draft.find((m) => m.id === update.matchId);
              if (match) {
                match.homeScore = {
                  ...match.homeScore,
                  current: update.homeScore,
                };
                match.awayScore = {
                  ...match.awayScore,
                  current: update.awayScore,
                };
              }
            });
          };

          wsClient.subscribe("scoreUpdate", handleScoreUpdate as unknown as WebSocketMessageHandler);

          await cacheEntryRemoved;
          wsClient.unsubscribe("scoreUpdate", handleScoreUpdate as unknown as WebSocketMessageHandler);
        } catch (err) {
          console.error("WebSocket subscription failed", err);
        }
      },
    }),
  }),
});

export const { useGetMatchesQuery } = matchesApi;
