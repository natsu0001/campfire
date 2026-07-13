import { FlatList } from "react-native";

import { Screen, Text } from "@/components/ui";

import { useAuthStore } from "@/store/auth.store";

import FriendRequestCard from "../components/FriendRequestCard";
import { useFriendRequests } from "../hooks/useFriendRequests";

export default function FriendRequestsScreen() {
  const user = useAuthStore((s) => s.user);

  const { data = [] } = useFriendRequests(user?.id ?? "");

  return (
    <Screen>
      <Text variant="display">
        Friend Requests
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FriendRequestCard request={item} />
        )}
      />
    </Screen>
  );
}