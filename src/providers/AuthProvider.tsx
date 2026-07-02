import { PropsWithChildren, useEffect } from "react";

import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export function AuthProvider({ children }: PropsWithChildren) {
  const restoreSession = useAuthStore((s) => s.restoreSession);

  useEffect(() => {
    restoreSession();

    const {
      data: { subscription },
    } = authService.onAuthStateChange((_event, session) => {
      useAuthStore.setState({
        session,
        user: session?.user ?? null,
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [restoreSession]);

  return <>{children}</>;
}