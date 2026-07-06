import { supabase } from "@/lib/supabase";

export const postService = {
  async getPosts(campId: string) {
    return supabase
      .from("posts")
      .select(`
        *,
        profiles (
          username,
          display_name,
          avatar_url
        )
      `)
      .eq("camp_id", campId)
      .order("created_at", {
        ascending: false,
      });
  },

  async createPost(
    campId: string,
    authorId: string,
    content: string
  ) {
    return supabase
      .from("posts")
      .insert({
        camp_id: campId,
        author_id: authorId,
        content,
      });
  },
};