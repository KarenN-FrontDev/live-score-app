"use client";

import Filters from "@/components/ui/Filters/Filters";
import { Loader } from "@/components/ui/Loader";
import { MatchesList } from "@/components/ui/MatchesList";
import { useGetMatchesQuery } from "@/services/matchesApi";
import { setMatches } from "@/store/slices/matchesSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ErrorMessage, Main } from "./page.styles";

export default function Home() {
  const { data: rawMatches = [], isLoading, error } = useGetMatchesQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (rawMatches.length > 0) {
      dispatch(setMatches(rawMatches));
    }
  }, [rawMatches, dispatch]);

  if (isLoading) {
    return <Loader message="Loading live matches..." />;
  }

  if (error) {
    return (
      <ErrorMessage>
        Failed to load matches. Please try again later.
      </ErrorMessage>
    );
  }

  return (
    <Main>
      <Filters />
      <MatchesList />
    </Main>
  );
}
