import { useQuery } from "@tanstack/react-query";

import { campService } from "@/services/camp.service";
import { useAuthStore } from "@/store/auth.store";

export function useCamps() {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: ["camps", user?.id],

    enabled: !!user,

    queryFn: async () => {
      const { data, error } = await campService.getCamps(
        user!.id
      );

      if (error) throw error;

      return (
        data?.map((item: any) => item.camps).filter(Boolean) ??
        []
      );
    },
  });
}