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

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

type Size =
  | "sm"
  | "md"
  | "lg"
  | "icon";

interface ButtonProps extends PressableProps {
  title?: string;

  icon?: React.ReactNode;

  loading?: boolean;

  variant?: Variant;

  size?: Size;

  fullWidth?: boolean;

  style?: StyleProp<ViewStyle>;
}

export function Button({
  title,
  icon,
  loading = false,
  variant = "primary",
  size = "lg",
  fullWidth = false,
  style: userStyle,
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
  styles[size],
  styles[variant],
  fullWidth && { width: "100%" },
  pressed && styles.pressed,
  (disabled || loading) && styles.disabled,
  userStyle,
]}
>
     {loading ? (
  <ActivityIndicator color="#fff" />
) : (
  <>
    {icon}

    {title && (
      <Text
        variant="button"
        style={styles.text}
      >
        {title}
      </Text>
    )}
  </>
)}
    </Pressable>
  );
}

const getStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    base: {
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  borderRadius: radius.lg,
  gap: spacing.sm,
},
sm: {
  height: 38,
  paddingHorizontal: spacing.md,
},

md: {
  height: 46,
  paddingHorizontal: spacing.lg,
},

lg: {
  height: 54,
  paddingHorizontal: spacing.xl,
},

icon: {
  width: 48,
  height: 48,
  borderRadius: 24,
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