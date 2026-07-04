import { ActivityIndicator } from "react-native";

import { Screen, Text } from "@/components/ui";
import { useTheme } from "@/theme";

import { CampList } from "../components/CampList";
import { useCamps } from "../hooks/useCamps";

export function CampFeed() {
  const { colors } = useTheme();

  const {
    data = [],
    isLoading,
  } = useCamps();

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

  return (
    <Screen>
      <Text
        variant="display"
        style={{
          margin: 20,
        }}
      >
        Camps
      </Text>

      <CampList camps={data} />
    </Screen>
  );
}