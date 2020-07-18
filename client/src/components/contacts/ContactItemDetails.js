import React from "react";
import {
  AccordionDetails,
  Typography,
  Chip,
  Grid,
  Box,
} from "@material-ui/core";

const ContactItemDetails = ({ contact, setCurrent }) => {
  return (
    <div>
      <AccordionDetails>
        <Grid container>
          <Box>
            <Chip
              label={
                contact.type.charAt(0).toUpperCase() + contact.type.slice(1)
              }
              color={contact.type === "personal" ? "primary" : "secondary"}
              size="small"
              style={{ marginBottom: "1rem" }}
            />
          </Box>
          {contact.email ? (
            <Grid container item alignItems="baseline">
              <Grid item xs={2}>
                <Typography variant="body2">Email:</Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography style={{ wordBreak: "break-all" }}>
                  {contact.email}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Chip label="Add email" onClick={() => setCurrent(contact)} />
          )}
          {contact.phone ? (
            <Grid container alignItems="baseline">
              <Grid item xs={2}>
                <Typography variant="body2">Phone:</Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>{contact.phone}</Typography>
              </Grid>
            </Grid>
          ) : (
            <Chip label="Add phone" onClick={() => setCurrent(contact)} />
          )}
        </Grid>
      </AccordionDetails>
    </div>
  );
};

export default ContactItemDetails;
