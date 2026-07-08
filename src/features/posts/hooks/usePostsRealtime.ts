import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { supabase } from "@/lib/supabase";

export function usePostsRealtime(campId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!campId) return;

    const channel = supabase
      .channel(`posts:${campId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
          filter: `camp_id=eq.${campId}`,
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["posts", campId],
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [campId, queryClient]);
}