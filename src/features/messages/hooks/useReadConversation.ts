import { supabase } from "@/lib/supabase";

interface Params {
  conversationId: string;
  userId: string;
  lastMessageId: string;
}

export async function markConversationRead({
  conversationId,
  userId,
  lastMessageId,
}: Params) {

  console.log("UPSERT");
  console.log({
    conversationId,
    userId,
    lastMessageId,
  });

  const { error } = await supabase
    .from("conversation_reads")
    .upsert(
      {
        conversation_id: conversationId,
        user_id: userId,
        last_read_message_id: lastMessageId,
        last_read_at: new Date().toISOString(),
      },
      {
        onConflict: "conversation_id,user_id",
      }
    );

  console.log("READ ERROR", error);
}