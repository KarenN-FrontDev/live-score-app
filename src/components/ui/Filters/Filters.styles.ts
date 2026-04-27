import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin: 32px 0;
  padding: 0 10px;
  position: relative;

  @media (max-width: 480px) {
    gap: 8px;
    margin: 24px 0;
  }
`;

export const FilterBtn = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? "#00b16a" : "#222222")};
  color: #ffffff;
  border: none;
  padding: 14px 26px;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    padding: 12px 20px;
    font-size: 14px;
  }
`;

export const CountBadge = styled.span`
  background: #111111;
  padding: 3px 11px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 500;
`;

export const WSErrorSimulationBtn = styled.button`
  background: #b03415;
  color: #ffffff;
  border: none;
  padding: 14px 26px;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    padding: 12px 20px;
    font-size: 14px;
  }
`;
