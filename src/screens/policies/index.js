import React, { useEffect, useState } from "react";
import {
  AcknowledgeCont,
  AcknowledgementText,
  Container,
  ContainerSpan,
  ContainerTitle,
  ContainerSubTitle,
  CustomerTemplateContainer,
  ModifiedPoliciesCont,
  ModifiedPoliciesText,
  StatusText,
  StyledCheckbox,
  StyledTable,
} from "./styles";
import { useStore } from "store";
import API from "utils/api";
import { notification } from "antd";
import moment from "moment";
import { useNavigate, useSearchParams } from "react-router-dom";

const PolicyScreen = () => {
  const {
    state: { user, policies },
    actions: { updatePolicies },
  } = useStore();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const query = searchParams.get("customerId");

  const [modifiedSelected, setModifiedSelected] = useState(false);

  useEffect(() => {
    if (user) {
      getPolicies(null);
    }
    return () => {
      clearPolicies();
    };
  }, [user]);

  async function getPolicies(payload) {
    const policyResponse = await API.post("user_policies", {
      userId: user.id,
      role: user.role,
      ...(payload?.modified !== undefined
        ? { modified: payload.modified }
        : {}),
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

  async function onEmployeeActionChange(
    policyId,
    role,
    url,
    customerId = null,
    version = null
  ) {
    try {
      const policyResponse = await API.post(url, {
        userId: user.id,
        policyId,
        ...(role !== undefined ? { role } : {}),
        ...(customerId !== undefined ? { customerId } : {}),
        ...(version !== undefined ? { version } : {}),
      });

      if (policyResponse.data.statusCode === 500) {
        notification.open({ message: policyResponse.data.message });
        return;
      }

      if (Array.isArray(policyResponse.data)) {
        const data = policyResponse.data.map((policy, index) => ({
          ...policy,
          sno: index + 1,
        }));
        updatePolicies(data);
      } else {
        getPolicies(null);
      }
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
    {
      title: "Version",
      key: "version",
      render: (_, record) => (
        <AcknowledgeCont>
          <AcknowledgementText>
            {record.version.toFixed(1)}
            {" ("}
            {(record.version === 1 ? "New Joining" : "Periodic") + ")"}
          </AcknowledgementText>
        </AcknowledgeCont>
      ),
    },
  ];

  if (!["ADMIN", "CUSTOMER", "CXO"].includes(user?.role)) {
    columns.push({
      title: "Actions",
      key: "acknowledged",
      render: (_, record) => (
        <AcknowledgeCont>
          <StyledCheckbox
            onChange={() =>
              onEmployeeActionChange(
                record.id,
                user.role,
                "acknowledge_policy",
                searchParams.get("customerId"),
                record.version
              )
            }
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
            onChange={() =>
              onEmployeeActionChange(record.id, user.role, "approve_policy")
            }
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
            onChange={() =>
              onEmployeeActionChange(
                record.id,
                user.role,
                "requires_hr_acknowledgement"
              )
            }
            checked={record.requiresHRAcknowledgement}
          />
          <AcknowledgementText>
            {record.requiresHRAcknowledgement ? "Required" : "Not Required"}
          </AcknowledgementText>
        </AcknowledgeCont>
      ),
    });
  }

  if (["ADMIN", "CXO"].includes(user?.role)) {
    columns.push({
      title: "Acknowledged By All Employees",
      key: "acknowledgedByAll",
      render: (_, record) => (
        <AcknowledgeCont>
          <AcknowledgementText ack={record.acknowledgedByAll ? 1 : 0}>
            {record.acknowledgedByAll ? "Yes" : "No"}
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

  if (["CXO"].includes(user?.role)) {
    columns.push({
      title: "Last Modified",
      key: "updatedAt",
      render: (_, record) => (
        <AcknowledgementText>
          {moment(record.updatedAt).fromNow()}
        </AcknowledgementText>
      ),
    });
  }

  if (["CUSTOMER"].includes(user?.role)) {
    columns.push({
      title: "Select Template",
      key: "selectedByCustomer",
      render: (_, record) => (
        <AcknowledgeCont
          onClick={async () => {
            if (!record.selectedByCustomer) {
              onEmployeeActionChange(record.id, null, "customerTemplate");
            }
          }}
        >
          <AcknowledgementText ack={record.selectedByCustomer ? 1 : 0}>
            {!record.selectedByCustomer ? "Select Template" : "Selected"}
          </AcknowledgementText>
        </AcknowledgeCont>
      ),
    });
  }

  if (["CUSTOMER"].includes(user?.role)) {
    columns.push({
      title: "Metadata",
      key: "metadata",
      render: (_, record) => (
        <AcknowledgeCont>
          <AcknowledgementText>
            {JSON.stringify(record.metadata ?? {})}
          </AcknowledgementText>
        </AcknowledgeCont>
      ),
    });
  }

  if (["CUSTOMER"].includes(user?.role)) {
    columns.push({
      title: "Software Upgrade",
      key: "upgradeRequired",
      render: (_, record) => (
        <AcknowledgeCont>
          <AcknowledgementText ack={record.upgradeRequired ? 0 : 1}>
            {record.upgradeRequired ? "Upgrade Now" : "Latest"}
          </AcknowledgementText>
        </AcknowledgeCont>
      ),
    });
  }

  if (!user) {
    return null;
  }

  async function createTemplate() {
    const policyResponse = await API.post("policies", {
      policies: [
        {
          type: "INFOSEC",
          acknowledged: true,
          createdByCustomer: true,
          approved: true,
          name: "Vulnerability Management Policy (Manual)",
          version: 1,
          metadata: {
            SLA: true,
          },
          createdAt: new Date().toISOString,
          updatedAt: new Date().toISOString,
        },
      ],
    });
    onEmployeeActionChange(
      policyResponse.data?.[0]?.id,
      null,
      "customerTemplate"
    );
    await getPolicies(null);
  }

  return (
    <Container>
      <CustomerTemplateContainer>
        <ContainerTitle>Hello, {user.name}</ContainerTitle>
        {user?.role === "CUSTOMER" && (
          <div>
            <ContainerSubTitle
              onClick={() => {
                createTemplate();
              }}
            >
              Create Template
            </ContainerSubTitle>
            <ContainerSubTitle
              onClick={() => {
                navigate("/auth?mimic=true");
              }}
            >
              Acknowledge Employee Policies
            </ContainerSubTitle>
          </div>
        )}
      </CustomerTemplateContainer>

      {user?.role && (
        <>
          {user.role === "ADMIN" ? (
            <ContainerTitle sm={1} highlight={1}>
              Please, <ContainerSpan>Approve</ContainerSpan> The Policies
            </ContainerTitle>
          ) : (
            ["ENGINEER", "HR"].includes(user.role) && (
              <ContainerTitle sm={1} highlight={1}>
                Please, <ContainerSpan>Acknowledge</ContainerSpan> The Approved
                Policies (Max:{" "}
                <ContainerSpan>{user.role === "HR" ? 3 : 15}</ContainerSpan>)
              </ContainerTitle>
            )
          )}
          {["ENGINEER", "HR"].includes(user.role) && (
            <ModifiedPoliciesText>
              <StyledCheckbox
                onChange={async () => {
                  await getPolicies({ modified: !modifiedSelected });
                  setModifiedSelected((c) => !c);
                }}
                checked={modifiedSelected}
              />
              <ModifiedPoliciesCont>
                <ContainerTitle noM={1} sm={1} highlight={1}>
                  {" "}
                  Show Only The <ContainerSpan>Modified Policies</ContainerSpan>
                </ContainerTitle>
              </ModifiedPoliciesCont>
            </ModifiedPoliciesText>
          )}
        </>
      )}

      {user && policies?.length > 0 && (
        <StyledTable
          dataSource={policies}
          columns={columns}
          pagination={false}
        />
      )}
    </Container>
  );
};

export default PolicyScreen;
