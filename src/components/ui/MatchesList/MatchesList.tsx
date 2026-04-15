"use client";

import { useDispatch, useSelector } from "react-redux";

import { MatchCard } from "@/components/ui/MatchCard/index";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton/index";
import { loadMoreMatches ,
  selectCanLoadMore,
  selectCanLoadMoreFiltered,
  selectCurrentFilteredCount,
  selectFilteredMatches,
  selectTotalFilteredCount,
} from "@/store/slices/matchesSlice";

import {
  Grid,
  LoadMoreBtn,
  LoadMoreContainer,
  NoMatchesMessage,
  TotalCount,
} from "./MatchesList.styles";

const MatchesList = () => {
  const dispatch = useDispatch();
  const filteredMatches = useSelector(selectFilteredMatches);
  const canLoadMore = useSelector(selectCanLoadMore);
  const canLoadMoreFiltered = useSelector(selectCanLoadMoreFiltered);
  const currentFilteredCount = useSelector(selectCurrentFilteredCount);
  const totalFilteredCount = useSelector(selectTotalFilteredCount);

  const handleLoadMore = () => {
    dispatch(loadMoreMatches());
  };

  // Show Load More only if there are more filtered matches to load
  const shouldShowLoadMore =
    canLoadMore && canLoadMoreFiltered && filteredMatches.length > 0;

  return (
    <>
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
export default MatchesList;
