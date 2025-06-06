<script setup lang="ts">
import { useUserStore } from "#imports";
import { useHydrateUserStore } from "~/composables/useHydrateUserStore";
import { ref } from "vue";

definePageMeta({ middleware: "auth", layout: "client" });

const isModalOpen = ref(false);

const onClose = () => {
  isModalOpen.value = false;
};

const onOpenModal = () => {
  isModalOpen.value = true;
};

const { user } = useUserStore();
const { loading } = useHydrateUserStore();
</script>

<template>
  <div>
    <div v-if="loading">Loading user...</div>
    <template v-else>
      <p class="welcome-heading">
        Καλώς όρισες,
        <span class="user-name">{{ user?.full_name || "Guest" }}</span>
      </p>

      <ClientRequestsAddRequestModal
        :is-open="isModalOpen"
        :on-close="onClose"
      />
      <ClientRequestsTable class="mt-4" :on-new-request="onOpenModal" />
    </template>
  </div>
</template>

<style scoped>
.welcome-heading {
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 1rem;
  margin-left: 1rem;
  margin-top: 1rem;
}

.user-name {
  font-weight: 600;
  color: var(--primary-color);
}
</style>
