import { View } from "react-native";

import { Text } from "@/components/ui/Text";

export default function CampScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text variant="h2">Camp</Text>
    </View>
  );
}