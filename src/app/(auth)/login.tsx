import { useState } from "react";

import {
  Button,
  Input,
  Screen,
  Text,
} from "@/components/ui";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Screen centered>
      <Text variant="display">Campfire</Text>

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />

      <Button title="Login" />
    </Screen>
  );
}