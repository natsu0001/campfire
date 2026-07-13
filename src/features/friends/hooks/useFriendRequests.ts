import { useQuery } from "@tanstack/react-query";

import { friendService } from "@/services/friend.service";

export function useFriendRequests(userId: string) {
  return useQuery({
    queryKey: ["friendRequests", userId],
    queryFn: () => friendService.getFriendRequests(userId),
    enabled: !!userId,
  });
}