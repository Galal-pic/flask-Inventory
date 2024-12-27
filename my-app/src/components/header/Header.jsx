import React from "react";
import styles from "./Header.module.css";
import logo from "./logo.png";
import userIcon from "./user.png";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={styles.header}>
      <img src={logo} alt="" className={styles.logo} />

      {user ? (
        <p>Welcome, {user.name}</p>
      ) : (
        <img src={userIcon} alt="" className={styles.logo} />
      )}
      {user ? (
        <Button
          variant="contained"
          color="primary"
          className={styles.button}
          onClick={user ? handleLogout : null}
        >
          {user ? "Logout" : "Login"}{" "}
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}
