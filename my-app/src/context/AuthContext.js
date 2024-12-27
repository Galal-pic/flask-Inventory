import React, { createContext, useState, useContext } from "react";

// Create Context
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user state to hold user info

  // Function to log out
  const logout = async () => {
    // await fetch("https://your-api-url.com/logout", { method: "POST" });
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
