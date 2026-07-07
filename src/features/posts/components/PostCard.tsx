import { router } from "expo-router";
import { Pressable, View } from "react-native";

import { Text } from "@/components/ui";
import { useTheme } from "@/theme";

import { useAuthStore } from "@/store/auth.store";

import { useLikePost } from "../hooks/useLikePost";
import { Post } from "../types";

interface Props {
  post: Post;
}

export function PostCard({ post }: Props) {
  const { colors, radius, spacing } = useTheme();

  const user = useAuthStore((s) => s.user);

  const likeMutation = useLikePost();

  const liked = post.post_likes.some(
    (like) => like.user_id === user?.id
  );

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/post/[id]",
          params: {
            id: post.id,
          },
        })
      }
    >
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

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: spacing.md,
          }}
        >
          <Pressable
            onPress={(e) => {
              e.stopPropagation();

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

          <Text variant="body">
            💬 {post.comments?.length ?? 0}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}