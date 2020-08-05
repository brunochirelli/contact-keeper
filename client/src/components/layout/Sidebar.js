import React, { useContext } from "react";
import styled from "styled-components";
import User from "../user/User";
import ContactFilter from "../contacts/ContactFilter";
import { Box, useTheme, Typography, Button } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import AuthContext from "../../context/auth/AuthContext";
import ContactContext from "../../context/contact/ContactContext";

const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 30vh;
  background: radial-gradient(100% 225% at 100% 0%, #ff0000 0%, #000000 100%),
    linear-gradient(236deg, #00c2ff 0%, #000000 100%),
    linear-gradient(
      135deg,
      #cdffeb 0%,
      #cdffeb 36%,
      #009f9d 36%,
      #009f9d 60%,
      #07456f 60%,
      #07456f 67%,
      #0f0a3c 67%,
      #0f0a3c 100%
    );
  padding: 1rem;
  background-blend-mode: overlay, hard-light, normal;

  @media (orientation: landscape) {
    height: 60vh;
  }

  @media screen and (min-width: 960px) {
    height: 100vh;
    align-items: flex-start;
    background: radial-gradient(100% 225% at 100% 0%, #ff0000 0%, #000000 100%),
      linear-gradient(45deg, #00c2ff 0%, #000000 100%),
      linear-gradient(
        135deg,
        #cdffeb 0%,
        #cdffeb 36%,
        #009f9d 36%,
        #009f9d 60%,
        #07456f 60%,
        #07456f 67%,
        #0f0a3c 67%,
        #0f0a3c 100%
      );
    padding: 2rem;

    /* justify-content: space-between; */
  }
`;

const Sidebar = ({ history }) => {
  const theme = useTheme();

  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  const contactContext = useContext(ContactContext);
  const { clearContacts } = contactContext;

  const handleLogout = () => {
    logout();
    clearContacts();
  };

  return (
    <SidebarStyled theme={theme}>
      <Button
        size="small"
        endIcon={<ExitToApp />}
        color="inherit"
        style={{ margin: "0 0 2rem auto", color: "rgb(255 255 255 / 80%)" }}
        onClick={handleLogout}
      >
        Logout
      </Button>
      <Box width="100%">
        <User />
        <ContactFilter />
      </Box>
    </SidebarStyled>
  );
};

export default Sidebar;
