import { supabase } from "@/lib/supabase";
import { useEffect, useRef, useState } from "react";

export function usePresence(
  conversationId: string,
  userId: string
) {
  const channelRef = useRef<any>(null);

  const timeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const subscribedRef = useRef(false);

  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!conversationId || !userId) return;

    console.log("🟢 usePresence mounted");

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

    channelRef.current = channel;

    channel.on(
      "presence",
      { event: "sync" },
      () => {
        const state = channel.presenceState();

        console.log("========== PRESENCE ==========");
        console.log(JSON.stringify(state, null, 2));

        setOnlineUsers(Object.keys(state));

        const typing = Object.entries(state)
          .filter(([_, presences]: any) => {
            const latest =
              presences[presences.length - 1];

            return latest?.typing === true;
          })
          .map(([key]) => key);

        console.log("ONLINE USERS:", Object.keys(state));
        console.log("TYPING USERS:", typing);

        setTypingUsers(typing);
      }
    );

    channel.subscribe(async (status) => {
      console.log("Presence Status:", status);

      if (status === "SUBSCRIBED") {
        subscribedRef.current = true;

        await channel.track({
          online: true,
          typing: false,
        });

        console.log("Tracked initial presence");
      }

      if (status === "CLOSED") {
        subscribedRef.current = false;
      }
    });

    return () => {
      console.log("🔴 usePresence unmounted");

      subscribedRef.current = false;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      supabase.removeChannel(channel);
    };
  }, [conversationId, userId]);

  async function startTyping() {
    if (!channelRef.current) return;
    if (!subscribedRef.current) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const state =
      channelRef.current.presenceState();

    const mine = state[userId];
    const latest =
      mine?.[mine.length - 1];

    if (!latest?.typing) {
      await channelRef.current.track({
        online: true,
        typing: true,
      });
    }

    timeoutRef.current = setTimeout(() => {
      stopTyping();
    }, 2000);
  }

  async function stopTyping() {
    if (!channelRef.current) return;
    if (!subscribedRef.current) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const state =
      channelRef.current.presenceState();

    const mine = state[userId];
    const latest =
      mine?.[mine.length - 1];

    if (latest?.typing) {
      await channelRef.current.track({
        online: true,
        typing: false,
      });
    }
  }

  return {
    onlineUsers,
    typingUsers,
    startTyping,
    stopTyping,
  };
}