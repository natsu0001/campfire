import { useQuery } from "@tanstack/react-query";

import { friendService } from "@/services/friend.service";

export function useRelationships(userId: string) {
  return useQuery({
    queryKey: ["relationships", userId],
    queryFn: () => friendService.getRelationships(userId),
    enabled: !!userId,
  });
}