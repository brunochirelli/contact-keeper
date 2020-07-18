import React, { useState, useContext } from "react";
import styled from "styled-components";

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
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  // Hooks
  const theme = useTheme();

  // State
  const [showPassword, setShowPassword] = useState(false);

  // Form
  const form = useForm();
  const onSubmit = (data) => {
    console.log("logado com sucesso...", data);
    setAlert("Logado com sucesso", "primary");
  };

  // Handles
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormStyled onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <Controller
          name="email"
          type="email"
          control={form.control}
          defaultValue=""
          rules={{
            required: "Invalid e-mail or password",
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
          error={!!form.errors.pass || !!form.errors.email}
          helperText={form.errors.email && form.errors.email.message}
          variant="outlined"
          fullWidth
        />
      </div>
      <div>
        <Controller
          name="pass"
          type={showPassword ? "text" : "password"}
          control={form.control}
          defaultValue=""
          rules={{
            required: "Invalid e-mail or password",
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
                    color: form.errors.pass ? theme.palette.error.main : "gray",
                  }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="Password"
          error={!!form.errors.pass || !!form.errors.email}
          helperText={form.errors.pass && form.errors.pass.message}
          variant="outlined"
          fullWidth
        />
      </div>
      <div>
        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
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
