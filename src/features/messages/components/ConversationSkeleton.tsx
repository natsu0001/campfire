import { View } from "react-native";

import { Skeleton } from "@/components/ui";
import { useTheme } from "@/theme";

export default function ConversationSkeleton() {
  const { spacing } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: spacing.md,
      }}
    >
      <Skeleton
        width={56}
        height={56}
        radius={28}
      />

      <View
        style={{
          flex: 1,
          marginLeft: spacing.md,
        }}
      >
        <Skeleton
          width="45%"
          height={18}
        />

        <Skeleton
          width="80%"
          height={14}
          style={{
            marginTop: spacing.sm,
          }}
        />
      </View>
    </View>
  );
}