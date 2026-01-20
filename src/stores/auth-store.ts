import { create } from "zustand";
import { getCookie, setCookie, removeCookie } from "@/lib/cookies";

const TOKEN_COOKIE = "token"; // Same as backend cookie name

// User type (simplified for learning)
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  emailId: string;
}

export interface AuthState {
  auth: {
    user: User | null;
    setUser: (user: User | null) => void;
    accessToken: string;
    setAccessToken: (accessToken: string) => void;
    resetAccessToken: () => void;
    reset: () => void;
  };
}

export const useAuthStore = create<AuthState>()((set) => {
  // Read cookies on initialization
  const cookieState = getCookie(TOKEN_COOKIE);
  const initToken = cookieState ?? "";

  return {
    auth: {
      user: null,
      setUser: (user) =>
        set((state) => ({ ...state, auth: { ...state.auth, user } })),

      accessToken: initToken,
      setAccessToken: (accessToken) =>
        set((state) => {
          if (accessToken)
            setCookie(TOKEN_COOKIE, accessToken, 24 * 60 * 60); // 24 hours
          else removeCookie(TOKEN_COOKIE);
          return {
            ...state,
            auth: { ...state.auth, accessToken: accessToken || "" },
          };
        }),

      resetAccessToken: () =>
        set((state) => {
          removeCookie(TOKEN_COOKIE);
          return { ...state, auth: { ...state.auth, accessToken: "" } };
        }),

      reset: () =>
        set((state) => {
          removeCookie(TOKEN_COOKIE);
          return {
            ...state,
            auth: {
              ...state.auth,
              user: null,
              accessToken: "",
            },
          };
        }),
    },
  };
});
