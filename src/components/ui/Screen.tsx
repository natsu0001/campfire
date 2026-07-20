import { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import {
  SafeAreaView,
} from "react-native-safe-area-context";

import { useTheme } from "@/theme";

interface ScreenProps extends PropsWithChildren {
  scroll?: boolean;
  keyboard?: boolean;
  centered?: boolean;
  style?: ViewStyle;
}

export function Screen({
  children,
  scroll = false,
  keyboard = false,
  centered = false,
  style,
}: ScreenProps) {
  const { colors, spacing } = useTheme();

  const content = scroll ? (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1,
        padding: spacing.lg,
      }}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
   <View
  style={[
    {
      flex: 1,
      padding: spacing.lg,
    },
    centered && {
      justifyContent: "center",
      alignItems: "center",
    },
     style,
  ]}
>
  {children}
</View>
  );

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      {keyboard ? (
        <KeyboardAvoidingView
  style={styles.flex}
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  keyboardVerticalOffset={0}
>
  {content}
</KeyboardAvoidingView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  flex: {
    flex: 1,
  },
});