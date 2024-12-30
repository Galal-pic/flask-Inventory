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
import { motion } from "framer-motion";
import logo from "./logo.png";

const Login = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const apiUrl = "http://localhost:3001/users";

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError("");
    setPasswordError("");

    if (!name) {
      setNameError("Name is required");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    const dataToSend = {
      name: name,
      password: password,
    };
    navigate("/users");
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
      </Box>
    </div>
  );
};

export default Login;
