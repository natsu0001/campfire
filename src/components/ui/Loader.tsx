import { useTheme } from "@/theme";
import { ActivityIndicator, View } from "react-native";

export default function Loader() {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
      />
    </View>
  );
}