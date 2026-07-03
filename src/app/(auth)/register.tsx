import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";

import { Button, Input, Screen, Text } from "@/components/ui";
import { useAuthStore } from "@/store/auth.store";
import {
  RegisterForm,
  registerSchema,
} from "@/validation/auth.schema";

export default function RegisterScreen() {
  const signUp = useAuthStore((s) => s.signUpWithEmail);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterForm) {
    try {
      await signUp(data.email, data.password);

      router.replace("/(auth)/username");
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <Screen centered keyboard>
      <Text
        variant="display"
        style={{
          textAlign: "center",
          marginBottom: 48,
        }}
      >
        Create Account
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange } }) => (
          <Input
            label="Email"
            value={value}
            onChangeText={onChange}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange } }) => (
          <Input
            label="Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            error={errors.password?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { value, onChange } }) => (
          <Input
            label="Confirm Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            error={errors.confirmPassword?.message}
          />
        )}
      />

      <Button
        title="Create Account"
        loading={isSubmitting}
        onPress={handleSubmit(onSubmit)}
      />

      <Link href="/(auth)/login" asChild>
        <Text
          variant="bodySmall"
          style={{
            textAlign: "center",
            marginTop: 24,
          }}
        >
          Already have an account? Login
        </Text>
      </Link>
    </Screen>
  );
}