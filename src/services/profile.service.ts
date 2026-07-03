import { supabase } from "@/lib/supabase";

export const profileService = {
  async createProfile(username: string) {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) throw authError;

    if (!user) {
      throw new Error("No authenticated user found.");
    }

    return supabase.from("profiles").insert({
      id: user.id,
      username,
      display_name: username,
      avatar_url: null,
      bio: "",
    });
  },

  async getMyProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    return supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
  },
};