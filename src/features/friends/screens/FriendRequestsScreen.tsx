import { FlatList, View } from "react-native";

import { Screen, Text } from "@/components/ui";
import { useAuthStore } from "@/store/auth.store";

import FriendRequestCard from "../components/FriendRequestCard";
import { useFriendRequests } from "../hooks/useFriendRequests";

export default function FriendRequestsScreen() {
  const user = useAuthStore((s) => s.user);

  const {
    data = [],
    isLoading,
    error,
  } = useFriendRequests(user?.id ?? "");

  if (isLoading) {
    return (
      <Screen centered>
        <Text>Loading...</Text>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen centered>
        <Text>Something went wrong.</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text
        variant="display"
        style={{ marginBottom: 24 }}
      >
        Friend Requests
      </Text>

     <FlatList
  data={data}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <FriendRequestCard request={item} />
  )}
  ListEmptyComponent={
    <View
      style={{
        alignItems: "center",
        marginTop: 40,
      }}
    >
      <Text variant="h3">
        📨 No pending requests
      </Text>

      <Text
        variant="caption"
        style={{
          marginTop: 8,
          textAlign: "center",
        }}
      >
        New friend requests will appear here.
      </Text>
    </View>
  }
/>
    </Screen>
  );
}