import { createContext, useContext, useState } from "react";
import api from "../api/axios";

// Create Auth Context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // State untuk menyimpan token dan user
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isLoggedIn = !!token;

  // Login Function
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

  // Register Function
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

  // Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  // Provide Value
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        register,
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

// CUSTOM HOOK
export const useAuth = () => useContext(AuthContext);