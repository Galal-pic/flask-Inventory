import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");
  const apiUrl = "http://localhost:3001/users";

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setEmailError("");

    if (!email) {
      setEmailError("Email is required");
      return;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }

    const dataToSend = {
      email: email,
      password: password,
    };
    navigate("/home");
    // fetch(apiUrl, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(dataToSend),
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     } else {
    //       throw new Error("Network response was not ok");
    //     }
    //   })
    //   .then((data) => {
    //     navigate("/home");
    //     login(data.access_token);
    //   })
    //   .catch((error) => {
    //     setFormError(error.message);
    //     console.error("Error:", error);
    //   });
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className={styles.container}>
      <div className={styles.boxText}>
        <h1 className={styles.title}>Welcome to CUBII</h1>
        <p className={styles.text}>
          Please enter your email address and password to access your account.
        </p>
      </div>

      <Box
        sx={{
          width: { xs: "95%", sm: "70%", md: "50%", lg: "40%", xl: "35%" },
        }}
        className={styles.boxForm}
      >
        <Paper className={styles.paper}>
          <h2 className={styles.subTitle}>Login</h2>
          <Box
            component="form"
            onSubmit={handleSubmit}
            className={styles.textFields}
          >
            {/* Email Field */}
            <TextField
              label="Email Address"
              variant="outlined"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.textField}
              error={!!emailError}
              helperText={emailError}
            />
            {/* Password Field */}
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.textField}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        className={styles.iconVisibility}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            {formError && (
              <p style={{ color: "red", textAlign: "center" }}>
                Please, Try again
              </p>
            )}
            {/* Submit Button */}
            <Button type="submit" variant="contained" className={styles.btn}>
              Sign In
            </Button>
            {/* Register Button */}
            <Button
              type="button"
              variant="contained"
              className={styles.btn}
              onClick={handleRegister}
            >
              Register
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default Login;
