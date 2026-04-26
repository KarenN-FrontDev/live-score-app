import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 40px;

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

export const LoadMoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px 20px;
  margin-bottom: 40px;
`;

export const LoadMoreBtn = styled.button`
  padding: 12px 32px;
  background: #00b16a;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 255, 153, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 255, 153, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 14px 20px;
  }
`;

export const TotalCount = styled.p`
  font-size: 14px;
  color: #888888;
  margin: 0;
  font-weight: 500;
`;

export const NoMatchesMessage = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  color: #888888;
  padding: 40px 0;
  font-size: 17px;
  font-weight: 400;
`;

export const ErrorMessage = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: #ff4d6d;
  font-size: 18px;
  font-weight: 500;
  background: #1a1a1a;
  border-radius: 12px;
  margin: 40px auto;
  max-width: 600px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;
