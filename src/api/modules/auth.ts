import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";

import { useAuthStore } from "@/stores/auth-store";

const baseURL = import.meta.env.VITE_BASE_URL;

/**
 * API Client Configuration
 * - withCredentials: true → Automatically sends/receives httpOnly cookies
 * - No Bearer token needed — backend reads from req.cookies.token
 */
export const apiClient = axios.create({
  baseURL,
  withCredentials: true, // This sends cookies with every request
});

/**
 * Response Interceptor
 * - Handles 401 errors globally (session expired, invalid token)
 * - Resets auth state and redirects to login
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Session expired or invalid — reset auth and redirect
      const { reset } = useAuthStore.getState();
      reset();

      // Only redirect if not already on auth pages
      if (!window.location.pathname.includes("/authentication")) {
        window.location.href = "/authentication/sign-in";
      }
    }
    return Promise.reject(error);
  }
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

// Raw API calls
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

/**
 * Auth Hooks Factory
 * Creates React Query hooks for all auth operations
 */
export function createAuthHooks() {
  const { auth, setUser, reset } = useAuthStore();

  return {
    /**
     * Fetch Current User
     * Called on app initialization to restore session
     * Backend validates the httpOnly cookie and returns user data
     */
    useFetchUser: () => {
      return useMutation({
        mutationFn: () => authApi.getCurrentUser(),
        onSuccess: (response) => {
          setUser(response.data);
        },
        onError: () => {
          // Cookie is invalid/expired — clear local state
          reset();
        },
      });
    },

    /**
     * Login
     * POST /auth/login → Backend sets httpOnly cookie
     * We only store user info for UI purposes
     */
    useLogin: () => {
      const navigate = useNavigate();
      return useMutation({
        mutationFn: (data: LoginData) => authApi.login(data),
        onSuccess: (response) => {
          // Backend sets httpOnly cookie automatically
          // We only store user data for UI display
          setUser(response.data.data);
          navigate({ to: "/" });
        },
      });
    },

    /**
     * Signup
     * POST /auth/signup → Backend sets httpOnly cookie
     */
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

    /**
     * Logout
     * POST /auth/logout → Backend clears httpOnly cookie
     */
    useLogout: () => {
      const navigate = useNavigate();
      return useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
          reset();
          navigate({ to: "/sign-in" });
        },
        onError: () => {
          // Even if logout fails, clear local state
          reset();
          navigate({ to: "/sign-in" });
        },
      });
    },
  };
}
