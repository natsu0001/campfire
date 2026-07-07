import { useQuery } from "@tanstack/react-query";

import { postService } from "@/services/post.service";

export function usePost(id: string) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => postService.getPost(id),
    enabled: !!id,
  });
}