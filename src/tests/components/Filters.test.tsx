import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import { Filters } from "@/components/ui/Filters";
import { setMatches } from "@/store/slices/matchesSlice";
import { store } from "@/store/store";

describe("Filters Component", () => {
  beforeEach(() => {
    const mockMatches = [
      { id: "1", status: { type: "finished" } },
      { id: "2", status: { type: "inprogress" } },
      { id: "3", status: { type: "notstarted" } },
    ] as any;
    store.dispatch(setMatches(mockMatches));
  });

  it("renders all filter buttons with correct counts", () => {
    render(
      <Provider store={store}>
        <Filters />
      </Provider>,
    );

    expect(screen.getByText("ALL")).toBeInTheDocument();
    expect(screen.getByText("Result")).toBeInTheDocument();
    expect(screen.getByText("Live")).toBeInTheDocument();
    expect(screen.getByText("Upcoming")).toBeInTheDocument();

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getAllByText("1")).toHaveLength(3);
  });

  it("changes active filter when clicked", () => {
    render(
      <Provider store={store}>
        <Filters />
      </Provider>,
    );

    const liveButton = screen.getByText("Live");
    fireEvent.click(liveButton);

    expect(liveButton).toHaveStyle({ backgroundColor: "#00b16a" });
  });
});
