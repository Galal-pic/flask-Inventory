import React, { useState } from "react";
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
    text: "Users",
    href: "/users",
  },
  {
    text: "Create Invoice",
    href: "/createinvoice",
  },
  {
    text: "Invoices",
    href: "/invoices",
  },
];

export default function Header() {
  console.log( );

  const navigate = useNavigate();
  const handleLogout = async () => {
    logout();
    navigate("/login");
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
      <Link to="/users">
        <img src={logo} alt="" className={styles.logo} />
      </Link>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "50px",
        }}
      >
        {links.map((link) => (
          <li
            key={link.text}
            style={{
              listStyle: "none",
              transition: "0.2s",
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "20px",
                transition: "0.2s",
              }}
              to={link.href}
              onMouseEnter={(e) => (e.target.style.color = "#1976d2")}
              onMouseLeave={(e) => (e.target.style.color = "black")}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </div>

      <Button onClick={toggleDrawer(true)} className={styles.drawerButton}>
        <MenuIcon
          sx={{
            fontSize: "50px",
            color: "black",
          }}
        />
      </Button>
      <SwipeableDrawer
        anchor="right"
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{
            width: 260,
            backgroundColor: "#f7f7f7",
            height: "100vh",
            padding: 2,
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
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
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Name:
                </Typography>
                <ListItemText
                  primary="Esraa Soliman"
                  sx={{
                    color: "#555",
                  }}
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
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Gmail:
                </Typography>
                <ListItemText
                  primary="Esraa@gmail.com"
                  sx={{
                    color: "#555",
                  }}
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
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Phone:
                </Typography>
                <ListItemText
                  primary="01146815591"
                  sx={{
                    color: "#555",
                  }}
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
                  Logout
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
