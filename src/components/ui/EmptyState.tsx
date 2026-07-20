import { useTheme } from "@/theme";
import { ReactNode } from "react";
import { Text, View } from "react-native";

type Props = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
};

export default function EmptyState({
  title,
  description,
  icon,
  action,
}: Props) {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing["2xl"],
      }}
    >
      {icon}

      <Text
        style={{
          marginTop: icon ? theme.spacing.lg : 0,
          color: theme.colors.text,
          textAlign: "center",
          ...theme.typography.h3,
        }}
      >
        {title}
      </Text>

      {description && (
        <Text
          style={{
            color: theme.colors.textMuted,
            marginTop: theme.spacing.sm,
            textAlign: "center",
            ...theme.typography.body,
          }}
        >
          {description}
        </Text>
      )}

      {action && (
        <View
          style={{
            marginTop: theme.spacing.xl,
            width: "100%",
          }}
        >
          {action}
        </View>
      )}
    </View>
  );
}