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
  }

  useEffect(() => {
    getUsers();
  }, []);

  const colors = ["#b6e8ff", "#ffe4ae", "#b7ffd1", "#fdedf4", "#e3e3e3"];

  return (
    <Container>
      <ContentTitle>
        Please
        <ContentSpan> Authenticate </ContentSpan>
        As
      </ContentTitle>

      <ImgContRow>
        {users?.map((user, _) => (
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
              navigate("/policies");
            }}
          >
            <DeveloperImg src={user.profilePicUrl} alt="" />
            <Tag selected={selected === user.id ? 1 : 0} color={colors[0]}>
              {user.name}
            </Tag>
          </ImgCont>
        ))}
      </ImgContRow>
    </Container>
  );
};

export default AuthScreen;
