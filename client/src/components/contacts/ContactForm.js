/**
 * TODO validate with https://github.com/react-hook-form/react-hook-form
 */

import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";

import {
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import { SubmitButton } from "../../styles/CustomStyled";

const ContactForm = ({ setExpanded }) => {
  const {
    addContact,
    current,
    clearCurrent,
    clearFilter,
    updateContact,
    filtered,
  } = useContext(ContactContext);

  // Object to hold the information to be stored
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;

  const handleChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const handleUpdate = (e) => {
    e.preventDefault();
    if (filtered && filtered.length > 0) clearFilter();
    updateContact(contact);
    clearCurrent();
  };

  const handleClear = (e) => {
    e.preventDefault();
    clearCurrent();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilter();
    addContact(contact);
    setContact({ name: "", email: "", phone: "", type: "personal" });
    clearCurrent();
    setExpanded(false);
  };

  useEffect(() => {
    if (current) setContact(current);
    else
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
  }, [current]);

  return (
    <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <Typography variant="h6">Add contact</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          label="Name"
          name="name"
          type="text"
          value={name}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          label="Phone"
          name="phone"
          type="text"
          value={phone}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <RadioGroup
          aria-label="contact type"
          name="type"
          value={type}
          onChange={handleChange}
        >
          <FormControlLabel
            value="personal"
            control={<Radio />}
            label="Personal"
            checked={type === "personal"}
          />
          <FormControlLabel
            value="professional"
            control={<Radio />}
            label="Professional"
            checked={type === "professional"}
          />
        </RadioGroup>
      </Grid>
      <Grid item xs={12}>
        {current ? (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleUpdate}
              type="submit"
            >
              Update Contact
            </Button>
            <Button
              variant="outlined"
              onClick={handleClear}
              style={{ marginLeft: "0.5rem" }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <SubmitButton
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            type="submit"
          >
            Add Contact
          </SubmitButton>
        )}
      </Grid>
    </Grid>
  );
};

export default ContactForm;
