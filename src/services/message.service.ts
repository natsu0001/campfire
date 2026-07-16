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
async getOrCreateConversation(
  currentUserId: string,
  friendId: string
) {
  // Get every conversation the current user belongs to
  const { data: memberships, error } = await supabase
    .from("conversation_members")
    .select("conversation_id")
    .eq("user_id", currentUserId);

  if (error) throw error;

  if (memberships.length) {
    const ids = memberships.map((m) => m.conversation_id);

    // Check if friend belongs to any of those conversations
    const { data: friendMemberships, error: memberError } =
      await supabase
        .from("conversation_members")
        .select("conversation_id")
        .eq("user_id", friendId)
        .in("conversation_id", ids);

    if (memberError) throw memberError;

    if (friendMemberships.length) {
      return friendMemberships[0].conversation_id;
    }
  }

  // Create conversation
  const { data: conversation, error: createError } =
    await supabase
      .from("conversations")
      .insert({
        type: "direct",
      })
      .select()
      .single();

  if (createError) throw createError;

  // Add members
  const { error: membersError } = await supabase
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

  if (membersError) throw membersError;

  return conversation.id;
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