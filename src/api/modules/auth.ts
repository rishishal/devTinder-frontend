import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";

import { useAuthStore } from "@/stores/auth-store";

const baseURL = import.meta.env.VITE_BASE_URL;

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});

// Types for API
interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Raw API calls (used internally by hooks)
const authApi = {
  login: (data: LoginData) =>
    apiClient.post("/auth/login", {
      emailId: data.email,
      password: data.password,
    }),

  signup: (data: SignupData) =>
    apiClient.post("/auth/signup", {
      firstName: data.firstName,
      lastName: data.lastName,
      emailId: data.email,
      password: data.password,
    }),

  logout: () => apiClient.post("/auth/logout"),
};

// Factory function to create auth hooks (like your ERP pattern)
export function createAuthHooks() {
  const { setUser, reset } = useAuthStore();

  return {
    // LOGIN
    useLogin: () => {
      const navigate = useNavigate();
      return useMutation({
        mutationFn: (data: LoginData) => authApi.login(data),
        onSuccess: (response) => {
          setUser(response.data.data);
          navigate({ to: "/" });
        },
      });
    },

    // SIGNUP
    useSignup: () => {
      const navigate = useNavigate();
      return useMutation({
        mutationFn: (data: SignupData) => authApi.signup(data),
        onSuccess: (response) => {
          setUser(response.data.data);
          navigate({ to: "/" });
        },
      });
    },

    // LOGOUT
    useLogout: () => {
      const navigate = useNavigate();
      return useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
          reset();
          navigate({ to: "/authentication/sign-in" });
        },
      });
    },
  };
}
