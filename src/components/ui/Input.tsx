import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { useTheme } from "@/theme";

import { Text } from "./Text";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  noMargin?: boolean;
   containerStyle?: StyleProp<ViewStyle>;
}

export function Input({
  label,
  error,
  secureTextEntry,
  style,
  noMargin = false,
  containerStyle,
  ...props
}: InputProps) {
  const { colors, spacing, radius } = useTheme();

  const [hidden, setHidden] = useState(secureTextEntry);

  const styles = StyleSheet.create({
    container: {
        width: "100%",
      gap: spacing.sm,
    },

    inputWrapper: {
        width: "100%",
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: error ? colors.error : colors.border,
      borderRadius: radius.md,
      backgroundColor: colors.surface,
      paddingHorizontal: spacing.md,
      
      height: 56,
    },

    input: {
      flex: 1,
      color: colors.text,
      fontSize: 16,
    },

    error: {
      color: colors.error,
    },
  });

  return (
    <View
  style={[
    styles.inputWrapper,
    !noMargin && {
      marginBottom: spacing.md,
    },
    containerStyle,
  ]}
>
      {label && <Text variant="bodySmall">{label}</Text>}

      <View style={styles.inputWrapper}>
        <TextInput
          {...props}
          style={[styles.input, style]}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={hidden}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={() => setHidden(!hidden)}>
            {hidden ? (
              <Eye size={20} color={colors.textSecondary} />
            ) : (
              <EyeOff size={20} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {!!error && (
        <Text
          variant="caption"
          style={styles.error}
        >
          {error}
        </Text>
      )}
    </View>
  );
}