import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { MatchCard } from "@/components/ui/MatchCard/index";

const mockMatch = {
  id: "test-1",
  name: "Test vs Test",
  competition: "Test League",
  country: "Test",
  status: { code: 100, type: "inprogress" as const },
  homeTeam: { id: 1, name: "Home FC", slug: "home" },
  awayTeam: { id: 2, name: "Away FC", slug: "away" },
  homeScore: { current: 2 },
  awayScore: { current: 6 },
  liveStatus: "71",
};

test("renders live match with correct score and LIVE badge", () => {
  render(
    <Provider store={store}>
      <MatchCard match={mockMatch} />
    </Provider>,
  );

  expect(screen.getByText("2")).toBeInTheDocument();
  expect(screen.getByText("6")).toBeInTheDocument();
});
