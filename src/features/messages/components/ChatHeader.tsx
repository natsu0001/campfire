import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, View } from "react-native";

import { Text } from "@/components/ui";
import { useTheme } from "@/theme";

interface Props {
  name: string;
  username: string;
}

export default function ChatHeader({
  name,
  username,
}: Props) {
  const { colors, spacing } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.background,
      }}
    >
      <Pressable onPress={() => router.back()}>
        <ArrowLeft
          size={24}
          color={colors.text}
        />
      </Pressable>

      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: colors.surface,
          marginLeft: spacing.md,
          marginRight: spacing.md,
        }}
      />

      <View style={{ flex: 1 }}>
        <Text variant="h3">{name}</Text>

        <Text variant="caption">
          @{username}
        </Text>
      </View>
    </View>
  );
}