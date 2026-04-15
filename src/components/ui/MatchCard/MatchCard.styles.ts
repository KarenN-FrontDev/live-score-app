import { motion } from "framer-motion";
import styled from "styled-components";

export const Card = styled(motion.div)`
  width: auto;
  max-width: 750px;
  height: auto;
  background: #1a1a1a;
  border-radius: 16px;
  padding: 40px 40px 32px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  @media (max-width: 1200px) {
    padding: 36px 32px 28px;
  }
  @media (max-width: 992px) {
    padding: 32px 28px 24px;
    border-radius: 14px;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    width: 100%;
    max-width: 670px;
  }
  @media (max-width: 480px) {
    padding: 28px 20px 20px;
    border-radius: 12px;
  }
`;

export const MatchHeader = styled.div`
  text-align: center;
  margin-bottom: 42px;

  @media (max-width: 1200px) {
    margin-bottom: 34px;
  }
  @media (max-width: 992px) {
    margin-bottom: 26px;
  }
  @media (max-width: 480px) {
    margin-bottom: 22px;
  }
`;

export const Country = styled.div`
  font-size: 14px;
  letter-spacing: 2px;
  color: #cccccc;
  margin-bottom: 8px;
  text-transform: uppercase;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const League = styled.div`
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 12px;
  color: #ffffff;
  line-height: 1.2;

  @media (max-width: 1200px) {
    font-size: 26px;
  }
  @media (max-width: 992px) {
    font-size: 24px;
  }
  @media (max-width: 480px) {
    font-size: 21px;
  }
`;

export const StatusText = styled.div<{ $color: string }>`
  font-size: 14px;
  letter-spacing: 1px;
  color: ${({ $color }) => $color};
  text-transform: uppercase;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const ScoreSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 72px;
  margin-bottom: 32px;

  @media (max-width: 480px) {
    margin-bottom: 28px;
  }
`;

export const Score = styled.div`
  font-size: 72px;
  font-weight: 300;
  letter-spacing: 4px;
  color: #ffffff;
  line-height: 1;

  @media (max-width: 1200px) {
    font-size: 66px;
  }
  @media (max-width: 992px) {
    font-size: 58px;
  }
  @media (max-width: 480px) {
    font-size: 50px;
  }
`;

export const Separator = styled.div`
  font-size: 42px;
  opacity: 0.6;
  color: #ffffff;
  line-height: 1;
  font-weight: 300;

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

export const TeamsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
  width: 100%;
  margin-bottom: 25px;

  @media (max-width: 1200px) {
    gap: 40px;
  }
  @media (max-width: 992px) {
    gap: 32px;
  }
  @media (max-width: 480px) {
    gap: 24px;
  }
`;

export const TeamName = styled.div`
  font-size: 20px;
  color: #ffffff;
  font-weight: 400;
  flex: 1;
  text-align: center;
  max-width: 240px;
  line-height: 1.3;

  @media (max-width: 1200px) {
    font-size: 19px;
  }
  @media (max-width: 992px) {
    font-size: 18px;
    max-width: 200px;
  }
  @media (max-width: 480px) {
    font-size: 16px;
    max-width: 150px;
  }
`;

export const CircleContainer = styled.div`
  position: relative;
  width: 82px;
  height: 82px;
  flex-shrink: 0;

  @media (max-width: 1200px) {
    width: 76px;
    height: 76px;
  }
  @media (max-width: 992px) {
    width: 68px;
    height: 68px;
  }
  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`;

export const Circle = styled.div<{
  $isHighlighted: boolean;
  $borderColor: string;
  $progress?: number;
}>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: ${({ $borderColor }) => $borderColor};
  background: transparent;
  border: 4px solid #555555;
  position: relative;
  right: 6px;

  /* LIVE: progressive border arc ONLY */
  ${({ $isHighlighted, $progress }) =>
    $isHighlighted &&
    $progress !== undefined &&
    `
    &::before {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      background: conic-gradient(#00ff99 0deg ${$progress}deg, transparent ${$progress}deg 360deg);
      mask: radial-gradient(farthest-side, transparent 90%, #000 90%);
      -webkit-mask: radial-gradient(farthest-side, transparent 90%, #000 90%);
    }
  `}

  /* ENDED: solid green border */
  ${({ $isHighlighted, $borderColor, $progress }) =>
    $isHighlighted && !$progress && `border: 4px solid ${$borderColor};`}
`;

export const LiveBadge = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background: #ffeb3b;
  color: #000;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 9999px;
  animation: livePulse 1.5s infinite;
  box-shadow: 0 0 15px #ffeb3b;
`;

export const StarButton = styled.button<{ $active: boolean }>`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  filter: ${({ $active }) =>
    $active
      ? "invert(0) sepia(100%) saturate(1200%) brightness(100%)"
      : "none"};
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.2);
  }
  &:active {
    transform: scale(0.9);
  }
`;
