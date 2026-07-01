import { useTheme } from "@/theme";
import { ReactNode } from "react";
import { View } from "react-native";

type Props = {
  children: ReactNode;
};

export default function Card({ children }: Props) {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.sm,
      }}
    >
      {children}
    </View>
  );
}