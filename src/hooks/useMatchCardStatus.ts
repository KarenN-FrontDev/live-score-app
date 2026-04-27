import type { Match } from "@/shared/types/match";
import {
  getMatchStatusDisplay,
  getLiveProgress,
  getFormattedLiveMinute,
} from "@/shared/utils/matchStatus";

export const useMatchCardStatus = (match: Match) => {
  const { status, liveStatus } = match;
  const isEnded = status.type === "finished";
  const isLive = status.type === "inprogress";
  const isCancelled = status.type === "canceled";
  const isPreMatch = status.type === "notstarted";

  const { text: statusDisplay, color: statusColor } =
    getMatchStatusDisplay(match);
  const shouldHighlight = (isEnded || isLive) && !isCancelled;

  const progress = isLive ? getLiveProgress(liveStatus) : undefined;
  const liveMinuteDisplay = isLive ? getFormattedLiveMinute(liveStatus) : "";

  return {
    isEnded,
    isLive,
    isCancelled,
    isPreMatch,
    statusDisplay,
    statusColor,
    shouldHighlight,
    progress,
    liveMinuteDisplay,
  };
};
