import { supabase } from "@/lib/supabase";

export const campService = {
  async getCamps() {
    return supabase
      .from("camps")
      .select("*")
      .order("created_at", { ascending: false });
  },

  async createCamp(
    ownerId: string,
    name: string,
    description: string
  ) {
    const { data: camp, error } = await supabase
      .from("camps")
      .insert({
        owner_id: ownerId,
        name,
        description,
      })
      .select()
      .single();

    if (error) throw error;

    await supabase.from("camp_members").insert({
      camp_id: camp.id,
      user_id: ownerId,
      role: "owner",
    });

    return camp;
  },
};