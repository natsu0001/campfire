import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { FlatList, Keyboard, TouchableWithoutFeedback, View, } from "react-native";

import { EmptyState, Screen } from "@/components/ui";
import ChatHeader from "@/features/messages/components/ChatHeader";
import MessageBubble from "@/features/messages/components/MessageBubble";
import MessageInput from "@/features/messages/components/MessageInput";
import MessageSkeleton from "@/features/messages/components/MessageSkeleton";
import { useMessages } from "@/features/messages/hooks/useMessages";
import { usePresence } from "@/features/messages/hooks/usePresence";
import { markConversationRead } from "@/features/messages/hooks/useReadConversation";
import { useRealtimeMessages } from "@/features/messages/hooks/useRealtimeMessages";
import { useAuthStore } from "@/store/auth.store";
export default function ChatScreen() {

  const {
    id,
    name,
    username,
    avatar,
  } = useLocalSearchParams<{
    id: string;
    name?: string;
    username?: string;
    avatar?: string;
  }>();
    const user = useAuthStore((s) => s.user);

const {
  onlineUsers,
  typingUsers,
  startTyping,
  stopTyping,
} = usePresence(
  id,
  user?.id ?? ""
);

console.log("CHAT PARAMS");
console.log("ONLINE USERS:", onlineUsers);
console.log("TYPING USERS:", typingUsers);
console.log({
  id,
  name,
  username,
  avatar,
});
  const flatListRef = useRef<FlatList>(null);

  const {
    data: messages = [],
    isLoading,
  } = useMessages(id);
  useRealtimeMessages(id);

useEffect(() => {
  if (!user) return;
  if (!messages.length) return;

  const lastMessage = messages[messages.length - 1];

  // Don't update when you send your own message
  if (lastMessage.sender_id === user.id) return;

  markConversationRead({
    conversationId: id,
    userId: user.id,
    lastMessageId: lastMessage.id,
  });
}, [messages, user?.id, id]);

useEffect(() => {
    if (!messages.length) return;

    setTimeout(() => {
        flatListRef.current?.scrollToEnd({
            animated: true,
        });
    }, 100);
}, [messages]);

  if (isLoading) {
    return (
     <Screen>
      <MessageSkeleton />
      <MessageSkeleton />
      <MessageSkeleton />
      <MessageSkeleton />
      <MessageSkeleton />
    </Screen>
    );
  }

  return (
    <Screen keyboard style={{ padding: 0 }}>
      <TouchableWithoutFeedback
onPress={Keyboard.dismiss}
accessible={false}
>
      <View style={{ flex: 1 }}>
<ChatHeader
  name={name || "Unknown"}
  username={username || ""}
  avatarUrl={avatar || ""}
  online={
    !!user &&
    onlineUsers.some(
      uid => uid !== user.id
    )
  }
  typing={
    !!user &&
    typingUsers.some(
      uid => uid !== user.id
    )
  }
/>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageBubble message={item} />
          )}
          ListEmptyComponent={
    <EmptyState
      title="No messages yet"
      description="Send the first message to start the conversation."
    />
  }
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop:12,
            paddingBottom:20,
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({
              animated: true,
            })
          }
        />

        <MessageInput
  conversationId={id}
  onTyping={startTyping}
  onStopTyping={stopTyping}

/>
      </View>
      </TouchableWithoutFeedback>
    </Screen>
  );
}