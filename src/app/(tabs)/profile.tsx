import { router } from "expo-router";

import { Button, Screen, Text } from "@/components/ui";
import { useAuthStore } from "@/store/auth.store";

export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  async function handleLogout() {
    try {
      await signOut();

      router.replace("/(auth)/login");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Screen centered>
      <Text variant="display">Profile</Text>

      <Text style={{ marginVertical: 20 }}>
        {user?.email}
      </Text>

      <Button
        title="Logout"
        onPress={handleLogout}
      />
    </Screen>
  );
}