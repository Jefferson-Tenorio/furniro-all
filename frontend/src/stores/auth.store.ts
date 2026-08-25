import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
  login: (payload: { username: string; token: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      username: null,
      token: null,
      login: ({ username, token }) =>
        set({ isAuthenticated: true, username, token }),
      logout: () =>
        set({ isAuthenticated: false, username: null, token: null }),
    }),
    {
      name: "auth-storage",
      version: 2,
      migrate: (persistedState) => {
        const state = persistedState as Partial<AuthState> | undefined;

        if (!state?.token) {
          return {
            isAuthenticated: false,
            username: null,
            token: null,
          };
        }

        return {
          isAuthenticated: Boolean(state.token),
          username: state.username ?? null,
          token: state.token,
        };
      },
    }
  )
);