"use client";

import React from "react";
import { formatMatchDateTime } from "@/services/date";
import type { Match } from "@/types/match";
import {
  Card,
  MatchHeader,
  Country,
  League,
  StatusText,
  ScoreSection,
  Score,
  Separator,
  TeamsSection,
  TeamName,
  CircleContainer,
  Circle,
  LiveBadge,
} from "./MatchCard.styles";

interface Props {
  match: Match;
}

const MatchCard = React.memo(({ match }: Props) => {
  const {
    country,
    competition,
    status,
    homeScore,
    awayScore,
    liveStatus,
    homeTeam,
    awayTeam,
    date,
    time,
  } = match;

  const isEnded = status.type === "finished";
  const isLive = status.type === "inprogress";
  const isCancelled = status.type === "canceled";
  const isPreMatch = status.type === "notstarted";

  let statusDisplay = "";
  let statusColor = "#cccccc";

  if (isCancelled) {
    statusDisplay = "CANCELLED";
    statusColor = "#ff4d6d";
  } else if (isEnded) {
    statusDisplay = "ENDED";
    statusColor = "#00ff99";
  } else if (isLive) {
    statusDisplay = "LIVE";
    statusColor = "#ffeb3b";
  } else if (isPreMatch) {
    statusDisplay = formatMatchDateTime(date, time) || "PRE-MATCH";
    statusColor = "#cccccc";
  }

  const shouldHighlight = (isEnded || isLive) && !isCancelled;

  // Progressive border fill for LIVE only (based on current minute)
  let progress = undefined;
  let liveMinuteDisplay = liveStatus;

  if (isLive) {
    const minute = parseInt(liveStatus.replace(/[^0-9]/g, "")) || 45;
    progress = Math.min((minute / 90) * 360, 360);
    const isHalfTime = minute === 45 && !liveStatus.includes("+");
    liveMinuteDisplay = isHalfTime ? "HT" : `${minute}'`;
  }

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
    >
      <MatchHeader>
        <Country>{country.toUpperCase()}</Country>
        <League>{competition}</League>
        <StatusText $color={statusColor}>{statusDisplay}</StatusText>
      </MatchHeader>

      <ScoreSection>
        <Score>{homeScore.current}</Score>
        {homeScore.current !== undefined && awayScore.current !== undefined ? (
          <Separator>-</Separator>
        ) : null}
        <Score>{awayScore.current}</Score>
      </ScoreSection>

      <TeamsSection>
        <TeamName>{homeTeam.name}</TeamName>

        <CircleContainer>
          <Circle
            $isHighlighted={shouldHighlight}
            $borderColor="#00ff99"
            $progress={progress}
          >
            {isEnded && "FT"}
            {isLive && liveMinuteDisplay}
            {isLive && <LiveBadge>LIVE</LiveBadge>}
          </Circle>
        </CircleContainer>

        <TeamName>{awayTeam.name}</TeamName>
      </TeamsSection>
    </Card>
  );
});

export default MatchCard;
