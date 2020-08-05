import React, { useContext } from "react";
import styled from "styled-components";

import AlertContext from "../../context/alert/alertContext";

import { Error } from "@material-ui/icons";
import { useTheme } from "@material-ui/core";

const AlertStyled = styled.div`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  margin: 0 auto;
  padding: 1rem 2.5rem;
  color: white;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 14, 1) 100%
  );
  border-top: 2px solid;
  border-image-slice: 1;

  &.alert-success {
    border-image-source: ${({ theme }) =>
      `linear-gradient(to right, ${theme.palette.success.light}, ${theme.palette.success.dark})`};
  }

  &.alert-info {
    border-image-source: ${({ theme }) =>
      `linear-gradient(to right, ${theme.palette.info.light}, ${theme.palette.info.dark})`};
  }
  &.alert-error {
    border-image-source: ${({ theme }) =>
      `linear-gradient(to right, ${theme.palette.error.light}, ${theme.palette.error.dark})`};
  }

  &.alert-warning {
    border-image-source: ${({ theme }) =>
      `linear-gradient(to right, ${theme.palette.warning.light}, ${theme.palette.warning.dark})`};
  }

  &.alert-primary {
    border-image-source: ${({ theme }) =>
      `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`};
  }

  &.alert-secondary {
    border-image-source: ${({ theme }) =>
      `linear-gradient(to right, ${theme.palette.secondary.light}, ${theme.palette.secondary.dark})`};
  }
`;

const Alert = () => {
  const theme = useTheme();
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <AlertStyled
        key={alert.id}
        className={`alert-${alert.type}`}
        theme={theme}
      >
        {alert.msg}
      </AlertStyled>
    ))
  );
};

export default Alert;
