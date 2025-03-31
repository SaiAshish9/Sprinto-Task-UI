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

const AuthScreen = () => {
  const [selected, setSelected] = useState(-1);

  const navigate = useNavigate();

  const {
    state: { users },
    actions: { updateUsers, updateUser },
  } = useStore();

  async function getUsers() {
    const usersResponse = await API("users");
    await updateUsers(usersResponse.data);
    localStorage.setItem("users", JSON.stringify(usersResponse.data));
  }

  useEffect(() => {
    getUsers();
  }, []);

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
        Please
        <ContentSpan> Authenticate </ContentSpan>
        As
      </ContentTitle>

      <ImgContRow>
        {users?.map((user, key) => (
          <ImgCont
            key={user.id}
            onMouseEnter={() => {
              setSelected(user.id);
            }}
            onMouseLeave={() => {
              setSelected(-1);
            }}
            onClick={() => {
              updateUser(user);
              localStorage.setItem("user", JSON.stringify(user));
              navigate("/policies");
            }}
          >
            <DeveloperImg src={user.profilePicUrl} alt="" />
            <Tag selected={selected === user.id ? 1 : 0} color={colors[+key]}>
              {user.name}
            </Tag>
          </ImgCont>
        ))}
      </ImgContRow>
    </Container>
  );
};

export default AuthScreen;
