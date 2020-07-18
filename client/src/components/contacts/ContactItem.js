import React, { useContext } from "react";
import styled from "styled-components";
import ContactContext from "../../context/contact/ContactContext";

import {
  Typography,
  Accordion,
  AccordionSummary,
  Box,
  Avatar,
  useTheme,
  AccordionActions,
  Button,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import ContactItemDetails from "./ContactItemDetails";

const SummaryStyled = styled(AccordionSummary)`
  .MuiAccordionSummary-content {
    align-items: center;
  }

  &:hover {
    background: #f6f8fa;
  }
`;

const SubHeaderStyled = styled(Box)`
  width: 180px;

  @media screen and (min-width: 600px) {
    width: 400px;
  }
`;

const ContactItem = ({
  contact,
  contact: { name, email, phone, type, id, initial },
  handleChange,
  expanded,
  contactInitials,
  ...others
}) => {
  const { deleteContact, setCurrent, clearCurrent } = useContext(
    ContactContext
  );
  const theme = useTheme();

  const handleDelete = () => {
    deleteContact(id);
    clearCurrent();
  };

  return (
    <>
      <Accordion
        expanded={expanded === id}
        onChange={handleChange(id)}
        {...others}
      >
        <SummaryStyled
          expandIcon={<ExpandMore />}
          aria-controls={`panel${id}bh-content`}
          id={`panel${id}bh-header`}
        >
          <Box>
            <Avatar
              style={{
                background:
                  type === "personal"
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main,
                marginRight: "0.5rem",
                width: theme.spacing(4),
                height: theme.spacing(4),
              }}
            >
              {name.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
          <Box>
            <Typography variant="body1" noWrap>
              {name}
            </Typography>
            {email && expanded !== id ? (
              <SubHeaderStyled>
                <Typography variant="body2" noWrap style={{ color: "gray" }}>
                  {email}
                </Typography>
              </SubHeaderStyled>
            ) : null}
          </Box>
        </SummaryStyled>
        <ContactItemDetails
          phone={phone}
          name={name}
          type={type}
          email={email}
          setCurrent={setCurrent}
          contact={contact}
        />
        <AccordionActions>
          <Button onClick={() => setCurrent(contact)}>Edit</Button>
          <Button onClick={handleDelete}>Remove</Button>
        </AccordionActions>
      </Accordion>
    </>
  );
};

export default ContactItem;
