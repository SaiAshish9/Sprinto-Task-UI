import React, { useState, useEffect } from "react";
import {
  Container,
  ContentSpan,
  ContentTitle,
  DeveloperImg,
  ImgCont,
  ImgContRow,
  Tag,
} from "./styles";
import API from "utils/api";
import { useStore } from "store";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const AuthScreen = () => {
  const [selected, setSelected] = useState(-1);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const query = searchParams.get("mimic");

  const {
    state: { users, user },
    actions: { updateUsers, updateUser },
  } = useStore();

  async function getUsers() {
    const usersResponse = await API(
      "users" +
        (user?.role === "CUSTOMER" && query === "true"
          ? "?mimic=true&&customerId=" + user.id
          : "")
    );
    await updateUsers(usersResponse.data);
  }

  useEffect(() => {
    getUsers();
  }, [user, searchParams]);

  const colors = [
    "#b6e8ff",
    "#ffe4ae",
    "#b7ffd1",
    "#fdedf4",
    "#e3e3e3",
    "#e3e9ff",
  ];

  return (
    <Container>
      <ContentTitle>
        {user?.role === "CUSTOMER" ? (
          <>
            Hello <ContentSpan> CUSTOMER</ContentSpan>, Please
            <ContentSpan> Authenticate </ContentSpan>
            As
          </>
        ) : (
          <>
            {" "}
            Please
            <ContentSpan> Authenticate </ContentSpan>
            As
          </>
        )}
      </ContentTitle>

      <ImgContRow>
        {users?.map((userItem, key) => (
          <ImgCont
            key={userItem.id}
            onMouseEnter={() => {
              setSelected(userItem.id);
            }}
            onMouseLeave={() => {
              setSelected(-1);
            }}
            onClick={() => {
              let prevUser = { ...user };
              updateUser(userItem);
              localStorage.setItem("user", JSON.stringify(userItem));
              navigate(
                "/policies" +
                  (query ? `?mimic=true&&customerId=${prevUser.id}` : "")
              );
            }}
          >
            <DeveloperImg src={userItem.profilePicUrl} alt="" />
            <Tag selected={selected === userItem.id ? 1 : 0} color={colors[+key]}>
              {userItem.name}
            </Tag>
          </ImgCont>
        ))}
      </ImgContRow>
    </Container>
  );
};

export default AuthScreen;
