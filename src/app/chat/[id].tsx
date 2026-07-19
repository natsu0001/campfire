import { Screen, Text } from "@/components/ui";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { FlatList, View } from "react-native";

import MessageBubble from "@/features/messages/components/MessageBubble";
import MessageInput from "@/features/messages/components/MessageInput";
import { useMessages } from "@/features/messages/hooks/useMessages";

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();
  const flatListRef = useRef<FlatList>(null);

  const {
    data = [],
    isLoading,
  } = useMessages(id);

  useEffect(() => {
  if (!data.length) return;

  requestAnimationFrame(() => {
    flatListRef.current?.scrollToEnd({
      animated: true,
    });
  });
}, [data]);

  if (isLoading) {
    return (
      <Screen centered>
        <Text>Loading...</Text>
      </Screen>
    );
  }

  return (
    <Screen
      keyboard
      style={{ padding: 0 }}
    >
      <View style={{ flex: 1 }}>
       <FlatList
  ref={flatListRef}
  style={{ flex: 1 }}
  data={data}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <MessageBubble message={item} />
  )}
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