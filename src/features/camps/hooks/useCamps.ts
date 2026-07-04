import { useQuery } from "@tanstack/react-query";

import { campService } from "@/services/camp.service";

export function useCamps() {
  return useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const { data, error } = await campService.getCamps();

      if (error) throw error;

      return data;
    },
  });
}