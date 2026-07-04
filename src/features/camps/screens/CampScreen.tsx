import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";

import { Screen, Text } from "@/components/ui";
import { useTheme } from "@/theme";

import { useCamp } from "../hooks/useCamp";

export default function CampScreen() {
  const { colors } = useTheme();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { data: camp, isLoading } = useCamp(id);

  if (isLoading) {
    return (
      <Screen centered>
        <ActivityIndicator
          color={colors.primary}
          size="large"
        />
      </Screen>
    );
  }

  if (!camp) {
    return (
      <Screen centered>
        <Text variant="h2">Camp not found</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text variant="display">
        {camp.name}
      </Text>

      {camp.description ? (
        <Text
          variant="body"
          style={{ marginTop: 16 }}
        >
          {camp.description}
        </Text>
      ) : (
        <Text
          variant="bodySmall"
          style={{ marginTop: 16 }}
        >
          No description yet.
        </Text>
      )}
    </Screen>
  );
}