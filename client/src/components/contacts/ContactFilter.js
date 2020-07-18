import React, { useContext, useRef, useEffect } from "react";
import styled from "styled-components";
import ContactContext from "../../context/contact/ContactContext";

import { Paper, InputBase, IconButton, useTheme } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const FilterStyled = styled(Paper)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.25rem 0.5rem;

  .input {
    flex: 1;
    margin-left: ${({ theme }) => theme.spacing(2)};
  }

  .icon-button {
    padding: 10px;
  }
`;

export default function ContactFilter() {
  const theme = useTheme();
  const { filterContacts, clearFilter, filtered } = useContext(ContactContext);

  const text = useRef("");

  const handleFilter = (e) => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  }, [text, filtered]);

  return (
    <FilterStyled theme={theme}>
      <InputBase
        type="text"
        className="input"
        placeholder="Search Contact"
        inputProps={{
          "aria-label": "search contact",
          ref: text,
          onChange: handleFilter,
        }}
      />
      <IconButton type="submit" className="icon-button" aria-label="search">
        <Search />
      </IconButton>
    </FilterStyled>
  );
}
