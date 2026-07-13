import { View } from "react-native";

import { Text } from "@/components/ui";
import { useTheme } from "@/theme";

import { FriendUser } from "../types";

interface Props {
  request: FriendUser;
}

export default function FriendRequestCard({
  request,
}: Props) {
  const { colors, spacing, radius } = useTheme();

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

      <Text variant="caption">
        @{request.sender.username}
      </Text>
    </View>
  );
}