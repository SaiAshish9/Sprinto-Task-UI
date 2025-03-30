import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

import {
  BtnContainer,
  Container,
  DemoBtn,
  IconCont,
  LogoImg,
  NavContainer,
  NavIconCont,
  NavIconImg,
  NavItem,
  NavItemCont,
  Span,
  Title,
  TopContainer,
} from "./styles";

const Header = () => {
  const NavItems = [
    "Frameworks",
    "Platform",
    "Resources",
    "Integrations",
    "Company",
  ];

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Container whiteBg={pathname === "/auth" ? 1 : 0}>
      <TopContainer>
        <Title left={1}>SOC2 Compliance Blueprint is Live!</Title>
        <Title>
          <Span>Try Now</Span> <FiArrowRight />
        </Title>
        <IconCont>
          <RiCloseLine color="#fff" size={21} />
        </IconCont>
      </TopContainer>
      <NavContainer>
        <LogoImg
          onClick={() => {
            navigate("/");
          }}
          src={
            pathname === "/"
              ? "https://sprinto.com/wp-content/uploads/2025/02/sprinto-logo.svg"
              : "https://sprinto.com/wp-content/uploads/2025/02/sprinto-logo-dark.svg"
          }
          alt=""
        />

        <NavItemCont>
          {NavItems.map((item, key) => (
            <NavItem dark={pathname === "/auth" ? 1 : 0} key={key}>
              {item}
            </NavItem>
          ))}
        </NavItemCont>

        <BtnContainer>
          <DemoBtn>Get Policies</DemoBtn>
          <NavIconCont
            onClick={() => {
              navigate("/auth");
            }}
          >
            <NavIconImg
              alt="img"
              src={
                pathname === "/auth"
                  ? "https://sprinto.com/wp-content/uploads/2025/02/user-icon-dark.svg"
                  : "https://sprinto.com/wp-content/uploads/2025/02/user-icon.svg"
              }
            />
          </NavIconCont>
        </BtnContainer>
      </NavContainer>
    </Container>
  );
};

export default Header;
