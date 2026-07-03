import { router } from "expo-router";
import { useState } from "react";

import {
  Button,
  Input,
  Screen,
  Text,
} from "@/components/ui";

import { profileService } from "@/services/profile.service";

export default function UsernameScreen() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleContinue() {
    try {
      setLoading(true);

      const { error } = await profileService.createProfile(
        username.trim().toLowerCase()
      );

      if (error) throw error;

      router.replace("/(tabs)/camp");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen centered keyboard>
      <Text
        variant="display"
        style={{
          textAlign: "center",
          marginBottom: 12,
        }}
      >
        Choose Username
      </Text>

      <Text
        variant="bodySmall"
        style={{
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        This will be your unique @username.
      </Text>

      <Input
        label="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="devgrind"
      />

      <Button
        title="Continue"
        loading={loading}
        disabled={username.trim().length < 3}
        onPress={handleContinue}
      />
    </Screen>
  );
}