import { useState } from "react";
import { View } from "react-native";

import { Button, Input } from "@/components/ui";
import { useTheme } from "@/theme";

interface Props {
  onSend: (text: string) => void;
  loading?: boolean;
}

export default function MessageInput({
  onSend,
  loading,
}: Props) {
  const { spacing } = useTheme();

  const [message, setMessage] = useState("");

  function handleSend() {
    const text = message.trim();

    if (!text) return;

    onSend(text);

    setMessage("");
  }

  return (
    <View
      style={{
        flexDirection: "row",
        gap: spacing.md,
        alignItems: "flex-end",
      }}
    >
      <View style={{ flex: 1 }}>
        <Input
          placeholder="Message..."
          value={message}
          onChangeText={setMessage}
        />
      </View>

      <Button
        title="Send"
        loading={loading}
        onPress={handleSend}
      />
    </View>
  );
}