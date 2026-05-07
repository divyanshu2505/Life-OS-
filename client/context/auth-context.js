"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { request } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = window.localStorage.getItem("companion-circle-token");
    const storedUser = window.localStorage.getItem("companion-circle-user");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (!storedToken) {
      setLoading(false);
      return;
    }

    // Revalidate the session once on boot so role-based UI stays trustworthy.
    request("get", "/auth/me")
      .then((response) => {
        setUser(response.user);
        window.localStorage.setItem("companion-circle-user", JSON.stringify(response.user));
      })
      .catch(() => {
        window.localStorage.removeItem("companion-circle-token");
        window.localStorage.removeItem("companion-circle-user");
        setUser(null);
        setToken(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const saveSession = (payload) => {
    setToken(payload.token);
    setUser(payload.user);
    window.localStorage.setItem("companion-circle-token", payload.token);
    window.localStorage.setItem("companion-circle-user", JSON.stringify(payload.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    window.localStorage.removeItem("companion-circle-token");
    window.localStorage.removeItem("companion-circle-user");
  };

  const updateUser = (nextUser) => {
    setUser(nextUser);
    window.localStorage.setItem("companion-circle-user", JSON.stringify(nextUser));
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token),
      saveSession,
      logout,
      updateUser
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
