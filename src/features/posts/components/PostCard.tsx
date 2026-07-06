import { View } from "react-native";

import { Text } from "@/components/ui";
import { useTheme } from "@/theme";

import { Pressable } from "react-native";
import { Post } from "../types";

import { useAuthStore } from "@/store/auth.store";

import { useLikePost } from "../hooks/useLikePost";

interface Props {
  post: Post;
}

export function PostCard({ post }: Props) {
  const { colors, radius, spacing } = useTheme();
  const user = useAuthStore((s) => s.user);

const likeMutation = useLikePost();

const liked =
  post.post_likes.some(
    (like) => like.user_id === user?.id
  );

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
<Pressable
  style={{
    marginTop: spacing.md,
  }}
  onPress={() => {
    if (!user) return;

    likeMutation.mutate({
      liked,
      postId: post.id,
      userId: user.id,
      campId: post.camp_id,
    });
  }}
>
  <Text variant="body">
    {liked ? "❤️" : "🤍"} {post.post_likes.length}
  </Text>
</Pressable>
    </View>
  );
}