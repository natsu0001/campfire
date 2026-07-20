import {
    DimensionValue,
    StyleProp,
    View,
    ViewStyle,
} from "react-native";

import { useTheme } from "@/theme";

interface SkeletonProps {
  width?: DimensionValue;
  height?: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}

export function Skeleton({
  width = "100%",
  height = 16,
  radius,
  style,
}: SkeletonProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius: radius ?? height / 2,
          backgroundColor: colors.surface,
          opacity: 0.6,
        },
        style,
      ]}
    />
  );
}