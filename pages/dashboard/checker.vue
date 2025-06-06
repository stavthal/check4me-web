<script setup lang="ts">
definePageMeta({ middleware: "auth", layout: "checker" });

const { user } = useUserStore();
const { loading } = useHydrateUserStore();
</script>

<template>
  <div>
    <h1>Checker Page</h1>
    <p>This page is for checking the status of the application.</p>

    <div v-if="loading">Loading user...</div>
    <template v-else>
      <p>User: {{ user?.full_name || "Guest" }}</p>
      <p>Role: {{ user?.role || "No role assigned" }}</p>
      <NuxtLink to="/">Go to Home</NuxtLink>
    </template>
  </div>
</template>
