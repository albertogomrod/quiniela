import { useState, useEffect, type ReactNode } from "react";
import type { User } from "../types/auth.types";
import authService from "../api/authService";
import userStatusService from "../api/userStatusService";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    return authService.getCurrentUser();
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = authService.getCurrentUser();
      const token = authService.getToken();

      if (currentUser && token) {
        setUser(currentUser);
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await authService.register({ name, email, password });

      // Marcar como primera vez
      const newUser = { ...response.user, isFirstTime: true };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      // La redirección se maneja en AuthRedirectGuard
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Error al registrarse"
        );
      }
      throw new Error("Error al registrarse");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      setUser(response.user);

      // La redirección se maneja en AuthRedirectGuard
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Error al iniciar sesión"
        );
      }
      throw new Error("Error al iniciar sesión");
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = (updatedUser: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updatedUser };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  };

  // Función para verificar el estado del usuario
  const getUserStatus = () => {
    return userStatusService.checkUserStatus(user);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div style={{ color: "white", fontSize: "20px" }}>Cargando...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
        getUserStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
