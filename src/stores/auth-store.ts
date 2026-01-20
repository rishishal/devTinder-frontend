import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * User type matching backend response
 */
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  bio: string;
  age: number;
  skills: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  auth: {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    reset: () => void;
  };
}

/**
 * Auth Store
 *
 * Purpose: Store user info for UI purposes ONLY
 *
 * Note: We do NOT store tokens here because:
 * - Backend uses httpOnly cookies (browser handles automatically)
 * - httpOnly cookies cannot be accessed by JavaScript (security feature)
 * - withCredentials: true in axios sends cookies automatically
 *
 * Flow:
 * 1. Login/Signup → Backend sets httpOnly cookie → We store user info
 * 2. API calls → Browser sends cookie automatically → Backend validates
 * 3. Logout → Backend clears cookie → We clear user info
 * 4. Page refresh → Call /profile/me to restore user info
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      auth: {
        user: null,
        isAuthenticated: false,

        setUser: (user) =>
          set((state) => ({
            ...state,
            auth: {
              ...state.auth,
              user,
              isAuthenticated: !!user,
            },
          })),

        reset: () =>
          set((state) => ({
            ...state,
            auth: {
              ...state.auth,
              user: null,
              isAuthenticated: false,
            },
          })),
      },
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        auth: {
          user: state.auth.user,
          isAuthenticated: state.auth.isAuthenticated,
        },
      }),
    }
  )
);
