import { useMutation, useQueryClient } from "@tanstack/react-query";

import { friendService } from "@/services/friend.service";

export function useSendFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      senderId,
      receiverId,
    }: {
      senderId: string;
      receiverId: string;
    }) =>
      friendService.sendRequest(
        senderId,
        receiverId
      ),

    onSuccess(_, variables) {
      // Refresh relationships so Add -> Pending
      queryClient.invalidateQueries({
        queryKey: ["relationships", variables.senderId],
      });

      // Refresh search results if needed
      queryClient.invalidateQueries({
        queryKey: ["searchUsers"],
      });

      // Refresh friend requests for the receiver
      queryClient.invalidateQueries({
        queryKey: ["friendRequests", variables.receiverId],
      });

      console.log("Friend request sent!");
    },

    onError(error) {
      console.log("MUTATION ERROR:", error);
    },
  });
}