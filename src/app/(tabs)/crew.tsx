import { router } from "expo-router";

import {
  Button,
  Screen,
  Text,
} from "@/components/ui";

export default function CrewScreen() {
  return (
    <Screen centered>
      <Text
        variant="display"
        style={{
          marginBottom: 20,
        }}
      >
        Crew
      </Text>

      <Button
        title="Find Friends"
        onPress={() =>
          router.push("/search-users")
        }
      />
    </Screen>
  );
}