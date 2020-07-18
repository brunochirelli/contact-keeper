import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

const AppBarStyled = styled(AppBar)`
  position: relative;
  z-index: 10;
  background: ${({ theme }) => theme.palette.primary.main};

  &.menu-color {
    color: white;
  }

  @media screen and (min-width: 960px) {
    background: ${({ register, theme }) =>
      register
        ? "transparent"
        : `linear-gradient(90deg,${theme.palette.primary.main},black)`};
  }
`;

const Header = () => {
  const [isRegister, setIsRegister] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    setIsRegister(document.getElementById("register"));
  }, []);

  return (
    <AppBarStyled
      position="static"
      elevation={0}
      theme={theme}
      register={isRegister}
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
  );
};

Header.propTypes = {};
Header.defaultProps = {};

export default Header;
