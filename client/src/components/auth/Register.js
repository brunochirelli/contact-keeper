import React from "react";
import styled from "styled-components";
import SignPanel from "./SignPanel";
import loginImage from "../../images/login.svg";

import { Container, Paper, Grid, useTheme } from "@material-ui/core";

const WrapperStyled = styled.div`
  &&&.menu-color {
    color: white !important;
  }

  @media screen and (min-width: 960px) {
    position: relative;
    margin-top: -48px;
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
  }
`;

const CardImageStyled = styled.div`
  height: 30vh;
  background: ${({ image, theme }) =>
    `center top / 75% no-repeat url(${image}), ${theme.palette.primary.main}`};

  @media screen and (min-width: 960px) {
    height: 100%;
    background: ${({ image, theme }) =>
      `center center / 75% no-repeat url(${image}), ${theme.palette.primary.main}21`};
  }
`;

const PaperStyled = styled(Paper)`
  position: relative;
  top: -10vh;
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
    height: calc(100vh);
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

const Register = () => {
  const theme = useTheme();

  return (
    <WrapperStyled id="register">
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
  );
};

export default Register;
