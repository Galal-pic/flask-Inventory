import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Paper,
  InputAdornment,
  IconButton,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Register() {
  const [username, setUserName] = useState("");
  const [jobName, setJobName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [jobError, setJobError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackBarType, setSnackBarType] = useState("");

  const navigate = useNavigate();

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(phone);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setNameError("");
    setPhoneError("");
    setJobError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!username) {
      setNameError("يرجى ادخال الاسم");
      return;
    } else if (username.length > 80) {
      setNameError("الاسم لا يمكن أن يكون أطول من 80 حرفًا");
      return;
    }

    if (!phoneNumber) {
      setPhoneError("يرجى ادخال رقم الهاتف");
      return;
    } else if (!validatePhone(phoneNumber)) {
      setPhoneError("رقم الهاتف غير صالح");
      return;
    } else if (phoneNumber.length > 20) {
      setPhoneError("رقم الهاتف لا يمكن أن يتجاوز 20 رقمًا");
      return;
    }

    if (!jobName) {
      setJobError("يرجى ادخال اسم الوظيفة");
      return;
    }

    if (!password) {
      setPasswordError("يرجى ادخال كلمة المرور");
      return;
    } else if (password.length < 6 || password.length > 120) {
      setPasswordError("يجب أن تتراوح كلمة المرور بين 6 و 120 حرفًا");
      return;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("يرجى تأكيد كلمة المرور");
      return;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("كلمات المرور غير متطابقة");
      return;
    }

    const dataToSend = {
      username,
      password,
      phone_number: phoneNumber,
      job_name: jobName,
    };

    fetch("http://127.0.0.1:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (response.status === 400) {
          response.json().then((data) => {
            setOpenSnackbar(true);
            setSnackBarType("info");
            setSnackbarMessage("الموظف موجود بالفعل");
          });
        }
        console.log("Response status:", response.status);

        if (response.status === 201) {
          response.json().then((data) => {
            navigate("/users");
          });
        }

        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error(data.message || "الاستجابة من الشبكة لم تكن صحيحة");
          });
        }
      })
      .then((data) => {
        setSnackbarMessage("تم تسجيل الموظف بنجاح");
        setSnackBarType("success");
        setOpenSnackbar(true);
      })
      .catch((error) => {
        setSnackbarMessage("فشل التسجيل. يرجى المحاولة مرة أخرى.");
        setOpenSnackbar(true);
        console.error("Error:", error);
      });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const CustomArrow = (props) => (
    <ArrowDropDownIcon
      {...props}
      sx={{
        marginRight: "85%",
      }}
    />
  );

  return (
    <div className={styles.container}>
      <Box
        sx={{
          width: { xs: "95%", sm: "70%", md: "50%", lg: "40%", xl: "35%" },
        }}
        className={styles.boxForm}
      >
        <Paper className={styles.paper}>
          <IconButton className={styles.iconBtn} onClick={handleBack}>
            <ArrowBackOutlinedIcon className={styles.arrow} />
          </IconButton>
          <h2 className={styles.subTitle}>التسجيل</h2>
          <Box
            component="form"
            onSubmit={handleSubmit}
            className={styles.textFields}
          >
            {/* Name Field */}
            <TextField
              label="الاسم"
              variant="outlined"
              required
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className={styles.textField}
              error={!!nameError}
              helperText={nameError}
              slotProps={{
                input: {
                  style: {
                    direction: "rtl",
                  },
                },
                inputLabel: {
                  style: {
                    textAlign: "right",
                    width: "calc(100% - 28px)",
                  },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  textAlign: "right",
                },
                "& .MuiInputLabel-root": {
                  transformOrigin: "right",
                },
              }}
            />
            {/* Phone Field */}
            <TextField
              label="رقم الهاتف"
              variant="outlined"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={styles.textField}
              error={!!phoneError}
              helperText={phoneError}
              slotProps={{
                input: {
                  style: {
                    direction: "rtl",
                  },
                },
                inputLabel: {
                  style: {
                    textAlign: "right",
                    width: "calc(100% - 28px)",
                  },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  textAlign: "right",
                },
                "& .MuiInputLabel-root": {
                  transformOrigin: "right",
                },
              }}
            />

            {/* job Field */}
            <FormControl
              className={styles.textField}
              variant="outlined"
              error={!!jobError}
            >
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  textAlign: "right",
                  width: "calc(100% - 28px)",
                  transformOrigin: "right",
                }}
              >
                الوظيفة
              </InputLabel>
              <Select
                value={jobName}
                onChange={(e) => setJobName(e.target.value)}
                label="الوظيفة"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    textAlign: "right",
                  },
                }}
                IconComponent={CustomArrow}
              >
                <MenuItem
                  sx={{
                    direction: "rtl",
                  }}
                  value="مبرمج"
                >
                  مبرمج
                </MenuItem>
                <MenuItem
                  sx={{
                    direction: "rtl",
                  }}
                  value="مدير"
                >
                  مدير
                </MenuItem>
              </Select>
              {!!jobError && <FormHelperText>{jobError}</FormHelperText>}
            </FormControl>

            {/* Password Field */}
            <TextField
              label="كلمة المرور"
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
                  style: {
                    direction: "rtl",
                  },
                },
                inputLabel: {
                  style: {
                    textAlign: "right",
                    width: "calc(100% - 28px)",
                  },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  textAlign: "right",
                },
                "& .MuiInputLabel-root": {
                  transformOrigin: "right",
                },
              }}
            />
            <TextField
              label="تأكيد كلمة المرور"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.textField}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
              slotProps={{
                input: {
                  style: {
                    direction: "rtl",
                  },
                },
                inputLabel: {
                  style: {
                    textAlign: "right",
                    width: "calc(100% - 28px)",
                  },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  textAlign: "right",
                },
                "& .MuiInputLabel-root": {
                  transformOrigin: "right",
                },
              }}
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
            إضافة موظف
          </Button>
        </Paper>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          zIndex: "99999999999999999999999999999999999999",
        }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackBarType}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
