import { useTheme } from "@/theme";
import {
    ActivityIndicator,
    Pressable,
    Text,
} from "react-native";

type Props = {
  title: string;
  onPress?: () => void;
  loading?: boolean;
};

export default function Button({
  title,
  onPress,
  loading = false,
}: Props) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.radius.lg,
        alignItems: "center",
      }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.white} />
      ) : (
        <Text
          style={{
            color: theme.colors.white,
            ...theme.typography.button,
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}