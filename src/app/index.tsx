import { Redirect } from "expo-router";

import { SplashScreen } from "@/components/SplashScreen";
import { useAuthStore } from "@/store/auth.store";
import profile from "./(tabs)/profile";

export default function Index() {
  const { user, loading } = useAuthStore();

 if (loading) return <SplashScreen />;

if (!user) {
  return <Redirect href="/(auth)/login" />;
}

if (!profile) {
  return <Redirect href="/(auth)/username" />;
}

return <Redirect href="/(tabs)/camp" />;
}