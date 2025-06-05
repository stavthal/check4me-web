<script setup lang="ts">
definePageMeta({ middleware: "auth" });
</script>

<template>
  <div>
    <!-- Dev only -->
    <DevOnly>
      <NuxtLink to="/" class="devlinks-header">DEV LINKS</NuxtLink>
    </DevOnly>
    <FormLoginForm />
  </div>
</template>
