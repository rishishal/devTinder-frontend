import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";

import { useAuthStore } from "@/stores/auth-store";

const baseURL = import.meta.env.VITE_BASE_URL;

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});
// Response Interceptor to handle 401 Unauthorized globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { reset } = useAuthStore.getState();
      reset();

      if (!window.location.pathname.includes("/sign-in")) {
        window.location.href = "/sign-in";
      }
    }
    return Promise.reject(error);
  },
);

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

export function createAuthHooks() {
  const { setUser, reset } = useAuthStore();

  return {
    useFetchUser: () => {
      return useMutation({
        mutationFn: () => authApi.getCurrentUser(),
        onSuccess: (response) => {
          setUser(response.data);
        },
        onError: () => {
          reset();
        },
      });
    },

    useLogin: () => {
      return useMutation({
        mutationFn: (data: LoginData) => authApi.login(data),
      });
    },

    useSignup: () => {
      return useMutation({
        mutationFn: (data: SignupData) => authApi.signup(data),
      });
    },

    useLogout: () => {
      const navigate = useNavigate();
      return useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
          reset();
          navigate({ to: "/sign-in" });
        },
        onError: () => {
          navigate({ to: "/sign-in" });
        },
      });
    },
  };
}
