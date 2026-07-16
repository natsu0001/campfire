import { useLocalSearchParams } from "expo-router";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    View,
} from "react-native";

import { Screen, Text } from "@/components/ui";
import { useAuthStore } from "@/store/auth.store";
import { useTheme } from "@/theme";

import MessageBubble from "@/features/messages/components/MessageBubble";
import MessageInput from "@/features/messages/components/MessageInput";

import { useMessages } from "@/features/messages/hooks/useMessages";
import { useSendMessage } from "@/features/messages/hooks/useSendMessage";

export default function ChatScreen() {
  const { id } = useLocalSearchParams();

  const conversationId = id as string;

  const user = useAuthStore((s) => s.user);

  const { colors } = useTheme();

  const { data = [] } = useMessages(conversationId);

  const sendMessage = useSendMessage();

  const handleSend = (text: string) => {
    if (!user) return;

    sendMessage.mutate({
      conversationId,
      senderId: user.id,
      content: text,
    });
  };

  return (
    <Screen style={{ paddingBottom: 0 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingVertical: 16,
          }}
          renderItem={({ item }) => (
            <MessageBubble
    message={item.content ?? ""}
    isMine={item.sender_id === user?.id}
/>
          )}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 60,
              }}
            >
              <Text
                variant="body"
                style={{
                  color: colors.textSecondary,
                }}
              >
                Say hello 👋
              </Text>
            </View>
          }
        />

        <MessageInput
    loading={sendMessage.isPending}
    onSend={(text) =>
        sendMessage.mutate({
            conversationId,
            senderId: user!.id,
            content: text,
        })
    }
/>
      </KeyboardAvoidingView>
    </Screen>
  );
}