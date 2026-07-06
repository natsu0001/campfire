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
  ),
  post_likes (
    user_id
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
  const { data, error } = await supabase
    .from("posts")
    .insert({
      camp_id: campId,
      author_id: authorId,
      content,
    })
    .select()
    .single();

  console.log("INSERT DATA:", data);
  console.log("INSERT ERROR:", error);

  if (error) throw error;

  return data;
},
async likePost(postId: string, userId: string) {
  return supabase
    .from("post_likes")
    .insert({
      post_id: postId,
      user_id: userId,
    });
},

async unlikePost(postId: string, userId: string) {
  return supabase
    .from("post_likes")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId);
},


};

