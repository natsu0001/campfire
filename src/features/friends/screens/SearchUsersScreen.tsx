import { useState } from "react";
import { FlatList, View } from "react-native";

import {
  Button,
  Input,
  Screen,
  Text,
} from "@/components/ui";

import { useAuthStore } from "@/store/auth.store";

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
        renderItem={({ item }) => (
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

            <Button
  title="Add"
  loading={sendRequest.isPending}
  onPress={() => {
    console.log("ADD BUTTON PRESSED");

    if (!user) {
      console.log("NO USER");
      return;
    }

    console.log("Sender:", user.id);
    console.log("Receiver:", item.id);

    sendRequest.mutate({
      senderId: user.id,
      receiverId: item.id,
    });
  }}
/>
          </View>
        )}
      />
    </Screen>
  );
}