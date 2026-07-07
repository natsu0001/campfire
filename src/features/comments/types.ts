export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;

  profiles: {
    username: string;
    display_name: string;
    avatar_url: string | null;
  };
}