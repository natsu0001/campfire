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