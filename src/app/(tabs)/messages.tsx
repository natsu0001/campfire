import { router } from "expo-router";
import { FlatList } from "react-native";

import { Screen, Text } from "@/components/ui";

import { useAuthStore } from "@/store/auth.store";

import ConversationCard from "@/features/messages/components/ConversationCard";
import { useConversations } from "@/features/messages/hooks/useConversations";

export default function MessagesScreen() {
  const user = useAuthStore((s) => s.user);

const {
  data = [],
  isLoading,
} = useConversations(user?.id ?? "");

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