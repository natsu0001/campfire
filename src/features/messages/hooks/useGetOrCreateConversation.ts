import { useMutation } from "@tanstack/react-query";

import { messageService } from "@/services/message.service";

export function useGetOrCreateConversation() {
  return useMutation({
    mutationFn: ({
      currentUserId,
      friendId,
    }: {
      currentUserId: string;
      friendId: string;
    }) =>
      messageService.getOrCreateConversation(
        currentUserId,
        friendId
      ),
  });
}