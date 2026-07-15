import { useQuery } from "@tanstack/react-query";

import { messageService } from "@/services/message.service";

export function useConversations(userId: string) {
  return useQuery({
    queryKey: ["conversations", userId],

    queryFn: () =>
      messageService.getConversations(userId),

    enabled: !!userId,
  });
}