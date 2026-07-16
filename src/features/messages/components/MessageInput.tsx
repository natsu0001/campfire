import { useState } from "react";
import { View } from "react-native";

import {
    Button,
    Input,
} from "@/components/ui";

import { useAuthStore } from "@/store/auth.store";

import { useSendMessage } from "../hooks/useSendMessage";

interface Props {
  conversationId: string;
}

export default function MessageInput({
  conversationId,
}: Props) {
  const user = useAuthStore((s) => s.user);

  const [text, setText] = useState("");

  const sendMessage = useSendMessage();

  return (
   <View
  style={{
    flexDirection: "row",
    alignItems: "flex-end",
    paddingVertical: 12,
    gap: 8,
  }}
>
  <View style={{ flex: 1 }}>
    <Input
      value={text}
      onChangeText={setText}
      placeholder="Type a message..."
    />
  </View>

      <Button
  title="Send"
  loading={sendMessage.isPending}
  disabled={!text.trim()}
  onPress={() => {
    if (!user) return;

    sendMessage.mutate(
      {
        conversationId,
        senderId: user.id,
        content: text.trim(),
      },
      {
        onSuccess() {
          setText("");
        },
      }
    );
  }}
/>
    </View>
  );
}