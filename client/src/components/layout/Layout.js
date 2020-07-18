import React from "react";
import { CssBaseline } from "@material-ui/core";

import Header from "./Header";
// import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Header />
      <main id="main">{children}</main>
      {/* <Footer /> */}
    </>
  );
};

Layout.propTypes = {};
Layout.defaultProps = {};

export default Layout;
