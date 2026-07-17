import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { FlatList, View } from "react-native";

import { Screen, Text } from "@/components/ui";

import MessageBubble from "@/features/messages/components/MessageBubble";
import MessageInput from "@/features/messages/components/MessageInput";
import { useMessages } from "@/features/messages/hooks/useMessages";

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data = [], isLoading } = useMessages(id);

  const flatListRef = useRef<FlatList>(null);

  if (isLoading) {
    return (
      <Screen centered>
        <Text>Loading...</Text>
      </Screen>
    );
  }

  return (
    <Screen keyboard>
      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageBubble message={item} />
          )}
          contentContainerStyle={{
            paddingBottom: 16,
          }}
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