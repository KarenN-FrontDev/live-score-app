import { configureStore } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";

describe("matchesApi test", () => {
  const createTestApi = (mockResponse: any, isError = false) =>
    createApi({
      reducerPath: "testApi",
      baseQuery: async () => {
        if (isError) {
          return {
            error: { status: 500, data: "Error" },
          };
        }

        return {
          data: mockResponse,
        };
      },

      endpoints: (builder) => ({
        getMatches: builder.query<any[], void>({
          query: () => "",
        }),
      }),
    });

  const createTestStore = (api: any) =>
    configureStore({
      reducer: {
        [api.reducerPath]: api.reducer,
      },
      middleware: (gDM) => gDM().concat(api.middleware),
    });

  it("fetches matches successfully", async () => {
    const api = createTestApi([{ id: "1", status: { type: "finished" } }]);

    const store = createTestStore(api);

    const data = await store
      .dispatch(api.endpoints.getMatches.initiate())
      .unwrap();

    expect(data).toHaveLength(1);
  });

  it("handles error state", async () => {
    const api = createTestApi(null, true);

    const store = createTestStore(api);

    await expect(
      store.dispatch(api.endpoints.getMatches.initiate()).unwrap(),
    ).rejects.toBeDefined();
  });
});
