import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  IconButton,
  InputAdornment,
  useTheme,
  Link,
  Typography,
  Box,
} from "@material-ui/core";
import { Visibility, VisibilityOff, Error } from "@material-ui/icons";

import { SubmitButton } from "../../styles/CustomStyled";

import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/alertContext";
import Alert from "../layout/Alert";

const FormStyled = styled.form`
  margin: 1.5rem 0;

  .MuiOutlinedInput-input {
    padding: 12px 14px;
  }

  .MuiFormControl-root {
    margin-bottom: 1.5rem;
  }

  .MuiOutlinedInput-notchedOutline {
    background: rgba(224, 231, 255, 0.2);
    border-color: rgba(224, 231, 255);
  }
`;

const SignIn = () => {
  // Context
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  // Hooks
  const history = useHistory();
  const theme = useTheme();

  // State
  const [showPassword, setShowPassword] = useState(false);

  // Form
  const form = useForm();
  const onSubmit = (data) => {
    if (!error) {
      const { email, password } = data;
      login({ email, password });
    }
  };

  // Handles
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Effect
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error) {
      // setAlert(error, "error");

      form.setError("email", {
        type: "manual",
        message: "Invalid e-mail or password",
      });
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  return (
    <FormStyled onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <Controller
          name="email"
          type="email"
          control={form.control}
          defaultValue=""
          rules={{
            required: true,
          }}
          as={TextField}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: form.errors.email ? (
              <InputAdornment position="end">
                <Error
                  style={{
                    color: theme.palette.error.main,
                  }}
                />
              </InputAdornment>
            ) : null,
          }}
          label="Email"
          error={!!form.errors.email}
          variant="outlined"
          fullWidth
        />
      </div>
      <div>
        <Controller
          name="password"
          type={showPassword ? "text" : "password"}
          control={form.control}
          defaultValue=""
          rules={{
            required: true,
          }}
          as={TextField}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  // tabIndex="-1"
                  style={{
                    color: form.errors.email
                      ? theme.palette.error.main
                      : "gray",
                  }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="Password"
          error={!!form.errors.email}
          variant="outlined"
          fullWidth
        />
      </div>
      <div>
        {form.errors.email ? (
          <Typography
            variant="body2"
            align="center"
            style={{ color: theme.palette.error.main }}
          >
            {form.errors.email.message}
          </Typography>
        ) : null}
        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onFocus={() => setShowPassword(false)}
        >
          Sign in
        </SubmitButton>
      </div>
      <Box marginY={1.5}>
        <Typography align="center" variant="body2">
          Forget your password? <Link to="/">Reset</Link>
        </Typography>
      </Box>
    </FormStyled>
  );
};

export default SignIn;
