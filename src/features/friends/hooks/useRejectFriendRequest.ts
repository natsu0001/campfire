import { friendService } from "@/services/friend.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRejectFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      friendService.rejectFriendRequest(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["friendRequests"],
      });

      queryClient.invalidateQueries({
        queryKey: ["relationships"],
      });
    },
  });
}