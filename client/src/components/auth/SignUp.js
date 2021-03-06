import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  IconButton,
  InputAdornment,
  useTheme,
} from "@material-ui/core";
import { Visibility, VisibilityOff, Error } from "@material-ui/icons";

import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/alertContext";
import Alert from "../layout/Alert";

import { SubmitButton } from "../../styles/CustomStyled";

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

const SignUp = () => {
  const history = useHistory();

  // Context
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  // Custom Hooks
  const theme = useTheme();

  // State
  const [showPassword, setShowPassword] = useState(false);

  // Form
  const form = useForm();

  // Handles
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    const { name, email, password } = data;
    register({ name, email, password });
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
      setAlert(error, "error");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  return (
    <FormStyled onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <Controller
          name="name"
          type="text"
          control={form.control}
          defaultValue=""
          rules={{ required: "Name is required" }}
          as={TextField}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: form.errors.name ? (
              <InputAdornment position="end">
                <Error
                  style={{
                    color: theme.palette.error.main,
                  }}
                />
              </InputAdornment>
            ) : null,
          }}
          label="Name"
          error={!!form.errors.name}
          helperText={form.errors.name && form.errors.name.message}
          variant="outlined"
          fullWidth
        />
      </div>
      <div>
        <Controller
          name="email"
          type="email"
          control={form.control}
          defaultValue=""
          rules={{ required: "E-mail is required" }}
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
          helperText={form.errors.email && form.errors.email.message}
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
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Insert a password with least 6 characters",
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d)[A-Z\w\d]+/g,
              message: "At least one capitalized letter and one number",
            },
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
                  style={{
                    color: form.errors.password
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
          error={!!form.errors.password}
          helperText={form.errors.password && form.errors.password.message}
          variant="outlined"
          fullWidth
        />
      </div>

      <div>
        <Controller
          name="password2"
          type={showPassword ? "text" : "password"}
          control={form.control}
          defaultValue=""
          rules={{
            required: "Confirm the password",
            validate: (value) =>
              value === form.getValues("password") || "Password does not match",
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
                  style={{
                    color: form.errors.password2
                      ? theme.palette.error.main
                      : "gray",
                  }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="Confirm password"
          helperText={form.errors.password2 && form.errors.password2.message}
          error={!!form.errors.password2}
          variant="outlined"
          fullWidth
        />
      </div>

      <div>
        <SubmitButton type="submit" onFocus={() => setShowPassword(false)}>
          Sign up
        </SubmitButton>
      </div>
    </FormStyled>
  );
};

export default SignUp;
