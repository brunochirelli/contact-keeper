import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  Button,
  Link,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

const SkipButton = styled(Button)`
  position: absolute;
  top: 0;
  left: 45%;
  z-index: 11;
  transform: translateY(-110%);
  transition: transform ease 0.3s;

  &:focus {
    transform: translateY(0%);
  }
`;

const AppBarStyled = styled(AppBar)`
  position: relative;
  z-index: 10;
  /* background: ${({ theme }) => theme.palette.primary.main}; */
  background: transparent;

  &.menu-color {
    color: white;
  }

  /* @media screen and (min-width: 960px) {
    background: ${({ welcome, theme }) =>
      welcome
        ? "transparent"
        : `linear-gradient(90deg,${theme.palette.primary.main},black)`};
  } */
`;

const Header = () => {
  const [isRegister, setIsRegister] = useState(null);
  const theme = useTheme();

  return (
    <>
      <SkipButton
        href="#content"
        variant="contained"
        color="secondary"
        tabIndex={0}
      >
        Jump to content
      </SkipButton>

      <AppBarStyled
        position="fixed"
        elevation={0}
        theme={theme}
        // welcome={!!history.location.pathname}
        className="menu-color"
      >
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>

          <Typography variant="h6" color="inherit">
            Contactk
          </Typography>
        </Toolbar>
      </AppBarStyled>
    </>
  );
};

Header.propTypes = {};
Header.defaultProps = {};

export default Header;
