<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Loading State -->
    <div v-if="pending" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"
        />
        <p class="text-gray-600 text-lg">Φόρτωση άρθρου...</p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex items-center justify-center min-h-screen"
    >
      <div class="text-center max-w-md mx-auto px-6">
        <div
          class="p-4 bg-red-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center"
        >
          <Icon name="lucide:alert-circle" class="w-10 h-10 text-red-500" />
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          Το άρθρο δε βρέθηκε
        </h1>
        <p class="text-gray-600 mb-8 text-lg">
          Το άρθρο που αναζητάτε δεν υπάρχει ή έχει αφαιρεθεί.
        </p>
        <UButton size="lg" @click="$router.push('/admin/blog')">
          <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
          Επιστροφή στη διαχείριση
        </UButton>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="post">
      <!-- Admin Header Bar -->
      <div class="bg-white shadow-sm border-b border-gray-100">
        <div class="max-w-6xl mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div
                class="flex items-center gap-3 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl"
              >
                <Icon name="lucide:eye" class="w-5 h-5 text-amber-600" />
                <span class="font-semibold text-amber-800"
                  >Προεπισκόπηση Admin</span
                >
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-bold border',
                    post.published
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      : 'bg-gray-100 text-gray-800 border-gray-200',
                  ]"
                >
                  {{ post.published ? "Δημοσιευμένο" : "Προσχέδιο" }}
                </span>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <UButton
                variant="outline"
                color="primary"
                @click="$router.push(`/admin/blog/edit/${post.id}`)"
              >
                <Icon name="lucide:edit-3" class="w-4 h-4 mr-2" />
                Επεξεργασία
              </UButton>
              <UButton
                variant="ghost"
                color="neutral"
                @click="$router.push('/admin/blog')"
              >
                <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
                Πίσω
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Article Content -->
      <article class="max-w-4xl mx-auto px-6 py-12">
        <!-- Article Header -->
        <header class="mb-12 text-center">
          <div class="space-y-6">
            <h1 class="text-5xl font-bold text-gray-900 leading-tight">
              {{ post.title }}
            </h1>

            <div class="flex items-center justify-center gap-6 text-gray-600">
              <div class="flex items-center gap-2">
                <Icon name="lucide:user" class="w-5 h-5" />
                <span v-if="post.author" class="text-lg">{{
                  post.author.full_name
                }}</span>
              </div>
              <div class="w-1 h-1 bg-gray-400 rounded-full" />
              <div class="flex items-center gap-2">
                <Icon name="lucide:calendar" class="w-5 h-5" />
                <span class="text-lg">{{ formatDate(post.created_at) }}</span>
              </div>
            </div>

            <div v-if="post.excerpt" class="max-w-3xl mx-auto">
              <p class="text-xl text-gray-600 leading-relaxed italic">
                {{ post.excerpt }}
              </p>
            </div>
          </div>
        </header>

        <!-- Article Body -->
        <div
          class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-12"
        >
          <div class="prose prose-lg prose-gray max-w-none">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-html="renderedContent" />
          </div>
        </div>

        <!-- Article Footer -->
        <footer class="mt-12 pt-8 border-t border-gray-200">
          <div
            class="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            <div class="space-y-2">
              <div class="text-sm text-gray-500 flex items-center gap-2">
                <Icon name="lucide:clock" class="w-4 h-4" />
                <span
                  >Δημιουργήθηκε στις {{ formatDate(post.created_at) }}</span
                >
              </div>
              <div
                v-if="post.updated_at !== post.created_at"
                class="text-sm text-gray-500 flex items-center gap-2"
              >
                <Icon name="lucide:edit-2" class="w-4 h-4" />
                <span>Ενημερώθηκε στις {{ formatDate(post.updated_at) }}</span>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div
                class="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg"
              >
                <span class="font-medium">Slug:</span>
                <code class="ml-2 text-primary font-mono">{{ post.slug }}</code>
              </div>

              <UButton
                v-if="post.published"
                variant="outline"
                color="primary"
                @click="$router.push(`/blog/${post.slug}`)"
              >
                <Icon name="lucide:external-link" class="w-4 h-4 mr-2" />
                Προβολή Live
              </UButton>
            </div>
          </div>
        </footer>
      </article>
    </div>
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
