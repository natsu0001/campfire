import { View } from "react-native";

import { Text } from "@/components/ui";

export function EmptyState() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text variant="h2">No Camps Yet</Text>

      <Text
        variant="bodySmall"
        style={{
          marginTop: 8,
        }}
      >
        Create your first camp.
      </Text>
    </View>
  );
}