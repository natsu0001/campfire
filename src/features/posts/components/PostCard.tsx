import { View } from "react-native";

import { Text } from "@/components/ui";
import { useTheme } from "@/theme";

import { Post } from "../types";

interface Props {
  post: Post;
}

export function PostCard({ post }: Props) {
  const { colors, radius, spacing } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        padding: spacing.lg,
        marginTop: spacing.md,
      }}
    >
      <Text variant="h3">
        {post.profiles.display_name}
      </Text>

      <Text variant="caption">
        @{post.profiles.username}
      </Text>

      <Text
        variant="body"
        style={{
          marginTop: spacing.md,
        }}
      >
        {post.content}
      </Text>
    </View>
  );
}