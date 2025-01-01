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
import { jwtDecode } from "jwt-decode";

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

const getUserDataFromToken = () => {
  const accessToken = localStorage.getItem("access_token");
  console.log(accessToken);

  const tokenParts = accessToken.split(".");
  const payload = atob(tokenParts[1]);

  try {
    const decodedPayload = JSON.parse(payload);
    return decodedPayload;
  } catch (error) {
    console.error("Error parsing token payload:", error);
    return null;
  }
};

export default function Header() {
  const [logged] = useAuth();
  console.log(logged)

  const userData = getUserDataFromToken();
  console.log(userData);

  const [selectedLink, setSelectedLink] = useState("/users"); // لإدارة الرابط المختار
  const handleLinkClick = (href) => {
    setSelectedLink(href); // تحديث الرابط المختار
    navigate(href); // الانتقال للرابط
  };

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
