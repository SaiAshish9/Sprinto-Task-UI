import React, { useEffect } from "react";
import { Container, ContainerTitle } from "./styles";
import { useStore } from "store";
import API from "utils/api";

const PolicyScreen = () => {
  const {
    actions: { updatePolicies },
  } = useStore();

  async function getPolicies() {
    const policyResponse = await API("policies");
    await updatePolicies(policyResponse.data);
  }

  useEffect(() => {
    getPolicies();
  }, []);

  return (
    <Container>
      <ContainerTitle>Hello, Engineer</ContainerTitle>
    </Container>
  );
};

export default PolicyScreen;
