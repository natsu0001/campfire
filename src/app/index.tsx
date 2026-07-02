import { Redirect } from "expo-router";

import { SplashScreen } from "@/components/SplashScreen";
import { useAuthStore } from "@/store/auth.store";

export default function Index() {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <SplashScreen />;
  }

  return user ? (
    <Redirect href="/(tabs)/camp" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}