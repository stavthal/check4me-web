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
      <UButton @click="$router.push('/admin/blog')">
        Επιστροφή στη διαχείριση
      </UButton>
    </div>

    <article v-else-if="post" class="max-w-4xl mx-auto">
      <!-- Admin header -->
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <Icon name="lucide:eye" class="w-5 h-5 text-yellow-600 mr-2" />
            <span class="text-yellow-800 font-medium">Προεπισκόπηση Admin</span>
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
            Δημιουργήθηκε στις {{ formatDate(post.created_at) }}
            <span v-if="post.updated_at !== post.created_at">
              • Ενημερώθηκε στις {{ formatDate(post.updated_at) }}
            </span>
          </div>

          <div class="text-sm text-gray-500">
            Slug:
            <code class="bg-gray-100 px-2 py-1 rounded">{{ post.slug }}</code>
          </div>
        </div>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { BlogPost } from "~/types/blog";

definePageMeta({
  middleware: "admin",
});

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
    // For now, we'll mock the data since we don't have the full implementation yet
    // post.value = await useFetchBlogPostBySlug(slug, false); // false = include drafts

    // Mock data for demonstration
    post.value = {
      id: 1,
      title: "Δείγμα Blog Post",
      content:
        "# Αυτό είναι ένα δείγμα\n\nΑυτό είναι το **περιεχόμενο** του blog post με *formatting*.\n\n## Υποενότητα\n\nΚάποιο κείμενο με [link](https://example.com).",
      excerpt: "Αυτό είναι μια σύντομη περιγραφή του άρθρου",
      slug: slug,
      author_id: "user-1",
      author: {
        id: "user-1",
        full_name: "Admin User",
        email: "admin@example.com",
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      published: true,
    };
  } catch (err) {
    console.error("Error fetching blog post:", err);
    error.value = true;
  } finally {
    pending.value = false;
  }
});
</script>
