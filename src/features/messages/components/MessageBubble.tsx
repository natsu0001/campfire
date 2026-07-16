import { View } from "react-native";

import { Text } from "@/components/ui";
import { useAuthStore } from "@/store/auth.store";
import { useTheme } from "@/theme";

import { Message } from "../types";

interface Props {
  message: Message;
}

export default function MessageBubble({
  message,
}: Props) {
  const user = useAuthStore((s) => s.user);

  const { colors, spacing, radius } = useTheme();

  const isMine = message.sender_id === user?.id;

  return (
    <View
      style={{
        alignSelf: isMine ? "flex-end" : "flex-start",
        backgroundColor: isMine
          ? colors.primary
          : colors.surface,
        padding: spacing.md,
        borderRadius: radius.lg,
        marginVertical: spacing.xs,
        maxWidth: "80%",
      }}
    >
      {!isMine && (
        <Text
          variant="caption"
          style={{
            marginBottom: 4,
            color: colors.primary,
          }}
        >
          {message.sender.display_name}
        </Text>
      )}

      <Text
        style={{
          color: isMine
            ? "#fff"
            : colors.text,
        }}
      >
        {message.content}
      </Text>
    </View>
  );
}