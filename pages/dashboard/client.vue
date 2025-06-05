<script setup lang="ts">
import { useUserStore } from "#imports";

definePageMeta({ middleware: "auth" });

const { user } = useUserStore();
</script>

<template>
  <div>
    <h1>Checker Page</h1>
    <p>This page is for checking the status of the application.</p>

    <p>User: {{ user?.full_name || "Guest" }}</p>
    <NuxtLink to="/">Go to Home</NuxtLink>
  </div>
</template>
