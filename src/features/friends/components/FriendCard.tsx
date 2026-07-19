import { router } from "expo-router";
import { View } from "react-native";

import { Button, Text } from "@/components/ui";
import { useTheme } from "@/theme";

import { useGetOrCreateConversation } from "@/features/messages/hooks/useGetOrCreateConversation";
import { useAuthStore } from "@/store/auth.store";

interface Props {
  id: string;
  name: string;
  username: string;
}

export default function FriendCard({
  id,
  name,
  username,
}: Props) {
  const { colors, spacing, radius } = useTheme();

  const user = useAuthStore((s) => s.user);

  const conversation = useGetOrCreateConversation();

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        padding: spacing.lg,
        borderRadius: radius.lg,
        marginBottom: spacing.md,
      }}
    >
      <Text variant="h3">{name}</Text>

      <Text variant="caption">
        @{username}
      </Text>

      <Button
  title="Chat"
  loading={conversation.isPending}
  onPress={() => {
    if (!user) return;

    console.log("Chat button pressed");

    conversation.mutate(
      {
        currentUserId: user.id,
        friendId: id,
      },
      {
        onSuccess(conversationId) {
  console.log("Conversation ID:", conversationId);

  console.log("Friend:");
  console.log({
    id,
    name,
    username,
  });

  router.push({
    pathname: "/chat/[id]",
    params: {
      id: conversationId,
      name,
      username,
      avatar: "",
    },
  });
},

        onError(error) {
          console.log(
            "Conversation Error:",
            error
          );
        },
      }
    );
  }}
/>
    </View>
  );
}