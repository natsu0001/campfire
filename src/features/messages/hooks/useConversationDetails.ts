import { useQuery } from "@tanstack/react-query";

import { messageService } from "@/services/message.service";

export function useConversationDetails(
  conversationId: string,
  currentUserId: string
) {
  return useQuery({
    queryKey: [
      "conversation-details",
      conversationId,
    ],

    queryFn: () =>
      messageService.getConversationDetails(
        conversationId,
        currentUserId
      ),

    enabled: !!conversationId,
  });
}