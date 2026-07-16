import { View } from "react-native";

import { Text } from "@/components/ui";
import { useTheme } from "@/theme";

interface Props {
  message: string;
  isMine: boolean;
  time?: string;
}

export default function MessageBubble({
  message,
  isMine,
  time,
}: Props) {
  const { colors, spacing, radius } = useTheme();

  return (
    <View
      style={{
        alignSelf: isMine ? "flex-end" : "flex-start",
        maxWidth: "80%",
        marginBottom: spacing.md,
      }}
    >
      <View
        style={{
          backgroundColor: isMine
            ? colors.primary
            : colors.surface,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          borderRadius: radius.xl,
        }}
      >
        <Text
          style={{
            color: isMine
              ? colors.background
              : colors.text,
          }}
        >
          {message}
        </Text>
      </View>

      {time && (
        <Text
          variant="caption"
          style={{
            marginTop: spacing.xs,
            textAlign: isMine
              ? "right"
              : "left",
          }}
        >
          {time}
        </Text>
      )}
    </View>
  );
}