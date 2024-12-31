import { createAuthProvider } from "react-token-auth";

export const { useAuth, authFetch, login, logout } = createAuthProvider({
  accessTokenKey: "access_token",
  onUpdateToken: (token) =>
    fetch("http://127.0.0.1:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: token.refresh_token,
    }).then((response) => response.json()),
});
