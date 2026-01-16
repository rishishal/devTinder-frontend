import { create } from "zustand";

// User type (simplified for learning)
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  emailId: string;
}

export interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: User | null) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,

  // Set user after login/signup
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  // Reset on logout
  reset: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
