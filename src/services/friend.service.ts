import {
  Friend,
  FriendRequest,
  Profile,
} from "@/features/friends/types";
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

    return data as Profile[];
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
      sender:profiles!friends_user_one_fkey(
        id,
        username,
        display_name,
        avatar_url
      )
    `)
    .eq("receiver_id", userId)
    .eq("status", "pending");

  if (error) throw error;

  return data as FriendRequest[];
},

async acceptFriendRequest(id: string) {
  const { data, error } = await supabase
    .from("friends")
    .update({
      status: "accepted",
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
},
async rejectFriendRequest(id: string) {
  const { error } = await supabase
    .from("friends")
    .delete()
    .eq("id", id);

  if (error) throw error;
},
async getFriends(userId: string) {
  const { data, error } = await supabase
    .from("friends")
    .select(`
      *,
      sender:profiles!friends_user_one_fkey(
        id,
        username,
        display_name,
        avatar_url
      ),
      receiver:profiles!friends_user_two_fkey(
        id,
        username,
        display_name,
        avatar_url
      )
    `)
    .eq("status", "accepted")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);

  if (error) throw error;

  return data as Friend[];
},

async getRelationships(userId: string) {
  const { data, error } = await supabase
    .from("friends")
    .select("*")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);

  if (error) throw error;

  return data;
},
};