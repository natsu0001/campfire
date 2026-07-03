import { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { useTheme } from "@/theme";

interface ScreenProps extends PropsWithChildren {
  scroll?: boolean;
  keyboard?: boolean;
  centered?: boolean;
}

export function Screen({
  children,
  scroll = false,
  keyboard = false,
  centered = false,
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
          behavior={Platform.OS === "ios" ? "padding" : undefined}
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