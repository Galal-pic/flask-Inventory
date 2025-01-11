import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import logo from "./logo.png";
import { useAuth, logout } from "../../context/AuthContext";
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";

const links = [
  {
    text: "الفواتير",
    href: "/invoices",
  },
  {
    text: "إنشاء فاتورة",
    href: "/createinvoice",
  },
  {
    text: "الموظفين",
    href: "/users",
  },
];

export default function Header() {
  const [user, setUser] = useState({});
  const [logged] = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (logged) {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
          console.error("No access token found.");
          return;
        }

        try {
          const response = await fetch("http://127.0.0.1:5000/auth/user", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!response.ok) {
            throw new Error(
              `Failed to fetch user data: ${response.statusText}`
            );
          }

          const data = await response.json();
          setUser(data);
          return data;
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
    };

    fetchUserData();
  }, [logged]);

  const [selectedLink, setSelectedLink] = useState("/users");
  const handleLinkClick = (href) => {
    setSelectedLink(href);
    navigate(href);
  };

  const navigate = useNavigate();
  const handleLogout = async () => {
    logout();
    navigate("/login");
    localStorage.clear();
  };

  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  return (
    <div className={styles.header}>
      {/* NavBar */}
      <Link to="/users">
        <img src={logo} alt="" className={styles.logo} />
      </Link>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "50px",
        }}
      >
        {links.map((link) => (
          <li
            key={link.text}
            style={{
              listStyle: "none",
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: selectedLink === link.href ? "#1976d2" : "black",
                fontSize: "20px",
                fontWeight: "bold",
                marginRight: "20px",
              }}
              to={link.href}
              onClick={() => handleLinkClick(link.href)}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </div>

      {/* Drawer icon */}
      <Button onClick={toggleDrawer(true)} className={styles.drawerButton}>
        <MenuIcon
          sx={{
            fontSize: "50px",
            color: "black",
          }}
        />
      </Button>

      {/* Drawer */}
      <SwipeableDrawer
        anchor="right"
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
          zIndex: "9999999999999999999999999999999999999",
        }}
      >
        <Box
          sx={{
            width: 260,
            backgroundColor: "#f7f7f7",
            height: "100vh",
            padding: 2,
            direction: "rtl",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* User Information */}
            <ListItem
              disablePadding
              sx={{
                marginBottom: 3,
              }}
            >
              <ListItemButton
                sx={{
                  cursor: "context-menu",
                  display: "flex",
                  gap: 1,
                  textAlign: "right",
                  fontSize: "1.5rem",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
                >
                  الاسم:
                </Typography>
                <ListItemText
                  primary={
                    <Typography sx={{ color: "#555", fontSize: "1.5rem" }}>
                      {user.username}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{
                marginBottom: 3,
              }}
            >
              <ListItemButton
                sx={{
                  cursor: "context-menu",
                  display: "flex",
                  gap: 1,
                  textAlign: "right",
                  fontSize: "1.5rem",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  الوظيقة:
                </Typography>

                <ListItemText
                  primary={
                    <Typography sx={{ color: "#555", fontSize: "1.5rem" }}>
                      {user.job_name}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>

            {/* Logout Button */}
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  cursor: "default",
                  "&:hover": { backgroundColor: "transparent" },
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogout}
                  sx={{
                    width: "100%",
                    height: "50px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#1976d2",
                    "&:hover": {
                      backgroundColor: "#115293",
                    },
                  }}
                >
                  تسجيل الخروج
                </Button>
              </ListItemButton>
            </ListItem>

            {/* logo */}
            <ListItem
              disablePadding
              sx={{
                marginBottom: 3,
              }}
            >
              <img
                src={logo}
                alt="logo"
                style={{
                  height: "100px",
                  margin: "50px auto",
                }}
              />
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}
