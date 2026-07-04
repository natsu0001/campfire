import { FlatList } from "react-native";

import { Camp } from "@/types/camp";

import { CampCard } from "./CampCard";
import { EmptyState } from "./EmptyState";

interface Props {
  camps: Camp[];
}

export function CampList({ camps }: Props) {
  return (
    <FlatList
      data={camps}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CampCard camp={item} />
      )}
      ListEmptyComponent={<EmptyState />}
      contentContainerStyle={{
        padding: 20,
        flexGrow: 1,
      }}
    />
  );
}