import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { useAuthStore } from "@/store/auth.store";

export default function Index() {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0B0B0F",
        }}
      >
        <ActivityIndicator size="large" color="#FF8A3D" />
      </View>
    );
  }

  if (user) {
    return <Redirect href="/(tabs)/camp" />;
  }

  return <Redirect href="/(auth)/login" />;
}