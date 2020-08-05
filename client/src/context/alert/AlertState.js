import React, { useReducer } from "react";
import * as uuid from "uuid"; // to unique identify the alerts

import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = ({ children }) => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider value={{ alerts: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertState;
