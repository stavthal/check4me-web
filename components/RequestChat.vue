<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import type { RequestMessage } from "~/types/message";

interface Props {
  requestId: string;
  currentUserType: "client" | "checker";
  currentUserId: string;
}

const props = defineProps<Props>();

const {
  messages,
  loading,
  error,
  fetchMessages,
  sendMessage,
  markAsRead,
  subscribeToMessages,
} = useRequestMessages(props.requestId);

const newMessage = ref("");
const chatContainer = ref<HTMLElement>();
const channel = ref();

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("el-GR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

const handleSendMessage = async () => {
  if (!newMessage.value.trim()) return;

  try {
    await sendMessage(newMessage.value, props.currentUserType);
    newMessage.value = "";
    scrollToBottom();
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

const isOwnMessage = (message: RequestMessage) => {
  return message.sender_id === props.currentUserId;
};

const markUnreadAsRead = async () => {
  const unreadMessages = messages.value.filter(
    (msg) => !msg.is_read && !isOwnMessage(msg)
  );

  if (unreadMessages.length > 0) {
    const messageIds = unreadMessages.map((msg) => msg.id);
    await markAsRead(messageIds);
  }
};

onMounted(async () => {
  await fetchMessages();
  scrollToBottom();
  await markUnreadAsRead();

  // Subscribe to realtime updates
  channel.value = subscribeToMessages();
});

onUnmounted(() => {
  if (channel.value) {
    channel.value.unsubscribe();
  }
});

// Watch for new messages and scroll to bottom
watch(messages, () => {
  scrollToBottom();
  markUnreadAsRead();
});
</script>

<template>
  <div class="flex flex-col bg-white border border-gray-200 rounded-lg h-96">
    <!-- Chat Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">
        <UIcon name="i-lucide-message-circle" class="inline w-5 h-5 mr-2" />
        Συνομιλία
      </h3>
      <div class="text-sm text-gray-500">{{ messages.length }} μηνύματα</div>
    </div>

    <!-- Messages Container -->
    <div ref="chatContainer" class="flex-1 p-4 space-y-3 overflow-y-auto">
      <div v-if="loading" class="flex items-center justify-center h-full">
        <USpinner />
      </div>

      <div v-else-if="error" class="text-center text-red-500">
        {{ error }}
      </div>

      <div v-else-if="messages.length === 0" class="text-center text-gray-500">
        Δεν υπάρχουν μηνύματα ακόμη. Ξεκινήστε τη συνομιλία!
      </div>

      <div v-else>
        <div
          v-for="message in messages"
          :key="message.id"
          class="flex"
          :class="{ 'justify-end': isOwnMessage(message) }"
        >
          <div
            class="max-w-xs px-4 py-2 rounded-lg lg:max-w-md"
            :class="{
              'bg-primary-500 text-white': isOwnMessage(message),
              'bg-gray-100 text-gray-900': !isOwnMessage(message),
            }"
          >
            <div v-if="!isOwnMessage(message)" class="mb-1 text-xs font-medium">
              {{
                message.sender?.full_name ||
                `${message.sender_type === "client" ? "Πελάτης" : "Ελεγκτής"}`
              }}
            </div>
            <div class="text-sm">{{ message.message }}</div>
            <div
              class="mt-1 text-xs opacity-75"
              :class="{
                'text-primary-100': isOwnMessage(message),
                'text-gray-500': !isOwnMessage(message),
              }"
            >
              {{ formatDate(message.created_at) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Message Input -->
    <div class="p-4 border-t border-gray-200">
      <div class="flex space-x-2">
        <UInput
          v-model="newMessage"
          placeholder="Γράψτε το μήνυμά σας..."
          class="flex-1"
          @keydown.enter="handleSendMessage"
        />
        <UButton
          color="primary"
          :disabled="!newMessage.trim() || loading"
          @click="handleSendMessage"
        >
          <UIcon name="i-lucide-send" class="w-4 h-4" />
        </UButton>
      </div>
    </div>
  </div>
</template>
