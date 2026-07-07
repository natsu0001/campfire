import { useState } from "react";

import {
    Button,
    Input,
} from "@/components/ui";

import { useAuthStore } from "@/store/auth.store";

import { useCreateComment } from "../hooks/useCreateComment";

interface Props {
  postId: string;
}

export function CommentInput({
  postId,
}: Props) {
  const user = useAuthStore((s) => s.user);

  const mutation = useCreateComment();

  const [content, setContent] = useState("");

  async function handleSend() {
    if (!user) return;

    const text = content.trim();

    if (!text) return;

    await mutation.mutateAsync({
      postId,
      authorId: user.id,
      content: text,
    });

    setContent("");
  }

  return (
    <>
      <Input
        label="Comment"
        value={content}
        onChangeText={setContent}
      />

      <Button
        title="Send"
        loading={mutation.isPending}
        onPress={handleSend}
      />
    </>
  );
}