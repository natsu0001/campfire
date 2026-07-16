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
        alignItems: "center",
        gap: 8,
      }}
    >
      <View style={{ flex: 1 }}>
        <Input
          value={text}
          placeholder="Type a message..."
          onChangeText={setText}
        />
      </View>

      <Button
        title="Send"
        loading={sendMessage.isPending}
        onPress={() => {
          if (!user || !text.trim()) return;

          sendMessage.mutate(
            {
              conversationId,
              senderId: user.id,
              content: text,
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