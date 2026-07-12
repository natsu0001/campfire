import { useQuery } from "@tanstack/react-query";

import { friendService } from "@/services/friend.service";

export function useSearchUsers(
  query: string,
  userId: string
) {
  return useQuery({
    queryKey: ["search-users", query],

    queryFn: () =>
      friendService.searchUsers(query, userId),

    enabled: query.length > 1,
  });
}