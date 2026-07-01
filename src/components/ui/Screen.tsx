import { useTheme } from "@/theme";
import { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenProps = {
  children: ReactNode;
  scroll?: boolean;
};

export default function Screen({
  children,
  scroll = false,
}: ScreenProps) {
  const theme = useTheme();

  if (scroll) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
      >
        <ScrollView
          contentContainerStyle={{
            padding: theme.spacing.lg,
          }}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          flex: 1,
          padding: theme.spacing.lg,
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}