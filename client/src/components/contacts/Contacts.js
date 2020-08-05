/**
 *  TODO observer() to close the contact item when they leave the view
 *
 */

import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";
import ContactFilter from "./ContactFilter";
import ContactForm from "./ContactForm";
import { Grid } from "@material-ui/core";

const ListHeaderStyled = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  background: #e1e4e8;
`;

const Contacts = () => {
  let contactInitials = new Set();

  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts } = contactContext;

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  contacts
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((contact) => {
      contact.initial = contact.name.charAt(0).toUpperCase();
      contactInitials.add(contact.initial);
      return <></>;
    });

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <Grid item container spacing={2}>
      <Grid item xs={12} md={3}>
        <ContactForm setExpanded={setExpanded} />
      </Grid>
      <Grid item xs={12} md={4}>
        {/* {contacts.length >= 2 ? <ContactFilter /> : null} */}
        {filtered === null ? (
          <>
            {Array.from(contactInitials).map((e, i) => (
              <div style={{ position: "relative" }} key={e + i}>
                <ListHeaderStyled>{e}</ListHeaderStyled>
                {contacts.map((contact) =>
                  contact.initial === e ? (
                    <ContactItem
                      key={contact._id}
                      contact={contact}
                      handleChange={handleChange}
                      expanded={expanded}
                    />
                  ) : null
                )}
              </div>
            ))}
          </>
        ) : (
          <>
            {filtered.map((contact) => (
              <ContactItem
                key={contact._id}
                contact={contact}
                handleChange={handleChange}
                expanded={expanded}
              />
            ))}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default Contacts;
