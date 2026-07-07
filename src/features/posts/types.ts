export interface Post {
  id: string;

  camp_id: string;

  author_id: string;

  content: string;

  created_at: string;

  updated_at: string;

  profiles: {
    username: string;
    display_name: string;
    avatar_url: string | null;
  };

  post_likes: {
    user_id: string;
  }[];
  comments: {
  id: string;
}[];
}