import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { FlatList, View } from "react-native";

import { Screen, Text } from "@/components/ui";

import ChatHeader from "@/features/messages/components/ChatHeader";
import MessageBubble from "@/features/messages/components/MessageBubble";
import MessageInput from "@/features/messages/components/MessageInput";
import { useMessages } from "@/features/messages/hooks/useMessages";

export default function ChatScreen() {
  const {
    id,
    name,
    username,
    avatar,
  } = useLocalSearchParams<{
    id: string;
    name?: string;
    username?: string;
    avatar?: string;
  }>();
console.log("CHAT PARAMS");
console.log({
  id,
  name,
  username,
  avatar,
});
  const flatListRef = useRef<FlatList>(null);

  const {
    data: messages = [],
    isLoading,
  } = useMessages(id);

  useEffect(() => {
    if (!messages.length) return;

    requestAnimationFrame(() => {
      flatListRef.current?.scrollToEnd({
        animated: true,
      });
    });
  }, [messages]);

  if (isLoading) {
    return (
      <Screen centered>
        <Text>Loading...</Text>
      </Screen>
    );
  }

  return (
    <Screen keyboard style={{ padding: 0 }}>
      <View style={{ flex: 1 }}>
        <ChatHeader
          name={name || "Unknown"}
          username={username || ""}
          avatarUrl={avatar || ""}
        />

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageBubble message={item} />
          )}
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({
              animated: true,
            })
          }
        />

        <MessageInput conversationId={id} />
      </View>
    </Screen>
  );
}