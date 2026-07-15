import { useMutation, useQueryClient } from "@tanstack/react-query";

import { messageService } from "@/services/message.service";

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversationId,
      senderId,
      content,
    }: {
      conversationId: string;
      senderId: string;
      content: string;
    }) =>
      messageService.sendMessage(
        conversationId,
        senderId,
        content
      ),

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: [
          "messages",
          variables.conversationId,
        ],
      });
    },
  });
}