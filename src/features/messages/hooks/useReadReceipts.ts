import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export function useReadReceipts(conversationId: string) {
  const [reads, setReads] = useState<any[]>([]);

  useEffect(() => {
    if (!conversationId) return;

    async function loadReads() {
      const { data, error } = await supabase
        .from("conversation_reads")
        .select("*")
        .eq("conversation_id", conversationId);

      if (error) {
        console.log(error);
        return;
      }

      setReads(data ?? []);
    }

    loadReads();
  }, [conversationId]);

  return {
    reads,
  };
}