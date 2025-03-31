import styled, { css } from "styled-components";
import { Table } from "antd";
import { Checkbox } from "antd";

export const Container = styled.div`
  padding: 2rem 5rem;
`;

export const ContainerTitle = styled.p`
  font-size: 21px;
  font-weight: 500;
  ${({ highlight }) =>
    highlight === 1 &&
    css`
      color: #ff5b22;
    `}

  ${({ sm }) =>
    sm === 1 &&
    css`
      font-size: 15px;
      margin-bottom: 2rem;
      color: #000;
    `}
`;

export const ContainerSpan = styled.span`
  color: #ff5b22;
`;

export const StyledTable = styled(Table)`
  .ant-table-cell {
    background: #fff !important;
  }
`;

export const StatusText = styled.p`
  color: #00c352;
  font-weight: 500;
`;

export const AcknowledgeCont = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledCheckbox = styled(Checkbox)``;

export const AcknowledgementText = styled.div`
  margin-left: 0.5rem;
`;
