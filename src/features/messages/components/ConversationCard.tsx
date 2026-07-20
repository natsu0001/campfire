import { Pressable, View } from "react-native";

import { Text } from "@/components/ui";
import { useTheme } from "@/theme";

interface Props {
  name: string;
  username: string;
  avatarUrl?: string | null;
  lastMessage?: string | null;
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
  <View
    style={{
      width: 52,
      height: 52,
      borderRadius: 26,
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

  <View style={{ flex: 1 }}>
    <Text variant="h3">{name}</Text>

    <Text
      variant="caption"
      numberOfLines={1}
    >
      {lastMessage ?? `@${username}`}
    </Text>
  </View>
</Pressable>
  );
}