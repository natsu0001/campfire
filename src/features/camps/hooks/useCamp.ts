import { useQuery } from "@tanstack/react-query";

import { campService } from "@/services/camp.service";

export function useCamp(id: string) {
  return useQuery({
    queryKey: ["camp", id],
    queryFn: async () => {
      const { data, error } =
        await campService.getCampById(id);

      if (error) throw error;

      return data;
    },
  });
}