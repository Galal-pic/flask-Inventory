import React from "react";
import styles from "./Header.module.css";
import logo from "./logo.png";
import userIcon from "./user.png";
import { useAuth, logout } from "../../context/AuthContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoggedInLinks = () => {
  return (
    <>
      <a href="/">
        <img src={logo} alt="" className={styles.logo} />
      </a>
      <img src={userIcon} alt="" className={styles.logo} />
    </>
  );
};

const LoggedOutLinks = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <a href="/home">
        <img src={logo} alt="" className={styles.logo} />
      </a>
      <Button
        variant="contained"
        color="primary"
        className={styles.button}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>
  );
};

export default function Header() {
  const logged = !!useAuth();

  return (
    <div className={styles.header}>
      {logged ? <LoggedInLinks /> : <LoggedOutLinks />}
    </div>
  );
}
