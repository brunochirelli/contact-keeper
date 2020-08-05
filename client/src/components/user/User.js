import React, { useContext } from "react";
import { Typography, Avatar, Box, useTheme } from "@material-ui/core";

import AuthContext from "../../context/auth/AuthContext";

const User = () => {
  const theme = useTheme();

  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  return (
    <Box display="flex" color="white">
      <Typography variant="h4" paragraph>
        Hello {user && user.name.split(" ")[0]}
      </Typography>
    </Box>
  );
};

export default User;
