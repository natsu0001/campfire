import { router } from "expo-router";
import { FlatList, View } from "react-native";

import {
  Button,
  Screen,
  Text,
} from "@/components/ui";

import { useAuthStore } from "@/store/auth.store";

import FriendCard from "@/features/friends/components/FriendCard";
import { useFriends } from "@/features/friends/hooks/useFriends";

export default function CrewScreen() {
  const user = useAuthStore((s) => s.user);

  const { data = [] } = useFriends(user?.id ?? "");

  return (
    <Screen>
      <Text
        variant="display"
        style={{ marginBottom: 24 }}
      >
        Crew
      </Text>

      <Text
        variant="h3"
        style={{ marginBottom: 12 }}
      >
        Friends
      </Text>

      <FlatList
  data={data}
  keyExtractor={(item) => item.id}
  ListEmptyComponent={
    <View
      style={{
        alignItems: "center",
        marginTop: 40,
      }}
    >
      <Text variant="h3">
        👥 No friends yet
      </Text>

      <Text
        variant="caption"
        style={{
          marginTop: 8,
          textAlign: "center",
        }}
      >
        Find friends to start chatting.
      </Text>
    </View>
  }
  renderItem={({ item }) => {
    const friend =
      item.sender.id === user?.id
        ? item.receiver
        : item.sender;

    return (
      <FriendCard
        name={friend.display_name}
        username={friend.username}
      />
    );
  }}
/>

      <Button
        title="Friend Requests"
        onPress={() =>
          router.push("/friend-requests")
        }
      />

      <Button
        title="Find Friends"
        onPress={() =>
          router.push("/search-users")
        }
      />
    </Screen>
  );
}