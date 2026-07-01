import { useTheme } from "@/theme";
import { View } from "react-native";

export default function Divider() {
  const theme = useTheme();

  return (
    <View
      style={{
        height: 1,
        backgroundColor: theme.colors.border,
        marginVertical: theme.spacing.md,
      }}
    />
  );
}