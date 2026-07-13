import { friendService } from "@/services/friend.service";
import { useMutation } from "@tanstack/react-query";

export function useSendFriendRequest() {
  return useMutation({
    mutationFn: ({
      senderId,
      receiverId,
    }: {
      senderId: string;
      receiverId: string;
    }) =>
      friendService.sendRequest(senderId, receiverId),

    onSuccess(data) {
      console.log("SUCCESS:", data);
    },

    onError(error) {
      console.log("MUTATION ERROR:", error);
    },
  });
}