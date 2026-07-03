import { Button, Text } from "@/components/ui";
import { useTheme } from "@/theme";
import { View } from "react-native";

export default function LoginScreen() {
  const { colors, spacing } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        padding: spacing.lg,
        gap: spacing.lg,
      }}
    >
      <Text variant="display">Campfire</Text>

      <Button
        title="Login"
        onPress={() => {}}
      />
    </View>
  );
}