import { useMutation } from "@tanstack/react-query";

import { friendService } from "@/services/friend.service";

export function useSendFriendRequest() {
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
  });
}