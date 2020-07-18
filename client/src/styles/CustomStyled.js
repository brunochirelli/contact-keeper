import React from "react";
import styled from "styled-components";
import { Button, useTheme } from "@material-ui/core";

// Submit Button
const SubmitButtonStyled = styled(Button)`
  display: block;
  margin: 1rem 0;
  color: white;
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.palette.primary.main}, black)`};
`;

export const SubmitButton = ({ children, ...others }) => {
  const theme = useTheme();
  return (
    <SubmitButtonStyled variant="contained" fullWidth {...others} theme={theme}>
      {children}
    </SubmitButtonStyled>
  );
};
