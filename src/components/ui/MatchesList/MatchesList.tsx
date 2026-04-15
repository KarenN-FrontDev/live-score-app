"use client";

import { useDispatch, useSelector } from "react-redux";
import { loadMoreMatches } from "@/store/slices/matchesSlice";
import {
  selectFilteredMatches,
  selectCanLoadMore,
  selectCanLoadMoreFiltered,
  selectCurrentFilteredCount,
  selectTotalFilteredCount,
} from "@/store/slices/matchesSlice";
import { MatchCard } from "@/components/ui/MatchCard/index";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton/index";
import {
  Grid,
  LoadMoreContainer,
  LoadMoreBtn,
  TotalCount,
  NoMatchesMessage,
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
