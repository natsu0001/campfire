import { useLocalSearchParams } from "expo-router";
import { FlatList } from "react-native";

import {
    Screen,
    Text,
} from "@/components/ui";

import MessageBubble from "@/features/messages/components/MessageBubble";
import MessageInput from "@/features/messages/components/MessageInput";
import { useMessages } from "@/features/messages/hooks/useMessages";

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const {
    data = [],
    isLoading,
  } = useMessages(id);

  if (isLoading) {
    return (
      <Screen centered>
        <Text>Loading...</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble message={item} />
        )}
      />

      <MessageInput
        conversationId={id}
      />
    </Screen>
  );
}