import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export function useReadReceipts(conversationId: string) {
  const [reads, setReads] = useState<any[]>([]);

  useEffect(() => {
    if (!conversationId) return;

    async function loadReads() {
      const { data } = await supabase
        .from("conversation_reads")
        .select("*")
        .eq("conversation_id", conversationId);

      setReads(data ?? []);
    }

    loadReads();

    const channel = supabase
      .channel(`reads-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversation_reads",
          filter: `conversation_id=eq.${conversationId}`,
        },
        () => {
          loadReads();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  return { reads };
}