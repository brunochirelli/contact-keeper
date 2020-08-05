import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  useTheme,
} from "@material-ui/core";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const SignPanelStyled = styled.div`
  max-width: 400px;
  margin: 0 auto;

  .MuiTab-wrapper {
    align-items: flex-start;
  }

  .MuiTab-root {
    padding: 0.5rem 0;
  }
`;

export default function SignPanel({ history }) {
  // Hooks
  const theme = useTheme();

  // State
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <SignPanelStyled>
      <Typography variant="h4" component="h1" paragraph>
        {value ? "Sign up" : "Welcome"}
      </Typography>
      <AppBar position="static" color="inherit" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Register" {...a11yProps(1)} />
        </Tabs>
        <span
          style={{
            display: "block",
            width: "100%",
            marginTop: "-2px",
            borderBottom: "2px solid #E0E7FF",
          }}
        />
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <SignIn />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <SignUp history={history} />
        </TabPanel>
      </SwipeableViews>
    </SignPanelStyled>
  );
}
