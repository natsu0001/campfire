import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

import { radius } from "@/theme/tokens/radius";
import { spacing } from "@/theme/tokens/spacing";
import { useTheme } from "@/theme/useTheme";

import { Text } from "./Text";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";

interface ButtonProps extends PressableProps {
  title: string;
  loading?: boolean;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  title,
  loading = false,
  variant = "primary",
  style:userStyle,
  disabled,
  ...props
}: ButtonProps) {
  const theme = useTheme();

  const styles = getStyles(theme);

  return (
 <Pressable
  {...props}
  disabled={disabled || loading}
  style={({ pressed }) => [
    styles.base,
    styles[variant],
    pressed && styles.pressed,
    (disabled || loading) && styles.disabled,
    userStyle,
  ]}
>
      {loading ? (
        <ActivityIndicator color={styles.text.color} />
      ) : (
        <Text
          variant="button"
          style={styles.text}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const getStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    base: {
      
      height: 54,
      borderRadius: radius.lg,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: spacing.lg,
      marginVertical: spacing.sm,
    },

    primary: {
      backgroundColor: theme.colors.primary,
    },

    secondary: {
      backgroundColor: theme.colors.surface,
    },

    outline: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    ghost: {
      backgroundColor: "transparent",
    },

    danger: {
      backgroundColor: theme.colors.error,
    },

    text: {
      color: "#FFFFFF",
    },

    pressed: {
      opacity: 0.8,
    },

    disabled: {
      opacity: 0.5,
    },
  });