import styled, { css } from "styled-components";

export const Container = styled.div`
  padding: 2rem 5rem;
`;

export const ContainerTitle = styled.p`
  font-size: 21px;
  font-weight: 500;
  ${({ highlight }) =>
    highlight === 1 &&
    css`
      color: #ff5b22;
    `}

  ${({ sm }) =>
    sm === 1 &&
    css`
      font-size: 15px;
      margin-bottom: 2rem;
      color: #000;
    `}
`;

export const ContainerSpan = styled.span`
  color: #ff5b22;
`;
