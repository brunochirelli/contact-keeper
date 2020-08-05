import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../context/auth/AuthContext";

const PrivateRoute = ({ component: Component, ...others }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  return (
    <>
      <Route
        {...others}
        render={(props) =>
          !isAuthenticated && !loading ? (
            <Redirect to="/welcome" />
          ) : (
            <Component {...props} />
          )
        }
      />
    </>
  );
};

export default PrivateRoute;
