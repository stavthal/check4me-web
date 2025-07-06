<template>
  <div class="container px-4 py-8 mx-auto">
    <div v-if="pending" class="py-12 text-center">
      <div class="text-gray-600">Φόρτωση...</div>
    </div>

    <div v-else-if="error" class="py-12 text-center">
      <h1 class="mb-4 text-2xl font-bold text-gray-900">Το άρθρο δε βρέθηκε</h1>
      <p class="mb-6 text-gray-600">
        Το άρθρο που αναζητάτε δεν υπάρχει ή έχει αφαιρεθεί.
      </p>
      <UButton @click="$router.push('/admin/blog')">
        Επιστροφή στη διαχείριση
      </UButton>
    </div>

    <article v-else-if="post" class="max-w-4xl mx-auto">
      <!-- Admin header -->
      <div class="p-4 mb-8 border border-yellow-200 rounded-lg bg-yellow-50">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <Icon name="lucide:eye" class="w-5 h-5 mr-2 text-yellow-600" />
            <span class="font-medium text-yellow-800">Προεπισκόπηση Admin</span>
            <span
              :class="[
                'ml-3 px-2 py-1 rounded-full text-xs font-medium',
                post.published
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800',
              ]"
            >
              {{ post.published ? "Δημοσιευμένο" : "Προσχέδιο" }}
            </span>
          </div>

          <div class="flex gap-2">
            <UButton
              variant="outline"
              size="sm"
              @click="$router.push(`/admin/blog/edit/${post.id}`)"
            >
              Επεξεργασία
            </UButton>
            <UButton
              variant="outline"
              size="sm"
              @click="$router.push('/admin/blog')"
            >
              Πίσω
            </UButton>
          </div>
        </div>
      </div>

      <!-- Article header -->
      <header class="mb-8">
        <h1 class="mb-4 text-4xl font-bold text-gray-900">
          {{ post.title }}
        </h1>

        <div class="flex items-center mb-6 text-gray-600">
          <span v-if="post.author" class="mr-4">
            Από {{ post.author.full_name }}
          </span>
          <span>
            {{ formatDate(post.created_at) }}
          </span>
        </div>

        <p v-if="post.excerpt" class="text-xl leading-relaxed text-gray-600">
          {{ post.excerpt }}
        </p>
      </header>

      <!-- Article content -->
      <div class="prose prose-lg max-w-none">
        <div v-html="renderedContent" />
      </div>

      <!-- Article footer -->
      <footer class="pt-8 mt-12 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-500">
            Δημιουργήθηκε στις {{ formatDate(post.created_at) }}
            <span v-if="post.updated_at !== post.created_at">
              • Ενημερώθηκε στις {{ formatDate(post.updated_at) }}
            </span>
          </div>

          <div class="text-sm text-gray-500">
            Slug:
            <code class="px-2 py-1 bg-gray-100 rounded">{{ post.slug }}</code>
          </div>
        </div>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { BlogPost } from "~/types/blog";
import { useFetchBlogPost } from "~/composables/blog/useFetchBlogPost";

definePageMeta({
  middleware: "admin",
});

const route = useRoute();
const slug = route.params.slug as string;

const post = ref<BlogPost | null>(null);
const pending = ref(true);
const error = ref(false);

// Render HTML content from Tiptap editor
const renderedContent = computed(() => {
  if (!post.value) return "";

  // The content from Tiptap is already in HTML format
  return post.value.content || "";
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
    // Fetch the blog post data from Supabase (including drafts for admin)
    post.value = await useFetchBlogPost(slug, false);
  } catch (err) {
    console.error("Error fetching blog post:", err);
    error.value = true;
  } finally {
    pending.value = false;
  }
});
</script>
