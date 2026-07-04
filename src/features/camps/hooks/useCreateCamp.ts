import { useMutation, useQueryClient } from "@tanstack/react-query";

import { campService } from "@/services/camp.service";

export function useCreateCamp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      ownerId,
      name,
      description,
    }: {
      ownerId: string;
      name: string;
      description: string;
    }) =>
      campService.createCamp(
        ownerId,
        name,
        description
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["camps"],
      });
    },
  });
}