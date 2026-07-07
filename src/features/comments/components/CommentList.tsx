import { FlatList } from "react-native";

import { Text } from "@/components/ui";

import { Comment } from "../types";
import { CommentCard } from "./CommentCard";

interface Props {
  comments: Comment[];
}

export function CommentList({
  comments,
}: Props) {
  if (comments.length === 0) {
    return (
      <Text
        variant="body"
        style={{
          marginTop: 24,
        }}
      >
        No comments yet.
      </Text>
    );
  }

  return (
    <FlatList
      data={comments}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CommentCard comment={item} />
      )}
      scrollEnabled={false}
    />
  );
}