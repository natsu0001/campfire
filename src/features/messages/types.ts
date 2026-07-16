export interface Conversation {
  id: string;
  created_at: string;
  type: string;
}

export interface ConversationMember {
  conversation_id: string;
  user_id: string;
}

export interface ConversationListItem {
  conversation_id: string;

  conversations: Conversation;
}

export interface MessageSender {
  id: string;
  username: string;
 display_name: string;
  avatar_url: string | null;
}

export interface Message {
  id: string;

  conversation_id: string;

  sender_id: string;

  content: string | null;

  image_url: string | null;

  created_at: string;

  edited_at: string | null;

  sender: MessageSender;
}