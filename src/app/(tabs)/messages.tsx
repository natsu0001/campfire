import { router } from "expo-router";
import { FlatList } from "react-native";

import { Screen, Text } from "@/components/ui";

import { useAuthStore } from "@/store/auth.store";

import { useFriends } from "@/features/friends/hooks/useFriends";
import ConversationCard from "@/features/messages/components/ConversationCard";

export default function MessagesScreen() {
  const user = useAuthStore((s) => s.user);

  const { data = [] } = useFriends(user?.id ?? "");

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
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text>No conversations yet.</Text>
        }
        renderItem={({ item }) => {
          const friend =
            item.sender.id === user?.id
              ? item.receiver
              : item.sender;

          return (
            <ConversationCard
              name={friend.display_name}
              username={friend.username}
              onPress={() =>
                router.push({
                  pathname: "/chat/[id]",
                  params: {
                    id: item.id,
                  },
                })
              }
            />
          );
        }}
      />
    </Screen>
  );
}