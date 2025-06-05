<template>
  <div>
    <div class="devlinks-div">
      <h2 class="devlinks-header">DEV LINKS</h2>
      <NuxtLink to="/register">Register</NuxtLink>
      <NuxtLink to="/login">Login</NuxtLink>
      <NuxtLink to="/dashboard/client">Client Dashboard</NuxtLink>
      <NuxtLink to="/dashboard/checker">Checker Dashboard</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" });
</script>

<style scoped>
.devlinks-header {
  color: blue;
  font-weight: bold;
}

.devlinks-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
</style>
