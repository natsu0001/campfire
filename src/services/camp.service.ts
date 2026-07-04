import { supabase } from "@/lib/supabase";

export const campService = {
  async getCamps(userId: string) {
    return supabase
      .from("camp_members")
      .select(
        `
        role,
        camps (
          id,
          owner_id,
          name,
          description,
          is_private,
          created_at,
          updated_at
        )
      `
      )
      .eq("user_id", userId);
  },

 async createCamp(
  name: string,
  description: string
) {
  return supabase.rpc("create_camp", {
    p_name: name,
    p_description: description,
    p_is_private: false,
  });
  
},
async getCampById(id: string) {
  return supabase
    .from("camps")
    .select("*")
    .eq("id", id)
    .single();
}

};