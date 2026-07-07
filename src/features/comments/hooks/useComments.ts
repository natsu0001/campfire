import { useQuery } from "@tanstack/react-query";

import { commentService } from "@/services/comment.service";

export function useComments(postId?: string) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => commentService.getComments(postId!),
    enabled: !!postId,
  });
}