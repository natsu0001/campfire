export interface Profile {
  id: string;

  username: string;

  display_name: string;

  avatar_url: string | null;
}

export interface FriendRequest {
  id: string;

  sender_id: string;

  receiver_id: string;

  status: string;

  created_at: string;

  sender: Profile;
}

export interface Friend {
  id: string;

  sender_id: string;

  receiver_id: string;

  status: string;

  created_at: string;

  sender: Profile;

  receiver: Profile;
}