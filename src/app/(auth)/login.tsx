import { Button, Input, Screen, Text } from "@/components/ui";
import { useAuthStore } from "@/store/auth.store";
import {
  LoginForm,
  loginSchema,
} from "@/validation/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";

export default function LoginScreen() {
  const signIn = useAuthStore((s) => s.signInWithEmail);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginForm) {
  try {
    await signIn(data.email, data.password);

    router.replace("/(tabs)/camp");
  } catch (err: any) {
    alert(err.message);
  }
}

  return (
    <Screen centered keyboard>
      <Text
        variant="display"
        style={{
          marginBottom: 48,
          textAlign: "center",
        }}
      >
        Campfire
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Email"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            error={errors.password?.message}
          />
        )}
      />

      <Button
        title="Login"
        fullWidth
        loading={isSubmitting}
        onPress={handleSubmit(onSubmit)}
      />
      
<Link href="/(auth)/register" asChild>
  <Text
    variant="bodySmall"
    style={{
      textAlign: "center",
      marginTop: 24,
    }}
  >
    Don't have an account? Register
  </Text>
</Link>


    </Screen>
  );
}