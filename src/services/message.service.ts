import {
  Conversation,
  Message
} from "@/features/messages/types";

import { supabase } from "@/lib/supabase";

export const messageService = {
async getConversations(userId: string) {
  const { data, error } = await supabase.rpc(
    "get_conversations",
    {
      p_user: userId,
    }
  );

  if (error) throw error;

  return data as Conversation[];
},
async getOrCreateConversation(
  currentUserId: string,
  friendId: string
) {
  console.log("===== CREATE DIRECT CONVERSATION =====");

  console.log("CURRENT USER:", currentUserId);
  console.log("FRIEND:", friendId);

  const { data, error } = await supabase.rpc(
    "create_direct_conversation",
    {
      p_current_user: currentUserId,
      p_friend: friendId,
    }
  );

  console.log("RPC RESULT:", data);
  console.log("RPC ERROR:", error);

  if (error) throw error;

  return data as string;
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
    })
    .select(`
      *,
      sender:profiles!messages_sender_id_fkey(
        id,
        username,
        display_name,
        avatar_url
      )
    `)
    .single();

  console.log("MESSAGE:", data);
  console.log("ERROR:", error);

  if (error) throw error;

  return data;
},
async getConversationDetails(
  conversationId: string,
  currentUserId: string
) {
  const { data, error } = await supabase
    .from("conversation_members")
    .select(`
      user_id,
      profiles(
        id,
        username,
        display_name,
        avatar_url
      )
    `)
    .eq("conversation_id", conversationId)
    .neq("user_id", currentUserId);

  console.log("DETAILS DATA:", data);
  console.log("DETAILS ERROR:", error);

  if (error) throw error;

  return data?.[0] ?? null;
},



};