import { Pressable, StyleSheet } from "react-native";

import { Text } from "@/components/ui";
import { useTheme } from "@/theme";
import { Camp } from "@/types/camp";

interface Props {
  camp: Camp;
  onPress?: () => void;
}

export function CampCard({ camp, onPress }: Props) {
  const { colors, radius, spacing } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderRadius: radius.lg,
          padding: spacing.lg,
        },
      ]}
    >
      <Text variant="h3">{camp.name}</Text>

      {!!camp.description && (
        <Text
          variant="bodySmall"
          style={{
            marginTop: spacing.sm,
          }}
        >
          {camp.description}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
});