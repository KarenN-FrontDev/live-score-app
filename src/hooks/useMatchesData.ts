import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetMatchesQuery } from "@/services/matchesApi";
import { setMatches } from "@/store/slices/matchesSlice";

export const useMatchesData = () => {
  const { data: rawMatches = [], isLoading, error } = useGetMatchesQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (rawMatches.length) dispatch(setMatches(rawMatches));
  }, [rawMatches, dispatch]);

  return { isLoading, error };
};
