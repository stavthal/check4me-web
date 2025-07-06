import type { RequestMessage, MessageInsert } from "~/types/message";

type DatabaseMessage = {
  id: number;
  request_id: string;
  sender_id: string;
  sender_type: "client" | "checker";
  message: string;
  created_at: string;
  updated_at: string;
  is_read: boolean;
};

// Uncomment when you create a profiles table
// type UserProfile = {
//   id: string;
//   full_name: string;
//   email: string;
// };

export const useRequestMessages = (requestId: string) => {
  const supabase = useSupabaseClient();
  const messages = ref<RequestMessage[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Fetch messages for a request
  const fetchMessages = async () => {
    loading.value = true;
    error.value = null;

    try {
      // First, get the messages
      const { data: messagesData, error: fetchError } = await supabase
        .from("request_messages")
        .select("*")
        .eq("request_id", requestId)
        .order("created_at", { ascending: true });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      if (!messagesData || messagesData.length === 0) {
        messages.value = [];
        return;
      }

      // For now, we'll just set messages without sender info since we don't have a profiles table
      // You can uncomment and modify this section when you create a profiles table

      // Get unique sender IDs (uncomment when you have a profiles table)
      // const senderIds = [...new Set((messagesData as DatabaseMessage[]).map(msg => msg.sender_id))];

      // Fetch sender information from profiles table (uncomment when you have one)
      /*
      const { data: sendersData, error: sendersError } = await supabase
        .from("profiles")
        .select("id, full_name, email")
        .in("id", senderIds);

      if (sendersError) {
        console.warn("Could not fetch sender info:", sendersError.message);
      }

      // Combine messages with sender information
      messages.value = (messagesData as DatabaseMessage[]).map(msg => {
        const sender = sendersData?.find((s: UserProfile) => s.id === msg.sender_id);
        return {
          ...msg,
          sender: sender || null
        };
      });
      */

      // For now, just return messages without sender info
      messages.value = (messagesData as DatabaseMessage[]).map((msg) => ({
        ...msg,
        sender: null,
      }));
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message;
        console.error("Error fetching messages:", err.message);
      } else {
        error.value = "Unknown error occurred";
        console.error("Unknown error fetching messages:", err);
      }
    } finally {
      loading.value = false;
    }
  };

  // Send a message
  const sendMessage = async (
    messageText: string,
    senderType: "client" | "checker"
  ) => {
    const user = useSupabaseUser();

    if (!user.value) {
      throw new Error("User not authenticated");
    }

    const messageData: MessageInsert = {
      request_id: requestId,
      sender_id: user.value.id,
      sender_type: senderType,
      message: messageText.trim(),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: sendError } = await (supabase as any)
      .from("request_messages")
      .insert([messageData]);

    if (sendError) {
      throw new Error(`Failed to send message: ${sendError.message}`);
    }

    // Refresh messages after sending
    await fetchMessages();
  };

  // Mark messages as read
  const markAsRead = async (messageIds: number[]) => {
    if (messageIds.length === 0) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: updateError } = await (supabase as any)
      .from("request_messages")
      .update({ is_read: true })
      .in("id", messageIds);

    if (updateError) {
      console.error("Error marking messages as read:", updateError.message);
    }
  };

  // Subscribe to realtime messages
  const subscribeToMessages = () => {
    const channel = supabase
      .channel(`request_messages_${requestId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "request_messages",
          filter: `request_id=eq.${requestId}`,
        },
        (payload) => {
          console.log("Realtime message update:", payload);
          // Refresh messages when new message arrives
          fetchMessages();
        }
      )
      .subscribe();

    return channel;
  };

  return {
    messages: readonly(messages),
    loading: readonly(loading),
    error: readonly(error),
    fetchMessages,
    sendMessage,
    markAsRead,
    subscribeToMessages,
  };
};
