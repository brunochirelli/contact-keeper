import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import Home from "./components/pages/Home";

import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import Register from "./components/auth/Register";

import { ThemeProvider } from "@material-ui/core";
import { theme } from "./styles/theme";

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <ThemeProvider theme={theme}>
          <AlertState>
            <Alert />
            <Layout>
              <Router>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                </Switch>
              </Router>
            </Layout>
          </AlertState>
        </ThemeProvider>
      </ContactState>
    </AuthState>
  );
};

export default App;
