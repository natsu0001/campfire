import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postService } from "@/services/post.service";

export function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      liked,
      postId,
      userId,
      campId,
    }: {
      liked: boolean;
      postId: string;
      userId: string;
      campId: string;
    }) =>
      liked
        ? postService.unlikePost(postId, userId)
        : postService.likePost(postId, userId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["posts", variables.campId],
      });
    },
  });
}