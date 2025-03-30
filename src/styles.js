import styled from "styled-components";

export const Container = styled.div`
  background: #0b1320;
`;

export const LogoImg = styled.div`
  position: fixed;
  z-index: 2147483003;
  padding: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 !important;
  border: none;
  bottom: 20px;
  right: 20px;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #0071b2;
  cursor: pointer;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.06), 0 2px 32px 0 rgba(0, 0, 0, 0.16);
  transition: transform 167ms cubic-bezier(0.33, 0, 0, 1);
  box-sizing: content-box;
`;

export const LogoNestedImg = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
`;
