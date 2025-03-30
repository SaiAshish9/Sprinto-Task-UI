import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100vw;
  position: relative;

  ${({ whiteBg }) =>
    whiteBg == 1 &&
    css`
      background-color: #fff;
      box-shadow: 0 2px 4px -1px rgba(57, 76, 96, 0.15);
    `}
`;

export const TopContainer = styled.div`
  background-color: #336aea;
  border-bottom: 2px solid #fff;
  padding: 9px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Title = styled.div`
  font-size: 18px;
  color: #fff;
  display: flex;
  align-items: center;

  ${({ left }) =>
    left == 1 &&
    css`
      margin-right: 4rem;
    `}
`;

export const Span = styled.span`
  margin-right: 0.3rem;
`;

export const Content = styled.div``;

export const NavContainer = styled.div`
  padding: 0px 16px;
  height: 81px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 8.5rem;
`;

export const LogoImg = styled.img`
  width: 160px;
  margin-right: 34px;
  cursor: pointer;
`;

export const NavItem = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  padding: 0px 24px;

  &:hover {
    color: #ff5b22;
  }

  ${({ dark }) =>
    dark == 1 &&
    css`
      color: #000;
    `}
`;

export const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const NavIconCont = styled.div`
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 5px;
  justify-content: center;

  &:hover {
    background: #ff5b22;
  }
`;

export const NavIconImg = styled.img``;

export const NavItemCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PolicyBtn = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 6px 6px 6px 6px;
  color: #ffffff;
  background: #ff5b22;
  border: 2px none transparent;
  box-shadow: 0px 0px 0px -7px rgba(0, 0, 0, 0);
`;

export const DemoBtn = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  line-height: 1.5;
  margin-right: 36px;
  border-radius: 6px 6px 6px 6px;
  padding: 12px 24px;
  color: #ffffff;
  background: #ff5b22;
  border: 2px none transparent;
  box-shadow: 0px 0px 0px -7px rgba(0, 0, 0, 0);

  &:hover {
    box-shadow: 0px 15px 25px -7px rgba(0, 0, 0, 0);
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const IconCont = styled.div`
  position: absolute;
  right: 0.5rem;
`;
