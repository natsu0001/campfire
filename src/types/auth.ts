import { Session, User } from "@supabase/supabase-js";

export interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;

  restoreSession: () => Promise<void>;

  signInWithEmail: (
    email: string,
    password: string
  ) => Promise<void>;

  signUpWithEmail: (
    email: string,
    password: string
  ) => Promise<void>;

  signOut: () => Promise<void>;
}