import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentService } from "@/services/comment.service";

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      authorId,
      content,
    }: {
      postId: string;
      authorId: string;
      content: string;
    }) =>
      commentService.createComment(
        postId,
        authorId,
        content
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });

      queryClient.invalidateQueries({
        queryKey: ["post", variables.postId],
      });
    },
  });
}