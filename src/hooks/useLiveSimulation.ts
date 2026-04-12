import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMatch } from "@/store/slices/matchesSlice";
import type { RootState } from "@/store/store";

export const useLiveSimulation = () => {
  const dispatch = useDispatch();
  const matches = useSelector((state: RootState) => state.matches.matches);

  useEffect(() => {
    const interval = setInterval(() => {
      const liveMatches = matches.filter((m) => m.status.type === "inprogress");
      if (liveMatches.length === 0) return;

      const randomMatch =
        liveMatches[Math.floor(Math.random() * liveMatches.length)];
      const updated = {
        ...randomMatch,
        homeScore: { ...randomMatch.homeScore },
        awayScore: { ...randomMatch.awayScore },
      };

      // Random goal
      if (Math.random() > 0.6) {
        updated.homeScore.current += 1;
      } else {
        updated.awayScore.current += 1;
      }

      // Simulate minute progression
      const currentMin = parseInt(updated.liveStatus) || 45;
      updated.liveStatus = `${Math.min(currentMin + Math.floor(Math.random() * 4) + 1, 90)}+`;

      dispatch(updateMatch(updated));
    }, 8000);

    return () => clearInterval(interval);
  }, [matches, dispatch]);
};
