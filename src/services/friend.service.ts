import { FriendUser } from "@/features/friends/types";
import { supabase } from "@/lib/supabase";
    
export const friendService = {
  async searchUsers(query: string, currentUserId: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .ilike("username", `%${query}%`)
      .neq("id", currentUserId)
      .limit(20);

    if (error) throw error;

    return data as FriendUser[];
  },

  async sendRequest(senderId: string, receiverId: string) {
    const { data, error } = await supabase
      .from("friends")
      .insert({
        sender_id: senderId,
        receiver_id: receiverId,
        status: "pending",
      })
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async getFriendRequests(userId: string) {
  const { data, error } = await supabase
    .from("friends")
    .select(`
      *,
      sender:profiles!friends_sender_id_fkey(
        id,
        username,
        display_name,
        avatar_url
      )
    `)
    .eq("receiver_id", userId)
    .eq("status", "pending");

  if (error) throw error;

  return data;
},
};