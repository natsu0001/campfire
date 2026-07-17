import {
  Button,
  Input,
} from "@/components/ui";
import { SendHorizontal } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

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
     paddingHorizontal: 16,
     paddingVertical: 12,
     gap: 10,
  }}
>
  <View style={{ flex: 1 }}>
    <Input
      style={{
    borderRadius: 24,
    minHeight: 48,
     }}
      value={text}
      onChangeText={setText}
      placeholder="Type a message..."
    />
  </View>

      <Button
  size="icon"
  loading={sendMessage.isPending}
    icon={
    <SendHorizontal
      size={20}
      color="#fff"
    />
  }
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