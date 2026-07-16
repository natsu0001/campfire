import { router } from "expo-router";
import { View } from "react-native";

import { Button, Text } from "@/components/ui";
import { useTheme } from "@/theme";

interface Props {
  id: string;
  name: string;
  username: string;
}

export default function FriendCard({
  id,
  name,
  username,
}: Props) {
  const { colors, spacing, radius } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        padding: spacing.lg,
        borderRadius: radius.lg,
        marginBottom: spacing.md,
      }}
    >
      <Text variant="h3">{name}</Text>

      <Text variant="caption">
        @{username}
      </Text>

      <Button
        title="Chat"
        onPress={() => router.push(`/chat/${id}`)}
      />
    </View>
  );
}