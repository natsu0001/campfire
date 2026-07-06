import { useQuery } from "@tanstack/react-query";

import { postService } from "@/services/post.service";

export function usePosts(campId: string) {
  return useQuery({
    queryKey: ["posts", campId],

    queryFn: async () => {
      const { data, error } =
        await postService.getPosts(campId);

      if (error) throw error;

      return data;
    },
  });
}