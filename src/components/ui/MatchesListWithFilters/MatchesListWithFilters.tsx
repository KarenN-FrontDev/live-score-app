"use client";

import { useDispatch, useSelector } from "react-redux";

import { Filters } from "@/components/ui/Filters/index";
import { MatchCard } from "@/components/ui/MatchCard/index";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton/index";
import { Loader } from "@/components/ui/Loader/index";
import { useMatchesData } from "@/hooks/useMatchesData";

import {
  loadMoreMatches,
  selectCanLoadMore,
  selectCanLoadMoreFiltered,
  selectCurrentFilteredCount,
  selectFilteredMatches,
  selectTotalFilteredCount,
} from "@/store/slices/matchesSlice";

import {
  ErrorMessage,
  Grid,
  LoadMoreBtn,
  LoadMoreContainer,
  NoMatchesMessage,
  TotalCount,
} from "./MatchesListWithFilters.styles";

const MatchesListWithFilters = () => {
  const { isLoading, error } = useMatchesData();

  const dispatch = useDispatch();
  const filteredMatches = useSelector(selectFilteredMatches);
  const canLoadMore = useSelector(selectCanLoadMore);
  const canLoadMoreFiltered = useSelector(selectCanLoadMoreFiltered);
  const currentFilteredCount = useSelector(selectCurrentFilteredCount);
  const totalFilteredCount = useSelector(selectTotalFilteredCount);

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

  const handleLoadMore = () => {
    dispatch(loadMoreMatches());
  };

  // Show Load More only if there are more filtered matches to load
  const shouldShowLoadMore =
    canLoadMore && canLoadMoreFiltered && filteredMatches.length > 0;

  return (
    <>
      <Filters />
      <Grid>
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))
        ) : (
          <NoMatchesMessage>
            No matches found for the selected filter.
          </NoMatchesMessage>
        )}
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
  );
};

export default MatchesListWithFilters;
