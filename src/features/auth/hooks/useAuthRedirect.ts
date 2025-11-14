import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import userStatusService from "../api/userStatusService";

export const useAuthRedirect = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = userStatusService.getRedirectPath(user);
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return {
    user,
    isAuthenticated,
    redirectPath: user ? userStatusService.getRedirectPath(user) : null,
  };
};
