import { Pressable, View } from "react-native";

import { Text } from "@/components/ui";
import { useTheme } from "@/theme";

interface Props {
  name: string;
  username: string;
  avatarUrl?: string | null;
  lastMessage?: string |null;
  lastMessageTime?: string | null;
  onPress: () => void;
}

export default function ConversationCard({
  name,
  username,
  avatarUrl,
  lastMessage,
  lastMessageTime,
  onPress,
}: Props) {
  const { colors, spacing, radius } = useTheme();

  const formattedTime = lastMessageTime
    ? new Date(lastMessageTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.surface,
        padding: spacing.lg,
        borderRadius: radius.lg,
        marginBottom: spacing.md,
      }}
    >
      {/* Avatar */}
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: colors.primary,
          justifyContent: "center",
          alignItems: "center",
          marginRight: spacing.md,
        }}
      >
        <Text variant="h3">
          {name.charAt(0).toUpperCase()}
        </Text>
      </View>

      {/* Text */}
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text variant="h3">{name}</Text>

          <Text variant="caption">
            {formattedTime}
          </Text>
        </View>

        <Text
          variant="caption"
          numberOfLines={1}
          style={{
            color: colors.textSecondary,
            marginTop: 2,
          }}
        >
          {lastMessage || "Start chatting..."}
        </Text>
      </View>
    </Pressable>
  );
}