import React, { use, useEffect } from "react";
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
import { notification } from "antd";

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
      role: user.role,
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

  async function onEmployeeActionChange(policyId, role, url) {
    try {
      const policyResponse = await API.post(url, {
        userId: user.id,
        policyId,
        role,
      });

      if (policyResponse.data.statusCode === 500) {
        notification.open({ message: policyResponse.data.message });
        return;
      }

      const data = policyResponse.data.map((policy, index) => ({
        ...policy,
        sno: index + 1,
      }));
      updatePolicies(data);
    } catch (e) {
      alert(e.message);
    }
  }
  
  let columns = [
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

  if (!["ADMIN", "CUSTOMER"].includes(user?.role)) {
    columns.push({
      title: "Actions",
      key: "acknowledged",
      render: (_, record) => (
        <AcknowledgeCont>
          <StyledCheckbox
            onChange={() => onEmployeeActionChange(record.id, user.role, "acknowledge_policy")}
            checked={record.acknowledged}
          />
          <AcknowledgementText>
            I agree to abide by the policies
          </AcknowledgementText>
        </AcknowledgeCont>
      ),
    });
  }

  if (["ADMIN"].includes(user?.role)) {
    columns.push({
      title: "Grant Approval",
      key: "approved",
      render: (_, record) => (
        <AcknowledgeCont>
          <StyledCheckbox
            onChange={() => onEmployeeActionChange(record.id, user.role, "approve_policy")}
            checked={record.approved}
          />
          <AcknowledgementText>
            {record.approved ? "Approved" : "Approve"}
          </AcknowledgementText>
        </AcknowledgeCont>
      ),
    });
  }

  if (["ADMIN"].includes(user?.role)) {
    columns.push({
      title: "HR Approval",
      key: "requiresHRAcknowledgement",
      render: (_, record) => (
        <AcknowledgeCont>
          <StyledCheckbox
            onChange={() => onEmployeeActionChange(record.id, user.role, "requires_hr_acknowledgement")}
            checked={record.requiresHRAcknowledgement}
          />
          <AcknowledgementText>
            {record.requiresHRAcknowledgement ? "Required" : "Not Required"}
          </AcknowledgementText>
        </AcknowledgeCont>
      ),
    });
  }

  if (!["ADMIN", "CUSTOMER"].includes(user?.role)) {
    columns.push({
      title: "Status",
      key: "status",
      render: () => <StatusText>Approved by CTO (Admin)</StatusText>,
    });
  }

  if (!user) {
    return null;
  }

  return (
    <Container>
      <ContainerTitle>Hello, {user.name}</ContainerTitle>
      {user?.role && (
        <>
          {user.role === "ADMIN" ? (
            <ContainerTitle sm={1} highlight={1}>
              Please, <ContainerSpan>Approve</ContainerSpan> The Policies
            </ContainerTitle>
          ) : (
            <ContainerTitle sm={1} highlight={1}>
              Please, <ContainerSpan>Acknowledge</ContainerSpan> The Approved
              Policies (Max:{" "}
              <ContainerSpan>{user.role === "HR" ? 3 : 15}</ContainerSpan>)
            </ContainerTitle>
          )}
        </>
      )}

      <StyledTable dataSource={policies} columns={columns} pagination={false} />
    </Container>
  );
};

export default PolicyScreen;
