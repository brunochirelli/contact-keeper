import React, { useContext, useState, useEffect } from "react";
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
  useMediaQuery,
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
  /* width: 180px;

  @media screen and (min-width: 600px) {
    width: 400px;
  } */
`;

const ContactItem = ({
  contact,
  contact: { name, email, phone, type, _id, initial },
  handleChange,
  expanded,
  contactInitials,
  ...others
}) => {
  const [itemWidth, setItemWidth] = useState("100%");
  const [windowWidth, setWindowWidth] = useState(null);

  const theme = useTheme();

  const { deleteContact, setCurrent, clearCurrent } = useContext(
    ContactContext
  );

  const handleDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  useEffect(() => {
    // item width minus rest of elements
    // to noWrap works we need a fixed width value
    setItemWidth(document.querySelector(".summary").offsetWidth - 100);

    // check when window resizes to upgrade the item width
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });

    return window.removeEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, [windowWidth]);

  return (
    <>
      <Accordion
        expanded={expanded === _id}
        onChange={handleChange(_id)}
        {...others}
      >
        <SummaryStyled
          expandIcon={<ExpandMore />}
          className="summary"
          aria-controls={`panel${_id}bh-content`}
          id={`panel${_id}bh-header`}
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
          <Box style={{ width: itemWidth }}>
            <Typography variant="body1" noWrap>
              {name}
            </Typography>
            {email && expanded !== _id ? (
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
