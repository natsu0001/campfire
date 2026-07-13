import { View } from "react-native";

import { Text } from "@/components/ui";
import { useTheme } from "@/theme";

interface Props {
  name: string;
  username: string;
}

export default function FriendCard({
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
    </View>
  );
}