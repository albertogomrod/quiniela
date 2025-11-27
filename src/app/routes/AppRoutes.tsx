import { Routes, Route, Navigate } from "react-router-dom";
import {
  Login,
  Register,
  ProtectedRoute,
  PublicRoute,
  AuthRedirectGuard,
} from "../../features/auth";
import { DashboardLayout } from "../../features/dashboard";
import {
  CreateLeagueWizard,
  JoinLeague,
  LeaguePage,
} from "../../features/league";
import { Home } from "../../pages/Home";
import { Welcome } from "../../pages/Welcome";

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

        {/* Crear Liga */}
        <Route
          path="/dashboard/create-league"
          element={
            <ProtectedRoute>
              <CreateLeagueWizard />
            </ProtectedRoute>
          }
        />

        {/* Unirse a Liga */}
        <Route
          path="/dashboard/join-league"
          element={
            <ProtectedRoute>
              <JoinLeague />
            </ProtectedRoute>
          }
        />

        {/* Página de Liga Individual */}
        <Route
          path="/league/:leagueId"
          element={
            <ProtectedRoute>
              <LeaguePage />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthRedirectGuard>
  );
};
