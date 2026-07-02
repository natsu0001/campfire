import { Text } from "@/components/ui";
import { View } from "react-native";

export default function UsernameScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text variant="h2">Choose Username</Text>
    </View>
  );
}