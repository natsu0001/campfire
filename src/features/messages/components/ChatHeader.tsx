import { Text } from "@/components/ui";
import { View } from "react-native";

interface Props {
  name: string;
  username: string;
  avatarUrl?: string;
  online?: boolean;
  typing?: boolean;
}

export default function ChatHeader({
  name,
  username,
  online = false,
  typing = false,
}: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#222",
      }}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: "#444",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 12,
        }}
      >
        <Text>{name.charAt(0).toUpperCase()}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text variant="h3">{name}</Text>

        <Text variant="caption">
          {typing
            ? "Typing..."
            : online
            ? "Online"
            : `@${username}`}
        </Text>
      </View>
    </View>
  );
}