import { View } from "react-native";

import { Post } from "../types";
import { PostCard } from "./PostCard";

interface Props {
  posts: Post[];
}

export function PostList({ posts }: Props) {
  return (
    <View>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </View>
  );
}