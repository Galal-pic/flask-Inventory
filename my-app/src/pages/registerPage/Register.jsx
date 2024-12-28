import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Paper,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "./Register.module.css";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const apiUrl = "http://localhost:3001/users";

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,15}$/; // Validates phone numbers with 10-15 digits
    return phoneRegex.test(phone);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");

    if (!name) {
      setNameError("Name is required");
      return;
    }

    if (!email) {
      setEmailError("Email is required");
      return;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }

    if (!phone) {
      setPhoneError("Phone number is required");
      return;
    } else if (!validatePhone(phone)) {
      setPhoneError("Invalid phone number");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    const dataToSend = {
      name,
      email,
      phone,
      password,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        setOpenSnackbar(true);
      })
      .catch((error) => {
        setFormError("Registration failed. Please try again.");
        console.error("Error:", error);
      });
  };

  // Close Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className={styles.container}>
      <Box
        sx={{
          width: { xs: "95%", sm: "70%", md: "50%", lg: "40%", xl: "35%" },
        }}
        className={styles.boxForm}
      >
        <Paper className={styles.paper}>
          <h2 className={styles.subTitle}>Register</h2>
          <Box
            component="form"
            onSubmit={handleSubmit}
            className={styles.textFields}
          >
            {/* Name Field */}
            <TextField
              label="Name"
              variant="outlined"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.textField}
              error={!!nameError}
              helperText={nameError}
            />
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
            {/* Phone Field */}
            <TextField
              label="Phone Number"
              variant="outlined"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.textField}
              error={!!phoneError}
              helperText={phoneError}
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
              error={!!passwordError}
              helperText={passwordError}
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
            <TextField
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.textField}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
            />
            {formError && (
              <p style={{ color: "red", textAlign: "center" }}>{formError}</p>
            )}
          </Box>
          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            className={styles.btn}
            onClick={handleSubmit}
          >
            Create User
          </Button>
        </Paper>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          user was added
        </Alert>
      </Snackbar>
    </div>
  );
}
