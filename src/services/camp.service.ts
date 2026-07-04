import { supabase } from "@/lib/supabase";

export const campService = {
  async getCamps() {
    return supabase
      .from("camps")
      .select("*")
      .order("created_at", {
        ascending: false,
      });
  },

  async createCamp(
    ownerId: string,
    name: string,
    description: string
  ) {
    return supabase
      .from("camps")
      .insert({
        owner_id: ownerId,
        name,
        description,
      })
      .select()
      .single();
  },
};