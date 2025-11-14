import { Routes, Route, Navigate } from "react-router-dom";
import {
  Login,
  Register,
  ProtectedRoute,
  PublicRoute,
} from "../../features/auth";
import { DashboardLayout } from "../../features/dashboard";
import { Home } from "../../pages/Home";
import { Welcome } from "../../pages/Welcome";
import { AuthRedirectGuard } from "../../features/auth/components/AuthRedirectGuard";

export const AppRoutes = () => {
  return (
    <AuthRedirectGuard>
      <Routes>
        {/* Ruta pública - Home */}
        <Route path="/" element={<Home />} />

        {/* Rutas de autenticación */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Ruta de bienvenida (primera vez) */}
        <Route
          path="/welcome"
          element={
            <ProtectedRoute>
              <Welcome />
            </ProtectedRoute>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthRedirectGuard>
  );
};
