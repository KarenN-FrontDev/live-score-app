"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMatches, setLoading, loadMoreMatches } from "@/store/slices/matchesSlice";
import {
  selectFilteredMatches,
  selectLoading,
  selectCanLoadMore,
  selectCanLoadMoreFiltered,
  selectCurrentFilteredCount,
  selectTotalFilteredCount,
} from "@/store/slices/matchesSlice";
import { Filters } from "@/components/ui/Filters/index";
import { MatchCard } from "@/components/ui/MatchCard/index";
import { Loader } from "@/components/ui/Loader/index";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton/index";
import { useLiveSimulation } from "@/hooks/useLiveSimulation";
import { getMatches } from "@/services/api";
import { Main, Grid, LoadMoreContainer, LoadMoreBtn, TotalCount } from "./MatchesList.styles";

const MatchesList = () => {
  const dispatch = useDispatch();
  const filtered = useSelector(selectFilteredMatches);
  const loading = useSelector(selectLoading);
  const canLoadMore = useSelector(selectCanLoadMore);
  const canLoadMoreFiltered = useSelector(selectCanLoadMoreFiltered);
  const currentFilteredCount = useSelector(selectCurrentFilteredCount);
  const totalFilteredCount = useSelector(selectTotalFilteredCount);
  
  useLiveSimulation();

  useEffect(() => {
    dispatch(setLoading(true));
    getMatches()
      .then((matches) => {
        dispatch(setMatches(matches));
      })
      .catch((error) => {
        console.error("Failed to fetch matches:", error);
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(loadMoreMatches());
  };

  // Show Load More only if there are more filtered matches to load
  const shouldShowLoadMore = canLoadMore && canLoadMoreFiltered && filtered.length > 0;

  return (
    <Main>
      {!loading && <Filters />}
      {loading ? (
        <Loader message="Loading live matches..." />
      ) : (
        <>
          <Grid>
            {filtered?.map(match => (
              <MatchCard key={match?.id} match={match} />
            ))}
          </Grid>
          {shouldShowLoadMore && (
            <LoadMoreContainer>
              <LoadMoreBtn onClick={handleLoadMore}>Load More Matches</LoadMoreBtn>
              <TotalCount>
                Showing {currentFilteredCount} of {totalFilteredCount} matches
              </TotalCount>
            </LoadMoreContainer>
          )}
          <ScrollToTopButton />
        </>
      )}
    </Main>
  );
};

export default MatchesList;
