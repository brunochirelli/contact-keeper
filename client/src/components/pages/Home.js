import React from "react";
import Contacts from "../contacts/Contacts";
import User from "../user/User";
import { Container } from "@material-ui/core";

const Home = () => {
  return (
    <Container maxWidth="md" style={{ margin: "2rem auto" }}>
      <User />
      <Contacts />
    </Container>
  );
};

export default Home;
