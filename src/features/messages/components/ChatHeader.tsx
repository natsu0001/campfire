import { Text } from "@/components/ui";
import { View } from "react-native";

interface Props {
  name: string;
  username: string;
  avatarUrl?: string;
}

export default function ChatHeader({
  name,
  username,
}: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
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

      <View>
        <Text variant="h3">{name}</Text>
        <Text variant="caption">@{username}</Text>
      </View>
    </View>
  );
}