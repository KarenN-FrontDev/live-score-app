import styled from "styled-components";

export const Main = styled.main`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    2,
    1fr
  ); /* 2 columns → 4 cards in 2 rows on large screens */
  gap: 20px;
  margin-bottom: 40px;

  /* Smaller screens (≤ 992px) → 1 column */
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    justify-items: center; /* Center cards on smaller screens */
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;
