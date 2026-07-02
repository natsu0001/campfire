import { create } from "zustand";

import { authService } from "@/services/auth.service";
import { AuthState } from "@/types/auth";

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  loading: true,

  restoreSession: async () => {
    set({ loading: true });

    const {
      data: { session },
    } = await authService.getSession();

    set({
      session,
      user: session?.user ?? null,
      loading: false,
    });
  },

  signUpWithEmail: async (email, password) => {
    const { error } = await authService.signUp(email, password);

    if (error) throw error;
  },

  signInWithEmail: async (email, password) => {
    const { error } = await authService.signIn(email, password);

    if (error) throw error;
  },

  signOut: async () => {
    const { error } = await authService.signOut();

    if (error) throw error;

    set({
      session: null,
      user: null,
    });
  },
}));