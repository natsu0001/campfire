import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";

import { Button, Screen, Text } from "@/components/ui";
import { PostList } from "@/features/posts/components/PostList";
import { usePosts } from "@/features/posts/hooks/usePosts";
import { useTheme } from "@/theme";

import { useCamp } from "../hooks/useCamp";

export default function CampScreen() {
  const { colors, spacing } = useTheme();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { data: camp, isLoading } = useCamp(id);

  const { data: posts = [] } = usePosts(id);

  if (isLoading) {
    return (
      <Screen centered>
        <ActivityIndicator
          color={colors.primary}
          size="large"
        />
      </Screen>
    );
  }

  if (!camp) {
    return (
      <Screen centered>
        <Text variant="h2">Camp not found</Text>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <Text variant="display">
        {camp.name}
      </Text>

      {camp.description ? (
        <Text
          variant="body"
          style={{
            marginTop: spacing.md,
          }}
        >
          {camp.description}
        </Text>
      ) : (
        <Text
          variant="bodySmall"
          style={{
            marginTop: spacing.md,
          }}
        >
          No description yet.
        </Text>
      )}

      <Button
        title="New Post"
        onPress={() =>
          router.push({
            pathname: "/create-post",
            params: {
              campId: camp.id,
            },
          })
        }
      />

      <Text
        variant="h2"
        style={{
          marginTop: spacing.xl,
          marginBottom: spacing.md,
        }}
      >
        Posts
      </Text>

      <PostList posts={posts} />
    </Screen>
  );
}