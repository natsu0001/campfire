import { Screen, Text } from "@/components/ui";
import { useTheme } from "@/theme";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useComments } from "../hooks/useComments";

import { usePost } from "@/features/posts/hooks/usePost";


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

    {comments.length === 0 ? (
      <Text variant="body">
        No comments yet.
      </Text>
    ) : (
      comments.map((comment) => (
        <Text
          key={comment.id}
          variant="body"
          style={{
            marginBottom: 12,
          }}
        >
          <Text variant="h3">
            {comment.profiles.display_name}
          </Text>
          {"\n"}
          {comment.content}
        </Text>
      ))
    )}
  </Screen>
);
}