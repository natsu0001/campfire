import { useMutation, useQueryClient } from "@tanstack/react-query";

import { friendService } from "@/services/friend.service";

export function useRejectFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: friendService.rejectFriendRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["friendRequests"],
      });
    },
  });
}