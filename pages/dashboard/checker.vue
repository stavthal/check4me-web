<script setup lang="ts">
definePageMeta({ middleware: "auth", layout: "checker" });

const userStore = useUserStore();
const { loading } = useHydrateUserStore();
</script>

<template>
  <div>
    <div v-if="loading">Loading user...</div>
    <template v-else>
      <p class="welcome-heading">
        Καλώς όρισες,
        <span class="user-name">{{
          userStore?.user?.full_name || "Guest"
        }}</span>
      </p>

      <CheckerRequestsTable class="mt-4" />
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
