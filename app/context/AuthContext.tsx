"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  userRole: string;
  token: string | null;
  login: (role: string, token: string) => void;
  logout: () => void;
  isLoading: boolean; // Add isLoading to the context
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Check localStorage on initial load
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("role") || "";
    const storedToken = localStorage.getItem("token");

    if (loggedIn && role && storedToken) {
      setIsLoggedIn(true);
      setUserRole(role);
      setToken(storedToken);
    }

    setIsLoading(false); // Mark loading as complete
  }, []);

  // Login function
  const login = (role: string, token: string) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", role);
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    setUserRole(role);
    setToken(token);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole("");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};