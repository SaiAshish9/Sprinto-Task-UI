import React, { useEffect, useState } from "react";
import {
  AcknowledgeCont,
  AcknowledgementText,
  Container,
  ContainerSpan,
  ContainerTitle,
  StatusText,
  StyledCheckbox,
  StyledTable,
} from "./styles";
import { useStore } from "store";
import API from "utils/api";

const PolicyScreen = () => {
  const {
    state: { user, policies },
    actions: { updatePolicies },
  } = useStore();

  useEffect(() => {
    if (user) {
      getPolicies();
    }
    return () => {
      clearPolicies();
    };
  }, [user]);

  async function getPolicies() {
    const policyResponse = await API.post("user_policies", {
      userId: user.id,
    });

    const data = policyResponse.data.map((policy, index) => ({
      ...policy,
      sno: index + 1,
    }));
    updatePolicies(data);
  }

  async function clearPolicies() {
    updatePolicies([]);
  }

  async function onChange(policyId) {
    const policyResponse = await API.post("acknowledge_policy", {
      userId: user.id,
      policyId,
    });

    const data = policyResponse.data.map((policy, index) => ({
      ...policy,
      sno: index + 1,
    }));
    updatePolicies(data);
  }

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
    {
      title: "Actions",
      key: "acknowledged",
      render: (_, record) => (
        <AcknowledgeCont>
          <StyledCheckbox
            onChange={() => onChange(record.id)}
            checked={record.acknowledged}
          />
          <AcknowledgementText>
            I agree to abide by the policies
          </AcknowledgementText>
        </AcknowledgeCont>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: () => <StatusText>Approved by CTO (Admin)</StatusText>,
    },
  ];

  if (!user) {
    return null;
  }

  return (
    <Container>
      <ContainerTitle>Hello, {user.name}</ContainerTitle>
      <ContainerTitle sm={1} highlight={1}>
        Please, <ContainerSpan>Acknowledge</ContainerSpan> The Approved Policies
        (Max: <ContainerSpan>15</ContainerSpan>)
      </ContainerTitle>
      <StyledTable dataSource={policies} columns={columns} pagination={false} />
    </Container>
  );
};

export default PolicyScreen;
