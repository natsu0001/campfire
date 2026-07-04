import { Button, Screen, Text } from "@/components/ui";
import { useTheme } from "@/theme";
import { router } from "expo-router";
import { ActivityIndicator, View } from "react-native";
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
      <View
  style={{
    margin: 20,
    gap: 16,
  }}
>
  <Text variant="display">
    Camps
  </Text>

  <Button
    title="Create Camp"
    onPress={() => router.push("/create-camp")}
  />
</View>

<CampList camps={data} />
    </Screen>
  );
}