// Context & Provider
export { AuthProvider } from "./context/AuthProvider";
export { AuthContext } from "./context/AuthContext";

// Hooks
export { useAuth } from "./hooks/useAuth";
export { useAuthRedirect } from "./hooks/useAuthRedirect";

// Components
export { Login } from "./components/Login";
export { Register } from "./components/Register";
export { ProtectedRoute } from "./components/ProtectedRoute";
export { PublicRoute } from "./components/PublicRoute";
export { AuthRedirectGuard } from "./components/AuthRedirectGuard";

// Services
export { default as authService } from "./api/authService";
export { default as userStatusService } from "./api/userStatusService";

// Types
export type {
  User,
  AuthResponse,
  UserOnboardingStatus,
} from "./types/auth.types";
