import { Button, Screen, Text } from "@/components/ui";
import { View } from "react-native";

export default function LoginScreen() {
  return (
    <Screen>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          gap: 24,
        }}
      >
        <Text variant="display">Campfire</Text>

        <Button title="Login" />
      </View>
    </Screen>
  );
}