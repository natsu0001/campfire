import { Screen, Text } from "@/components/ui";
import { useTheme } from "@/theme";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useComments } from "../hooks/useComments";

import { usePost } from "@/features/posts/hooks/usePost";
import { CommentInput } from "../components/CommentInput";
import { CommentList } from "../components/CommentList";
import { useCommentsRealtime } from "../hooks/useCommentsRealtime";
export default function PostDetailScreen() {
  const { colors } = useTheme();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const {
    data: post,
    isLoading,
  } = usePost(id);

  const {
    data: comments = [],
  } = useComments(id); // ✅ Hook is always called

  useCommentsRealtime(id);

  if (isLoading) {
    return (
      <Screen centered>
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </Screen>
    );
  }

  if (!post) {
    return (
      <Screen centered>
        <Text>Post not found</Text>
      </Screen>
    );
  }

return (
  <Screen scroll keyboard>
    <Text variant="h2">
      {post.profiles.display_name}
    </Text>

    <Text variant="caption">
      @{post.profiles.username}
    </Text>

    <Text
      variant="body"
      style={{
        marginTop: 16,
      }}
    >
      {post.content}
    </Text>

    <Text
      variant="h3"
      style={{
        marginTop: 32,
        marginBottom: 16,
      }}
    >
      Comments
    </Text>

    <CommentList comments={comments} />

    <CommentInput postId={post.id} />
  </Screen>
);
}