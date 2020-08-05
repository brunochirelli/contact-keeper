import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import SignPanel from "./SignPanel";
import loginImage from "../../images/login.svg";

import { Container, Paper, Grid, useTheme } from "@material-ui/core";

import AuthContext from "../../context/auth/AuthContext";

const WrapperStyled = styled.div`
  min-height: calc(100vh);
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
  background-blend-mode: overlay, hard-light, normal;

  &&&.menu-color {
    color: white !important;
  }

  /* @media screen and (min-width: 960px) {
  position: relative;
  margin-top: -48px;
  } */
`;

const CardImageStyled = styled.div`
  height: 30vh;
  /* margin: 1rem; */
  background: ${({ image, theme }) =>
    `center top / 75% no-repeat url(${image}), ${theme.palette.primary.main}21`};
  background-position-y: 1rem;

  @media screen and (min-width: 960px) {
    height: 100%;
    background: ${({ image, theme }) =>
      `center center / 75% no-repeat url(${image}), ${theme.palette.primary.main}21`};
  }
`;

const PaperStyled = styled(Paper)`
  position: relative;
  top: -7.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: auto 1rem;
  padding: 1.2rem;

  @media screen and (min-width: 960px) {
    top: 0;
    margin: 0;
  }
`;

const AlignStyled = styled.div`
  @media screen and (min-width: 960px) {
    display: flex;
    align-items: center;
    min-height: calc(100vh);
  }
`;

const BoxStyled = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;

  @media screen and (min-width: 960px) {
    border-radius: 1rem;
  }
`;

const Welcome = () => {
  const theme = useTheme();
  const history = useHistory();

  // Context
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loadUser } = authContext;

  // State
  const [checkAuth, setCheckAuth] = useState(true);

  useEffect(() => {
    if (localStorage.token) {
      history.push("/");
    }

    // loadUser();

    // setCheckAuth(false);

    // if (isAuthenticated) {
    //   history.push("/");
    // }
  }, [isAuthenticated]);

  return (
    <>
      <WrapperStyled id="welcome">
        <Container disableGutters>
          <AlignStyled>
            <BoxStyled>
              <Grid container style={{ minHeight: "70vh" }}>
                <Grid item xs={12} md={6}>
                  <CardImageStyled theme={theme} image={loginImage} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <PaperStyled elevation={0}>
                    <SignPanel />
                  </PaperStyled>
                </Grid>
              </Grid>
            </BoxStyled>
          </AlignStyled>
        </Container>
      </WrapperStyled>
    </>
  );
};

export default Welcome;
