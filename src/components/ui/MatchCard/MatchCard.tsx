"use client";

import Image from "next/image";
import { memo } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { useMatchCardStatus } from "@/hooks/useMatchCardStatus";
import type { Match } from "@/shared/types/match";
import {
  Card,
  Circle,
  CircleContainer,
  Country,
  League,
  LiveBadge,
  MatchHeader,
  Score,
  ScoreSection,
  Separator,
  StarButton,
  StatusText,
  TeamName,
  TeamsSection,
} from "./MatchCard.styles";

const MatchCard = memo(({ match }: { match: Match }) => {
  const { country, competition, homeScore, awayScore, homeTeam, awayTeam } =
    match;

  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(match.id);
  const {
    statusDisplay,
    statusColor,
    shouldHighlight,
    progress,
    liveMinuteDisplay,
    isLive,
    isEnded,
  } = useMatchCardStatus(match);

  const handleToggleFavorite = () => toggleFavorite(match.id);

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
    >
      <StarButton $active={favorite} onClick={handleToggleFavorite}>
        <Image
          src="/assets/icons/star.svg"
          alt="favorite"
          width={22}
          height={22}
          style={{ borderRadius: "50%" }}
        />
      </StarButton>

      <MatchHeader>
        <Country>{country.toUpperCase()}</Country>
        <League>{competition}</League>
        <StatusText $color={statusColor}>{statusDisplay}</StatusText>
      </MatchHeader>

      <ScoreSection>
        <Score>{homeScore.current}</Score>
        {homeScore.current !== undefined && awayScore.current !== undefined && (
          <Separator>-</Separator>
        )}
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
