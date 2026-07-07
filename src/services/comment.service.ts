import { supabase } from "@/lib/supabase";

export const commentService = {
  async getComments(postId: string) {
    const { data, error } = await supabase
      .from("comments")
      .select(`
        *,
        profiles(
          username,
          display_name,
          avatar_url
        )
      `)
      .eq("post_id", postId)
      .order("created_at", {
        ascending: true,
      });

    if (error) throw error;

    return data;
  },

  async createComment(
    postId: string,
    authorId: string,
    content: string
  ) {
    const { data, error } = await supabase
      .from("comments")
      .insert({
        post_id: postId,
        author_id: authorId,
        content,
      })
      .select()
      .single();

    if (error) throw error;

    return data;
  },
};