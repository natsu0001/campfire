import { supabase } from "@/lib/supabase";
import { useEffect, useRef, useState } from "react";

export function usePresence(
  conversationId: string,
  userId: string
) {
  const channelRef = useRef<any>(null);

  const timeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!conversationId || !userId) return;

    const channel = supabase.channel(
      `presence:${conversationId}`,
      {
        config: {
          presence: {
            key: userId,
          },
        },
      }
    );

    channel.on(
      "presence",
      { event: "sync" },
      () => {
        const state = channel.presenceState();

        // 👇 DEBUG
        console.log("========== PRESENCE ==========");
console.log(JSON.stringify(state, null, 2));

const typing = Object.entries(state)
  .filter(([_, presences]: any) =>
    presences.some((presence: any) => {
      console.log("Presence meta:", presence);
      return presence.typing === true;
    })
  )
  .map(([key]) => key);

console.log("Typing Users:", typing);

        setTypingUsers(typing);
      }
    );

    channel.subscribe(async (status) => {
      console.log("Presence Status:", status);

      if (status === "SUBSCRIBED") {
        await channel.track({
          online: true,
          typing: false,
        });

        console.log("Tracked initial presence");
      }
    });

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, userId]);

async function startTyping() {
  if (!channelRef.current) return;

  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }

  await channelRef.current.track({
    online: true,
    typing: true,
  });

  timeoutRef.current = setTimeout(async () => {
    await channelRef.current?.track({
      online: true,
      typing: false,
    });
  }, 2000);
}

  return {
    onlineUsers,
    typingUsers,
    startTyping,
  };
}