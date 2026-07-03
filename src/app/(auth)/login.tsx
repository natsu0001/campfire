import { useState } from "react";
import { View } from "react-native";

import { Button, Input, Screen, Text } from "@/components/ui";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Screen centered>
      <View
        style={{
          width: "100%",
          maxWidth: 420,
          gap: 20,
        }}
      >
        <Text
          variant="display"
          style={{ textAlign: "center", marginBottom: 12 }}
        >
          Campfire
        </Text>

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />

        <Button title="Login" />
      </View>
    </Screen>
  );
}