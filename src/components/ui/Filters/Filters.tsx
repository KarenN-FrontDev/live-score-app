"use client";

import { useDispatch, useSelector } from "react-redux";

import { selectCounts,setFilter  } from "@/store/slices/matchesSlice";
import type { RootState } from "@/store/store";

import { CountBadge,FilterBtn, FilterContainer } from "./Filters.styles";

const Filters = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.matches.filter);
  const counts = useSelector(selectCounts);

  const options = [
    { key: "all", label: "ALL" },
    { key: "result", label: "Result" },
    { key: "live", label: "Live" },
    { key: "upcoming", label: "Upcoming" },
    { key: "favorites", label: "Favorites" },
  ] as const;

  return (
    <FilterContainer>
      {options.map(({ key, label }) => (
        <FilterBtn
          key={key}
          $active={filter === key}
          onClick={() => dispatch(setFilter(key))}
        >
          {label} <CountBadge>{counts[key as keyof typeof counts]}</CountBadge>
        </FilterBtn>
      ))}
    </FilterContainer>
  );
};

export default Filters;
