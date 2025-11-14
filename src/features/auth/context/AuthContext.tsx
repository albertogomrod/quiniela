import { createContext } from "react";
import type {
  User,
  UserOnboardingStatus,
  AuthResponse,
} from "../types/auth.types";

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<AuthResponse>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  isAuthenticated: boolean;
  getUserStatus: () => UserOnboardingStatus;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
