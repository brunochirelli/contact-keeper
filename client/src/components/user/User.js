import React from "react";
import { Typography, Avatar, Box } from "@material-ui/core";

const User = () => {
    return (
        <Box display="flex">
            <Avatar style={{ marginRight: "0.5rem" }}>B</Avatar>
            <Typography variant="h4" paragraph>
                Hello, Bruno
            </Typography>
        </Box>
    );
};

export default User;
