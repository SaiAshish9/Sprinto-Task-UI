import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { SlLogout } from "react-icons/sl";

import {
  BtnContainer,
  Container,
  DemoBtn,
  IconCont,
  LogoImg,
  LogoutCont,
  NavContainer,
  NavIconCont,
  NavIconImg,
  NavItem,
  NavItemCont,
  ProfileAvatar,
  Span,
  Title,
  TopContainer,
} from "./styles";
import { useStore } from "store";

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
  const [hovered, setHovered] = useState(false);

  const {
    state: { user },
    actions: { updateUser },
  } = useStore();

  return (
    <Container whiteBg={pathname !== "/" ? 1 : 0}>
      {pathname !== "/policies" && (
        <TopContainer>
          <Title left={1}>SOC2 Compliance Blueprint is Live!</Title>
          <Title>
            <Span>Try Now</Span> <FiArrowRight />
          </Title>
          <IconCont>
            <RiCloseLine color="#fff" size={21} />
          </IconCont>
        </TopContainer>
      )}

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

        {pathname !== "/policies" && (
          <NavItemCont>
            {NavItems.map((item, key) => (
              <NavItem dark={pathname !== "/" ? 1 : 0} key={key}>
                {item}
              </NavItem>
            ))}
          </NavItemCont>
        )}

        <BtnContainer>
          <DemoBtn
            onClick={() => {
              navigate("/policies");
            }}
          >
            Get Policies
          </DemoBtn>
          {!user && (
            <NavIconCont
              onMouseEnter={() => {
                setHovered(true);
              }}
              onMouseLeave={() => {
                setHovered(false);
              }}
              onClick={() => {
                navigate("/auth");
              }}
            >
              <NavIconImg
                alt="img"
                src={
                  pathname === "/auth" && !hovered
                    ? "https://sprinto.com/wp-content/uploads/2025/02/user-icon-dark.svg"
                    : "https://sprinto.com/wp-content/uploads/2025/02/user-icon.svg"
                }
              />
            </NavIconCont>
          )}
          {user && (
            <LogoutCont>
              <ProfileAvatar
                onClick={() => {
                  navigate("/auth");
                }}
                alt="img"
                src={user.profilePicUrl}
              />
              <SlLogout
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/");
                  updateUser(null);
                }}
                size={18}
                color={pathname === "/" ? "#fff" : "#000"}
              />
            </LogoutCont>
          )}
        </BtnContainer>
      </NavContainer>
    </Container>
  );
};

export default Header;
