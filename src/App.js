import React from "react";
import { HomeScreen } from "./screens";
import { Route, Routes, useLocation } from "react-router-dom";
import AuthScreen from "screens/auth";
import { Header } from "components";
import styled, { css } from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #0b1320;

  ${({ whiteBg }) =>
    whiteBg == 1 &&
    css`
      background-color: #fff;
    `}
`;

const App = () => {
  const { pathname } = useLocation();

  return (
    <Container whiteBg={pathname === "/auth" ? 1 : 0}>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/auth" element={<AuthScreen />} />
      </Routes>{" "}
      {/* Just a quick workaround to save time */}
    </Container>
  );
};

export default App;
