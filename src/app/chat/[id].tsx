import { useLocalSearchParams } from "expo-router";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

import { Screen, Text } from "@/components/ui";
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <Screen style={{ flex: 1 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageBubble message={item} />
          )}
          contentContainerStyle={{
            padding: 16,
          }}
          ListEmptyComponent={
            <Text
              style={{
                textAlign: "center",
                marginTop: 24,
              }}
            >
              Say hello 👋
            </Text>
          }
        />

        <MessageInput conversationId={id} />
      </Screen>
    </KeyboardAvoidingView>
  );
}