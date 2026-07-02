import { Text } from "@/components/ui";
import { ActivityIndicator, View } from "react-native";

export function SplashScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text variant="display">Campfire</Text>
      <ActivityIndicator style={{ marginTop: 24 }} />
    </View>
  );
}