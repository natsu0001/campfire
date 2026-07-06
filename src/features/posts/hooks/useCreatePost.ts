import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postService } from "@/services/post.service";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      campId,
      authorId,
      content,
    }: {
      campId: string;
      authorId: string;
      content: string;
    }) =>
      postService.createPost(
        campId,
        authorId,
        content
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["posts", variables.campId],
      });
    },
  });
}