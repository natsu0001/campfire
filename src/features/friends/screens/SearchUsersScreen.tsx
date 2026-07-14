import { useState } from "react";
import { FlatList, View } from "react-native";

import {
  Button,
  Input,
  Screen,
  Text,
} from "@/components/ui";

import { useAuthStore } from "@/store/auth.store";

import { useRelationships } from "../hooks/useRelationships";
import { useSearchUsers } from "../hooks/useSearchUsers";
import { useSendFriendRequest } from "../hooks/useSendFriendRequest";

export default function SearchUsersScreen() {
  const user = useAuthStore((s) => s.user);

  const [query, setQuery] = useState("");

  const {
    data: users = [],
    isLoading,
  } = useSearchUsers(
    query,
    user?.id ?? ""
  );

  const {
    data: relationships = [],
  } = useRelationships(user?.id ?? "");

  const sendRequest = useSendFriendRequest();

  return (
    <Screen>
      <Text
        variant="display"
        style={{
          marginBottom: 24,
        }}
      >
        Add Friends
      </Text>

      <Input
        label="Search username"
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          !isLoading ? (
            <Text
              style={{
                marginTop: 32,
                textAlign: "center",
              }}
            >
              Search for a username
            </Text>
          ) : null
        }
        renderItem={({ item }) => {
          const relationship = relationships.find(
            (r) =>
              (r.sender_id === user?.id &&
                r.receiver_id === item.id) ||
              (r.receiver_id === user?.id &&
                r.sender_id === item.id)
          );

          const isPending =
            relationship?.status === "pending";

          const isFriend =
            relationship?.status === "accepted";

          return (
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text variant="h3">
                  {item.display_name}
                </Text>

                <Text variant="caption">
                  @{item.username}
                </Text>
              </View>

              {isFriend ? (
                <Button
                  title="Friends"
                  disabled
                />
              ) : isPending ? (
                <Button
                  title="Pending"
                  disabled
                />
              ) : (
                <Button
                  title="Add"
                  loading={sendRequest.isPending}
                  onPress={() => {
                    if (!user) return;

                    sendRequest.mutate({
                      senderId: user.id,
                      receiverId: item.id,
                    });
                  }}
                />
              )}
            </View>
          );
        }}
      />
    </Screen>
  );
}