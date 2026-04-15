import styled from "styled-components";

export const HeaderEl = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  background: #000000;
  padding: 28px 20px;
  margin-top: 30px;
  text-align: center;
  text-transform: uppercase; 
  font-size: 38px;
  font-weight: 700;
  letter-spacing: -1.5px;
  color: #00ff99;
  box-shadow: 0 4px 20px rgba(0, 255, 153, 0.15);

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;
