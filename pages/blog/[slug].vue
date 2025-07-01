<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="pending" class="text-center py-12">
      <div class="text-gray-600">Φόρτωση...</div>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Το άρθρο δε βρέθηκε</h1>
      <p class="text-gray-600 mb-6">
        Το άρθρο που αναζητάτε δεν υπάρχει ή έχει αφαιρεθεί.
      </p>
      <UButton @click="$router.push('/blog')"> Επιστροφή στο Blog </UButton>
    </div>

    <article v-else-if="post" class="max-w-4xl mx-auto">
      <!-- Back button -->
      <div class="mb-8">
        <UButton
          class="text-gray-600 hover:text-gray-900"
          variant="ghost"
          @click="$router.push('/blog')"
        >
          <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
          Επιστροφή στο Blog
        </UButton>
      </div>

      <!-- Article header -->
      <header class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          {{ post.title }}
        </h1>

        <div class="flex items-center text-gray-600 mb-6">
          <span v-if="post.author" class="mr-4">
            Από {{ post.author.full_name }}
          </span>
          <span>
            {{ formatDate(post.created_at) }}
          </span>
        </div>

        <p v-if="post.excerpt" class="text-xl text-gray-600 leading-relaxed">
          {{ post.excerpt }}
        </p>
      </header>

      <!-- Article content -->
      <div class="prose prose-lg max-w-none">
        <div v-html="renderedContent" />
      </div>

      <!-- Article footer -->
      <footer class="mt-12 pt-8 border-t border-gray-200">
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-500">
            Δημοσιεύτηκε στις {{ formatDate(post.created_at) }}
            <span v-if="post.updated_at !== post.created_at">
              • Ενημερώθηκε στις {{ formatDate(post.updated_at) }}
            </span>
          </div>

          <UButton @click="$router.push('/blog')"> Περισσότερα άρθρα </UButton>
        </div>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useFetchBlogPost } from "~/composables/blog/useFetchBlogPost";
import type { BlogPost } from "~/types/blog";

const route = useRoute();
const slug = route.params.slug as string;

const post = ref<BlogPost | null>(null);
const pending = ref(true);
const error = ref(false);

// Simple markdown renderer
const renderedContent = computed(() => {
  if (!post.value) return "";

  let content = post.value.content;

  // Basic markdown parsing
  content = content
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" class="text-blue-600 hover:text-blue-800">$1</a>'
    )
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br>");

  return `<p>${content}</p>`;
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("el-GR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

onMounted(async () => {
  try {
    post.value = await useFetchBlogPost(slug);

    // Set page title
    useHead({
      title: `${post.value.title} | Blog`,
      meta: [
        {
          name: "description",
          content: post.value.excerpt || post.value.title,
        },
      ],
    });
  } catch (err) {
    console.error("Error fetching blog post:", err);
    error.value = true;
  } finally {
    pending.value = false;
  }
});
</script>
