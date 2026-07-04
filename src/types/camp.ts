export interface Camp {
  id: string;
  owner_id: string;

  name: string;
  description: string | null;

  is_private: boolean;

  created_at: string;
  updated_at: string;
}

export interface CampMember {
  id: string;

  camp_id: string;
  user_id: string;

  role: "owner" | "admin" | "member";

  joined_at: string;
}