import {
  Button,
  Input,
} from "@/components/ui";
import { SendHorizontal } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

import { useAuthStore } from "@/store/auth.store";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSendMessage } from "../hooks/useSendMessage";

interface Props {
  conversationId: string;
    onTyping?: () => void | Promise<void>;
  onStopTyping?: () => void | Promise<void>;
}
export default function MessageInput({
  conversationId, onTyping, onStopTyping,
}: Props) {
  const user = useAuthStore((s) => s.user);
const insets = useSafeAreaInsets();
  const [text, setText] = useState("");

  const sendMessage = useSendMessage();

  return (
   <View
  style={{
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: Math.max(insets.bottom, 10),

    gap: 10,

    borderTopWidth: 1,
    borderTopColor: "#333",

    backgroundColor: "#111",
  }}
>
  <View style={{ flex: 1 }}>
    <Input
     containerStyle={{
    borderRadius: 24,
    height: 48,
  }}
     noMargin
      value={text}
      onChangeText={(value) => {
  setText(value);
  onTyping?.();
}}
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
       onSuccess: async () => {
  setText("");

  await onStopTyping?.();
},
      }
    );
  }}
/>
    </View>
  );
}