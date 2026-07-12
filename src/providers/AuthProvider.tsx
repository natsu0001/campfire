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
  console.log("AUTH EVENT:", _event);
  console.log("SESSION:", session?.user?.email);

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