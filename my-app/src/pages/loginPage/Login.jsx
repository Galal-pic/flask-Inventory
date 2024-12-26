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

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
    return emailRegex.test(email);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }
    setEmailError("");
    console.log("Email:", email);
    console.log("Password:", password);

    // // Prepare the data as a JSON object
    // const dataToSend = {
    //   email: email,
    //   password: password,
    // };

    // // Fetch request to send JSON
    // fetch("http://127.0.0.1:5000/post", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json", // Specify JSON content type
    //   },
    //   body: JSON.stringify(dataToSend), // Convert data to JSON string
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json(); // Parse response as JSON if successful
    //     } else {
    //       throw new Error("Network response was not ok");
    //     }
    //   })
    //   .then((data) => {
    //     console.log("Response from server:", data); // Handle server response
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error); // Log any errors
    //   });
  };

  return (
    <div className={styles.container}>
      <div className={styles.boxText}>
        <h1 className={styles.title}>Welcome to My App</h1>
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
          {/* <GroupsIcon className={styles.iconGroup} /> */}
          <h2 className={styles.subTitle}>login</h2>
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

            {/* Submit Button */}
            <Button type="submit" variant="contained" className={styles.btn}>
              Sign In
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default Login;
