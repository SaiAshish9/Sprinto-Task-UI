import React, { useEffect } from "react";
import { Container, ContainerTitle } from "./styles";
import { useStore } from "store";
import API from "utils/api";

const PolicyScreen = () => {
  const {
    state: { user },
    actions: { updatePolicies },
  } = useStore();

  async function getPolicies() {
    const policyResponse = await API("policies");
    await updatePolicies(policyResponse.data);
  }

  useEffect(() => {
    getPolicies();
  }, []);

  if (!user) {
    return <></>;
  }

  return (
    <Container>
      <ContainerTitle>Hello, {user?.name}</ContainerTitle>
    </Container>
  );
};

export default PolicyScreen;
