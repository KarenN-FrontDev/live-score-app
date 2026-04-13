import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 20px;
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top: 4px solid #00ff99;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const Text = styled.p`
  font-size: 16px;
  color: #cccccc;
  font-weight: 500;
  margin: 0;
`;
