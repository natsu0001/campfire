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
async getOrCreateConversation(
  currentUserId: string,
  friendId: string
) {
  // 1. Get all conversations for current user
  const { data: myConversations, error } = await supabase
    .from("conversation_members")
    .select(`
      conversation_id,
      conversations(
        id,
        created_at,
        type
      )
    `)
    .eq("user_id", currentUserId);

  if (error) throw error;

  // 2. Check whether friend belongs to one of them
  for (const item of myConversations ?? []) {
    const { data: members } = await supabase
      .from("conversation_members")
      .select("user_id")
      .eq("conversation_id", item.conversation_id);

    const ids = members?.map((m) => m.user_id) ?? [];

    if (
      ids.includes(currentUserId) &&
      ids.includes(friendId) &&
      ids.length === 2
    ) {
      return item.conversation_id;
    }
  }

  // 3. Create conversation
  const { data: conversation, error: conversationError } =
    await supabase
      .from("conversations")
      .insert({
        type: "dm",
      })
      .select()
      .single();

  if (conversationError) throw conversationError;

  // 4. Add both members
  const { error: memberError } = await supabase
    .from("conversation_members")
    .insert([
      {
        conversation_id: conversation.id,
        user_id: currentUserId,
      },
      {
        conversation_id: conversation.id,
        user_id: friendId,
      },
    ]);

  if (memberError) throw memberError;

  return conversation.id;
},
};