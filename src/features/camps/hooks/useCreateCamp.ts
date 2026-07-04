import { useMutation, useQueryClient } from "@tanstack/react-query";

import { campService } from "@/services/camp.service";

export function useCreateCamp() {
  const queryClient = useQueryClient();

  return useMutation({
   mutationFn: ({
  name,
  description,
}: {
  name: string;
  description: string;
}) =>
  campService.createCamp(name, description),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["camps"],
      });
    },
  });
}