import {
    ConversationListItem,
    Message,
} from "@/features/messages/types";

import { supabase } from "@/lib/supabase";

export const messageService = {
  async getConversations(userId: string) {
  const { data, error } = await supabase
    .from("conversation_members")
    .select(`
      conversation_id,
      conversations(
        id,
        created_at,
        type
      )
    `)
    .eq("user_id", userId);

  if (error) throw error;

  return (data ?? []).map((item) => ({
    conversation_id: item.conversation_id,
    conversations: item.conversations[0],
  })) as ConversationListItem[];
},

 async getMessages(conversationId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select(`
      *,
      sender:profiles!messages_sender_id_fkey(
        id,
        username,
        display_name,
        avatar_url
      )
    `)
    .eq("conversation_id", conversationId)
    .order("created_at", {
      ascending: true,
    });

  if (error) throw error;

  return data as Message[];
},

  async sendMessage(
  conversationId: string,
  senderId: string,
  content: string
) {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: senderId,
      content,
      topic: "message",
      extension: "text",
    })
    .select()
    .single();

  if (error) throw error;

  return data;
},
};