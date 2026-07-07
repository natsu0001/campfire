import { View } from "react-native";

import { Text } from "@/components/ui";
import { useTheme } from "@/theme";

import { Comment } from "../types";

interface Props {
  comment: Comment;
}

export function CommentCard({ comment }: Props) {
  const { colors, spacing, radius } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        padding: spacing.md,
        marginBottom: spacing.md,
      }}
    >
      <Text variant="h3">
        {comment.profiles.display_name}
      </Text>

      <Text variant="caption">
        @{comment.profiles.username}
      </Text>

      <Text
        variant="body"
        style={{
          marginTop: spacing.sm,
        }}
      >
        {comment.content}
      </Text>
    </View>
  );
}