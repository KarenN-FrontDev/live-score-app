"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMatches } from "@/store/slices/matchesSlice";
import { selectFilteredMatches } from "@/store/slices/matchesSlice";
import { Filters } from "@/components/ui/Filters/index";
import { MatchCard } from "@/components/ui/MatchCard/index";
import { useLiveSimulation } from "@/hooks/useLiveSimulation";
import { getMatches } from "@/services/api";
import { Main, Grid } from "./MatchesList.styles";

const MatchesList = () => {
  const dispatch = useDispatch();
  const filtered = useSelector(selectFilteredMatches);
  useLiveSimulation();

  useEffect(() => {
    getMatches().then((matches) => {
      dispatch(setMatches(matches));
    });
  }, [dispatch]);

  return (
    <Main>
      <Filters />
      <Grid>
        {filtered.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </Grid>
    </Main>
  );
};

export default MatchesList;
