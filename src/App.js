import React, { useEffect } from "react";
import { HomeScreen } from "./screens";
import { Route, Routes, useLocation } from "react-router-dom";
import AuthScreen from "screens/auth";
import { Header } from "components";
import styled, { css } from "styled-components";
import { LogoImg } from "styles";
import { LogoNestedImg } from "styles";
import PolicyScreen from "screens/policies";
import { useStore } from "store";

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

  const {
    actions: { updatePolicies, updateUser, updateUsers },
  } = useStore();

  async function populateRecords() {
    const user = localStorage.getItem("user");

    if (user) {
      await updateUser(JSON.parse(user));
    }
  }

  useEffect(() => {
    populateRecords();
  }, []);

  return (
    <Container whiteBg={pathname !== "/" ? 1 : 0}>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="/policies" element={<PolicyScreen />} />
      </Routes>{" "}
      {pathname === "/auth" && (
        <LogoImg>
          <LogoNestedImg
            alt=""
            src="https://downloads.intercomcdn.com/i/o/xp2v082x/584590/af2f80178dc1fb4110f34aed726a/60ddbbca9914c3e11746f6bb82c0091c.png"
          />
        </LogoImg>
      )}
      {/* Just a quick workaround to save time */}
    </Container>
  );
};

export default App;
