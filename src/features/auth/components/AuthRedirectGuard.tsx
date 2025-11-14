import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import userStatusService from "../api/userStatusService";

interface AuthRedirectGuardProps {
  children: React.ReactNode;
}

export const AuthRedirectGuard = ({ children }: AuthRedirectGuardProps) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthPage = ["/login", "/register"].includes(location.pathname);

    if (isAuthenticated && user && isAuthPage) {
      const redirectPath = userStatusService.getRedirectPath(user);

      console.log("🔄 Redirección inteligente:", {
        usuario: user.name,
        tieneLibas: user.ligas?.length || 0,
        esPrimeraVez: user.isFirstTime,
        redirigirA: redirectPath,
      });

      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  return <>{children}</>;
};
