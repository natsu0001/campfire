import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

import {
  Button,
  Input,
  Screen,
  Text,
} from "@/components/ui";

import { useAuthStore } from "@/store/auth.store";
import { useCreatePost } from "../hooks/useCreatePost";

export default function CreatePostScreen() {
  const { campId } = useLocalSearchParams<{
    campId: string;
  }>();

  const user = useAuthStore((s) => s.user);

  const mutation = useCreatePost();

  const [content, setContent] = useState("");

async function handlePublish() {
  console.log("===== CREATE POST =====");
  console.log("User:", user);
  console.log("Camp ID:", campId);

  if (!user) {
    console.log("No authenticated user.");
    return;
  }

  const text = content.trim();

  if (!text) {
    console.log("Content is empty.");
    return;
  }

  try {
    const result = await mutation.mutateAsync({
      campId,
      authorId: user.id,
      content: text,
    });

    console.log("SUCCESS:", result);

    setContent("");

    router.back();
  } catch (error) {
    console.log("POST ERROR:");
    console.log(error);
  }
}

  return (
    <Screen keyboard>
      <Text
        variant="display"
        style={{
          marginBottom: 24,
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
        loading={mutation.isPending}
        onPress={handlePublish}
      />
    </Screen>
  );
}