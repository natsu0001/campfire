import { router } from "expo-router";
import { useState } from "react";

import {
    Button,
    Input,
    Screen,
    Text,
} from "@/components/ui";

import { useAuthStore } from "@/store/auth.store";
import { useCreateCamp } from "../hooks/useCreateCamp";

export default function CreateCampScreen() {
  const user = useAuthStore((s) => s.user);

  const mutation = useCreateCamp();

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  async function handleCreate() {
    if (!user) return;

    await mutation.mutateAsync({
      ownerId: user.id,
      name,
      description,
    });

    router.back();
  }

  return (
    <Screen keyboard>
      <Text
        variant="display"
        style={{ marginBottom: 32 }}
      >
        Create Camp
      </Text>

      <Input
        label="Camp Name"
        value={name}
        onChangeText={setName}
      />

      <Input
        label="Description"
        value={description}
        onChangeText={setDescription}
      />

      <Button
        title="Create"
        onPress={handleCreate}
        loading={mutation.isPending}
      />
    </Screen>
  );
}