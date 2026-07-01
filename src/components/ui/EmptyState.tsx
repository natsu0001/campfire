import { useTheme } from "@/theme";
import { Text, View } from "react-native";

type Props = {
  title: string;
  description?: string;
};

export default function EmptyState({
  title,
  description,
}: Props) {
  const theme = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing["2xl"],
      }}
    >
      <Text
        style={{
          color: theme.colors.text,
          ...theme.typography.h3,
        }}
      >
        {title}
      </Text>

      {description && (
        <Text
          style={{
            color: theme.colors.textMuted,
            marginTop: theme.spacing.sm,
            textAlign: "center",
            ...theme.typography.body,
          }}
        >
          {description}
        </Text>
      )}
    </View>
  );
}