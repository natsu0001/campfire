import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

import { Button, Input, Screen, Text } from "@/components/ui";

import { useAuthStore } from "@/store/auth.store";

import { useCreatePost } from "../hooks/useCreatePost";

export default function CreatePostScreen() {
  const { campId } = useLocalSearchParams<{
    campId: string;
  }>();

  const user = useAuthStore((s) => s.user);

  const mutation = useCreatePost();

  const [content, setContent] = useState("");

  async function handlePost() {
    if (!user) return;

    if (!content.trim()) return;

    await mutation.mutateAsync({
      campId,
      authorId: user.id,
      content,
    });

    router.back();
  }

  return (
    <Screen keyboard>
      <Text
        variant="display"
        style={{
          marginBottom: 32,
        }}
      >
        New Post
      </Text>

      <Input
        label="What's happening?"
        multiline
        value={content}
        onChangeText={setContent}
      />

      <Button
        title="Publish"
        onPress={handlePost}
        loading={mutation.isPending}
      />
    </Screen>
  );
}