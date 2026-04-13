import styled from "styled-components";

export const Button = styled.button`
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 999;
  width: 52px;
  height: 52px;
  border: none;
  border-radius: 16px;
  background: #ffffff;
  color: #00ff99;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 22px 50px rgba(0, 0, 0, 0.45);
  }
`;
