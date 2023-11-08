import React, { useEffect, useState } from "react";
import Home from "./screens/home";
import Login from "./screens/auth/login";
import apiClient, { requestAccessToken } from "./spotify";

export default function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));

  const handleAccessTokenRequest = async () => {
    try {
      const tokenData = await requestAccessToken();
      const { access_token, refresh_token } = tokenData;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.removeItem("code");

      setAccessToken(access_token);

      // Clear the URL search parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (error) {
      console.error("Error:", error.response?.data);
      throw error;
    }
  };

  useEffect(() => {
    const authCode = new URLSearchParams(window.location.search).get("code");

    if (authCode) {
      localStorage.setItem("code", authCode);
      handleAccessTokenRequest();
    }
  }, []);

  return !accessToken ? <Login /> : <Home />;
}
