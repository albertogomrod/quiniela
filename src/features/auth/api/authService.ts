import axios from "axios";
import type {
  User,
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from "../types/auth.types";
import { config } from "../../../config/env";

const API_URL = `${config.apiUrl}/api/auth`;

class AuthService {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/register`, data);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/login`, credentials);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getCurrentUser();
  }
}

export default new AuthService();
