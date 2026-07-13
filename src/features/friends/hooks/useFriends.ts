import { useQuery } from "@tanstack/react-query";

import { friendService } from "@/services/friend.service";

export function useFriends(userId: string) {
  return useQuery({
    queryKey: ["friends", userId],
    queryFn: () => friendService.getFriends(userId),
    enabled: !!userId,
  });
}