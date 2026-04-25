import { createContext, useContext, useState } from "react";
import api from "../api/axios";

// =========================
// 🔐 CREATE CONTEXT
// =========================
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // =========================
  // 💾 STATE AUTH
  // =========================
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isLoggedIn = !!token;

  // =========================
  // 🔑 LOGIN FUNCTION
  // =========================
  const login = async (data) => {
    try {
      const res = await api.post("/login", data);

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login gagal",
      };
    }
  };

  // =========================
  // 🆕 REGISTER FUNCTION (FIX UTAMA)
  // =========================
  const register = async (data) => {
    try {
      const res = await api.post("/register", data);

      return {
        success: true,
        data: res.data,
      };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Register gagal",
      };
    }
  };

  // =========================
  // 🚪 LOGOUT FUNCTION
  // =========================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  // =========================
  // 📦 PROVIDER VALUE
  // =========================
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        register, // 🔥 WAJIB: agar Register.jsx bisa jalan
        logout,
        isLoggedIn,

        // ROLE CHECK
        isAdmin: user?.role === "admin",
        isUser: user?.role === "user",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =========================
// 🎯 CUSTOM HOOK
// =========================
export const useAuth = () => useContext(AuthContext);