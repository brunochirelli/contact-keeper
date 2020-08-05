import React, { useContext, useEffect } from "react";
import Contacts from "../contacts/Contacts";
import User from "../user/User";
import { Container, Grid, Box } from "@material-ui/core";

import AuthContext from "../../context/auth/AuthContext";
import { useHistory } from "react-router-dom";
import Sidebar from "../layout/Sidebar";

const Home = () => {
  const history = useHistory();

  const authContext = useContext(AuthContext);
  const { loadUser, isAuthenticated } = authContext;

  useEffect(() => {
    if (!localStorage.token) {
      history.push("/welcome");
    } else {
      loadUser();
    }

    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated ? (
        <Box>
          <Grid container>
            <Grid item xs={12} md={4} lg={2}>
              <Sidebar />
            </Grid>
            <Grid item xs={12} md={8} lg={9} style={{ padding: "1rem" }}>
              <Contacts />
            </Grid>
            {/* <User /> */}
            {/* <Contacts /> */}
          </Grid>
        </Box>
      ) : null}
    </>
  );
};

export default Home;
