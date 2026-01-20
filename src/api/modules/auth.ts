import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";

import { useAuthStore } from "@/stores/auth-store";

const baseURL = import.meta.env.VITE_BASE_URL;

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});

// Axios interceptor - reset auth on 401 (simplified, no refresh token)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - reset auth and redirect to login
      useAuthStore.getState().auth.reset();
      window.location.href = "/authentication/sign-in";
    }
    return Promise.reject(error);
  },
);

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

  getCurrentUser: () => apiClient.get("/profile/me"),
};

// Factory function to create auth hooks (like your ERP pattern)
export function createAuthHooks() {
  const { auth } = useAuthStore();

  return {
    // FETCH CURRENT USER (called on app init if token exists)
    useFetchUser: () => {
      return useMutation({
        mutationFn: () => authApi.getCurrentUser(),
        onSuccess: (response) => {
          auth.setUser(response.data);
        },
        onError: () => {
          auth.reset();
        },
      });
    },

    // LOGIN
    useLogin: () => {
      const navigate = useNavigate();
      return useMutation({
        mutationFn: (data: LoginData) => authApi.login(data),
        onSuccess: (response) => {
          const { data: userData, accessToken } = response.data;
          auth.setUser(userData);
          auth.setAccessToken(accessToken);
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
          const { data: userData, accessToken } = response.data;
          auth.setUser(userData);
          auth.setAccessToken(accessToken);
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
          auth.reset();
          navigate({ to: "/authentication/sign-in" });
        },
      });
    },
  };
}
