import { Screen } from "@/components/ui";
import { useTheme } from "@/theme";
import { Text } from "react-native";

export default function LoginScreen() {
  const theme = useTheme();

  return (
    <Screen>
      <Text
        style={{
          color: theme.colors.text,
          ...theme.typography.h1,
        }}
      >
        Login
      </Text>
    </Screen>
  );
}