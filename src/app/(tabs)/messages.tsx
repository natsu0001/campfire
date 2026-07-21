import { router } from "expo-router";
import { FlatList } from "react-native";

import {
  EmptyState,
  Screen,
  Text,
} from "@/components/ui";

import ConversationCard from "@/features/messages/components/ConversationCard";
import ConversationSkeleton from "@/features/messages/components/ConversationSkeleton";
import { useConversations } from "@/features/messages/hooks/useConversations";

import { useAuthStore } from "@/store/auth.store";

export default function MessagesScreen() {
  const user = useAuthStore((s) => s.user);

  const {
    data = [],
    isLoading,
  } = useConversations(user?.id ?? "");

  if (isLoading) {
    return (
      <Screen style={{ padding: 16 }}>
        <ConversationSkeleton />
        <ConversationSkeleton />
        <ConversationSkeleton />
        <ConversationSkeleton />
      </Screen>
    );
  }

  return (
    <Screen>
      <Text
        variant="display"
        style={{ marginBottom: 24 }}
      >
        Messages
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.conversation_id}
        ListEmptyComponent={
          <EmptyState
            title="No conversations yet"
            description="Start chatting with your crew."
          />
        }
        renderItem={({ item }) => (
          <ConversationCard
            name={item.display_name}
            username={item.username}
            avatarUrl={item.avatar_url}
            lastMessage={item.last_message}
            lastMessageTime={item.last_message_time}
            onPress={() =>
              router.push({
                pathname: "/chat/[id]",
                params: {
                  id: item.conversation_id,
                  name: item.display_name,
                  username: item.username,
                  avatar: item.avatar_url ?? "",
                },
              })
            }
          />
        )}
      />
    </Screen>
  );
}