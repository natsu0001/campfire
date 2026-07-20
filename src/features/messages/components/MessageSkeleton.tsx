import { View } from "react-native";

import { Skeleton } from "@/components/ui";
import { useTheme } from "@/theme";

export default function MessageSkeleton() {
  const { spacing } = useTheme();

  return (
    <View
      style={{
        paddingHorizontal: spacing.md,
        marginVertical: spacing.sm,
      }}
    >
      <Skeleton
        width="70%"
        height={40}
        radius={20}
      />
    </View>
  );
}