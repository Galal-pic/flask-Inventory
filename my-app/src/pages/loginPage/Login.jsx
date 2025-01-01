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
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../context/AuthContext";
import { motion } from "framer-motion";
import logo from "./logo.png";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameError("");
    setPasswordError("");
    setSnackbarMessage(""); // Reset snackbar message

    // Input validation
    if (!name) {
      setNameError("Name is required");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    const dataToSend = {
      username: name,
      password: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        setSnackbarMessage("Login failed. Please check your credentials.");
        setOpenSnackbar(true);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      navigate("/users");
      login(data); // Assuming login is a context or state function
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("Wrong username or password, please try again");
      setOpenSnackbar(true);
    }
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
      <div className={styles.boxText}>
        <motion.img
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
          src={logo}
          alt="logo"
          className={styles.logo}
        />
        <motion.h1
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
          className={styles.title}
        >
          Welcome to CUBII
        </motion.h1>
      </div>

      <Box
        sx={{
          width: { xs: "95%", sm: "70%", md: "50%", lg: "40%", xl: "35%" },
        }}
        className={styles.boxForm}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 25 }}
        >
          <Paper className={styles.paper}>
            <LockOutlinedIcon className={styles.icon} />
            <h2 className={styles.subTitle}>Login</h2>
            <Box component="form" className={styles.textFields}>
              {/* Email Field */}
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
              {/* {formError && (
                <p style={{ color: "red", textAlign: "center" }}>
                  Please, Try again
                </p>
              )} */}
              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                className={styles.btn}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
            </Box>
          </Paper>
        </motion.div>
        <Snackbar
          open={openSnackbar}
          onClose={handleCloseSnackbar}
          autoHideDuration={3000}
        >
          <Alert variant="outlined" severity="error">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default Login;
