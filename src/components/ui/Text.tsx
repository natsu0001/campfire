import {
    Text as RNText,
    TextProps as RNTextProps,
    StyleSheet,
} from "react-native";

import { typography } from "@/theme/tokens/typography";
import { useTheme } from "@/theme/useTheme";

type Variant = keyof typeof typography;

interface TextProps extends RNTextProps {
  variant?: Variant;
  color?: string;
}

export function Text({
  variant = "body",
  color,
  style,
  children,
  ...props
}: TextProps) {
  const theme = useTheme();

  return (
    <RNText
      {...props}
      style={[
        styles.base,
        typography[variant],
        {
          color: color ?? theme.colors.text,
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});