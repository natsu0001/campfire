import { Pressable, View } from "react-native";

import { Text } from "@/components/ui";
import { useTheme } from "@/theme";

interface Props {
  name: string;
  username: string;
  onPress: () => void;
}

export default function ConversationCard({
  name,
  username,
  onPress,
}: Props) {
  const { colors, spacing, radius } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: colors.surface,
        padding: spacing.lg,
        borderRadius: radius.lg,
        marginBottom: spacing.md,
      }}
    >
      <View>
        <Text variant="h3">
          {name}
        </Text>

        <Text variant="caption">
          @{username}
        </Text>
      </View>
    </Pressable>
  );
}