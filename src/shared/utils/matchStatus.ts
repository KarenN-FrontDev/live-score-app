import { formatMatchDateTime } from "./dateFormatter";
import type { Match } from "@/shared/types/match";

export const getMatchStatusDisplay = (match: Match) => {
  const { status, date, time } = match;
  const isCancelled = status.type === "canceled";
  const isEnded = status.type === "finished";
  const isLive = status.type === "inprogress";
  const isPreMatch = status.type === "notstarted";

  if (isCancelled) return { text: "CANCELLED", color: "#ff4d6d" };
  if (isEnded) return { text: "ENDED", color: "#00ff99" };
  if (isLive) return { text: "LIVE", color: "#ffeb3b" };
  if (isPreMatch)
    return {
      text: formatMatchDateTime(date, time) || "PRE-MATCH",
      color: "#cccccc",
    };
  return { text: "", color: "#cccccc" };
};

export const getLiveProgress = (liveStatus: string) => {
  const minute = parseInt(liveStatus.replace(/[^0-9]/g, "")) || 45;
  return Math.min((minute / 90) * 360, 360);
};

export const getFormattedLiveMinute = (liveStatus: string) => {
  const minute = parseInt(liveStatus.replace(/[^0-9]/g, "")) || 45;
  const isHalfTime = minute === 45 && !liveStatus.includes("+");
  return isHalfTime ? "HT" : `${minute}'`;
};
