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
  console.log("===== GET OR CREATE CONVERSATION =====");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("AUTH USER:", user?.id);
  console.log("CURRENT USER:", currentUserId);
  console.log("FRIEND:", friendId);

  // Existing conversations
  const { data: memberships, error } = await supabase
    .from("conversation_members")
    .select("conversation_id")
    .eq("user_id", currentUserId);

  console.log("MEMBERSHIPS:", memberships);
  console.log("MEMBERSHIPS ERROR:", error);

  if (error) throw error;

  if (memberships.length > 0) {
    const ids = memberships.map((m) => m.conversation_id);

    console.log("CONVERSATION IDS:", ids);

    const {
      data: friendMemberships,
      error: memberError,
    } = await supabase
      .from("conversation_members")
      .select("conversation_id")
      .eq("user_id", friendId)
      .in("conversation_id", ids);

    console.log(
      "FRIEND MEMBERSHIPS:",
      friendMemberships
    );
    console.log(
      "FRIEND MEMBERSHIPS ERROR:",
      memberError
    );

    if (memberError) throw memberError;

    if (
      friendMemberships &&
      friendMemberships.length > 0
    ) {
      console.log(
        "FOUND EXISTING CONVERSATION:",
        friendMemberships[0].conversation_id
      );

      return friendMemberships[0].conversation_id;
    }
  }

  console.log("NO CONVERSATION FOUND");
  console.log("CREATING NEW CONVERSATION...");

  // ===========================
  // INSERT ONLY
  // ===========================

  const { error: insertError } = await supabase
    .from("conversations")
    .insert({
      type: "direct",
    });

  console.log("INSERT ERROR:", insertError);

  if (insertError) throw insertError;

  console.log("INSERT SUCCESS");

  // ===========================
  // FETCH LATEST
  // ===========================

  const {
    data: conversation,
    error: fetchError,
  } = await supabase
    .from("conversations")
    .select("id")
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .single();

  console.log("LATEST:", conversation);
  console.log("FETCH ERROR:", fetchError);

  if (fetchError) throw fetchError;

  console.log("ADDING MEMBERS...");

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

  console.log("MEMBERS ERROR:", membersError);

  if (membersError) throw membersError;

  console.log(
    "SUCCESS!",
    conversation.id
  );

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