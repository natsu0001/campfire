import { View } from "react-native";

import { Button, Text } from "@/components/ui";
import { useTheme } from "@/theme";

import { FriendRequest } from "../types";

import { useAcceptFriendRequest } from "../hooks/useAcceptFriendRequest";
import { useRejectFriendRequest } from "../hooks/useRejectFriendRequest";

interface Props {
  request: FriendRequest;
}

export default function FriendRequestCard({
  request,
}: Props) {
  const { colors, spacing, radius } = useTheme();

  const acceptMutation = useAcceptFriendRequest();
  const rejectMutation = useRejectFriendRequest();

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        padding: spacing.lg,
        marginBottom: spacing.md,
      }}
    >
      <Text variant="h3">
        {request.sender.display_name}
      </Text>

      <Text
        variant="caption"
        style={{
          marginBottom: spacing.lg,
        }}
      >
        @{request.sender.username}
      </Text>

      <View
        style={{
          flexDirection: "row",
          gap: spacing.md,
        }}
      >
        <View style={{ flex: 1 }}>
          <Button
            title="Accept"
            loading={acceptMutation.isPending}
            onPress={() =>
              acceptMutation.mutate(request.id)
            }
          />
        </View>

        <View style={{ flex: 1 }}>
          <Button
            title="Reject"
            loading={rejectMutation.isPending}
            onPress={() =>
              rejectMutation.mutate(request.id)
            }
          />
        </View>
      </View>
    </View>
  );
}