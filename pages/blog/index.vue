<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Διαβάστε τα τελευταία νέα και άρθρα από την ομάδα μας
      </p>
    </div>

    <BlogPostsList :posts="posts" :loading="pending" />
  </div>
</template>

<script setup lang="ts">
import { useFetchBlogPosts } from "~/composables/blog/useFetchBlogPosts";
import type { BlogPost } from "~/types/blog";

const posts = ref<BlogPost[]>([]);
const pending = ref(true);

onMounted(async () => {
  try {
    posts.value = await useFetchBlogPosts(true);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  } finally {
    pending.value = false;
  }
});
</script>
