import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContentTitle = styled.p`
  font-size: 38px;
  color: #000;
  font-weight: 500;
  margin-bottom: 4rem;
  margin-top: 7rem;
`;

export const ContentSpan = styled.span`
  color: #ff5b22;
`;

export const ImgContRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ImgCont = styled.div`
  cursor: pointer;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const DeveloperImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 7rem;
  width: 7rem;
`;

export const Tag = styled.div`
  background-color: ${({ color }) => color};
  border-radius: 20px;
  color: #000;
  font-weight: 600;
  padding: 0.4rem 1.5rem;
  margin: auto;
  margin-top: 1.2rem;
  width: fit-content;

  ${({ selected }) =>
    selected === 1 &&
    css`
      background-color: #ff5b22;
    `}
`;
