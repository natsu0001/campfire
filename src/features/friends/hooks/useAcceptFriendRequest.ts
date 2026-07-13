import { useMutation, useQueryClient } from "@tanstack/react-query";

import { friendService } from "@/services/friend.service";

export function useAcceptFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: friendService.acceptFriendRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["friendRequests"],
      });

      queryClient.invalidateQueries({
        queryKey: ["friends"],
      });
    },
  });
}