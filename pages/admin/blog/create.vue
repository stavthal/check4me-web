<template>
  <div>
    <BlogCreatePostForm />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "admin",
});
</script>
