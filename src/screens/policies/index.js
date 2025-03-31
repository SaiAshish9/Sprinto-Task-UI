import React, { useEffect } from "react";
import { Container, ContainerSpan, ContainerTitle } from "./styles";
import { useStore } from "store";
import API from "utils/api";
import { Table } from "antd";

const columns = [
  {
    title: "S.No.",
    dataIndex: "sno",
    key: "sno",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
];

const PolicyScreen = () => {
  const {
    state: { user, policies },
    actions: { updatePolicies },
  } = useStore();

  async function getPolicies() {
    const policyResponse = await API("policies");
    const data = policyResponse.data.map((policy, index) => ({
      ...policy,
      sno: index + 1,
    }));
    await updatePolicies(data);
    localStorage.setItem("policies", JSON.stringify(data));
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
      <ContainerTitle sm={1} highlight={1}>
        Please, <ContainerSpan>Acknowledge</ContainerSpan> The Approved Policies
      </ContainerTitle>
      <Table dataSource={policies} columns={columns} pagination={false} />
    </Container>
  );
};

export default PolicyScreen;
