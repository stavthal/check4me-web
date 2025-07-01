<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Διαχείριση Blog</h1>
        <p class="text-gray-600 mt-2">
          Δημιουργήστε και διαχειριστείτε τα blog posts σας
        </p>
      </div>

      <UButton @click="$router.push('/admin/blog/create')">
        <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
        Νέο Blog Post
      </UButton>
    </div>

    <!-- Tabs -->
    <div class="mb-8">
      <nav class="flex space-x-8">
        <button
          :class="[
            'py-4 px-1 border-b-2 font-medium text-sm',
            activeTab === 'all'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700',
          ]"
          @click="activeTab = 'all'"
        >
          Όλα ({{ allPosts.length }})
        </button>
        <button
          :class="[
            'py-4 px-1 border-b-2 font-medium text-sm',
            activeTab === 'published'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700',
          ]"
          @click="activeTab = 'published'"
        >
          Δημοσιευμένα ({{ publishedPosts.length }})
        </button>
        <button
          :class="[
            'py-4 px-1 border-b-2 font-medium text-sm',
            activeTab === 'drafts'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700',
          ]"
          @click="activeTab = 'drafts'"
        >
          Προσχέδια ({{ draftPosts.length }})
        </button>
      </nav>
    </div>

    <BlogPostsList
      :posts="displayedPosts"
      :loading="pending"
      show-all
      show-actions
      @edit="editPost"
      @delete="deletePost"
    />

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 class="mb-4 text-xl font-semibold">Επιβεβαίωση διαγραφής</h2>
        <p class="mb-6 text-gray-600">
          Είστε σίγουροι ότι θέλετε να διαγράψετε το blog post "{{
            postToDelete?.title
          }}"? Αυτή η ενέργεια δεν μπορεί να αναιρεθεί.
        </p>

        <div class="flex gap-4">
          <UButton variant="outline" @click="showDeleteModal = false">
            Ακύρωση
          </UButton>
          <UButton color="error" :loading="deleting" @click="confirmDelete">
            Διαγραφή
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { BlogPost } from "~/types/blog";

definePageMeta({
  middleware: "admin",
});

const activeTab = ref<"all" | "published" | "drafts">("all");
const allPosts = ref<BlogPost[]>([]);
const pending = ref(true);
const showDeleteModal = ref(false);
const postToDelete = ref<BlogPost | null>(null);
const deleting = ref(false);

const router = useRouter();
const toast = useToast();

const publishedPosts = computed(() =>
  allPosts.value.filter((post) => post.published)
);

const draftPosts = computed(() =>
  allPosts.value.filter((post) => !post.published)
);

const displayedPosts = computed(() => {
  switch (activeTab.value) {
    case "published":
      return publishedPosts.value;
    case "drafts":
      return draftPosts.value;
    default:
      return allPosts.value;
  }
});

const loadPosts = async () => {
  pending.value = true;
  try {
    // For now, we'll mock the data since we don't have the composable yet
    // allPosts.value = await useFetchBlogPosts(false); // false = include drafts
    allPosts.value = [];
  } catch (error) {
    console.error("Error loading posts:", error);
    toast.add({
      title: "Σφάλμα κατά τη φόρτωση",
      description: "Δεν ήταν δυνατή η φόρτωση των blog posts.",
      color: "error",
    });
  } finally {
    pending.value = false;
  }
};

const editPost = (post: BlogPost) => {
  router.push(`/admin/blog/edit/${post.id}`);
};

const deletePost = (post: BlogPost) => {
  postToDelete.value = post;
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  if (!postToDelete.value) return;

  deleting.value = true;
  try {
    // await useDeleteBlogPost(postToDelete.value.id);
    allPosts.value = allPosts.value.filter(
      (p) => p.id !== postToDelete.value!.id
    );

    toast.add({
      title: "Blog post διαγράφηκε",
      description: "Το blog post διαγράφηκε επιτυχώς.",
      color: "success",
    });

    showDeleteModal.value = false;
    postToDelete.value = null;
  } catch (error) {
    console.error("Error deleting post:", error);
    toast.add({
      title: "Σφάλμα κατά τη διαγραφή",
      description: "Δεν ήταν δυνατή η διαγραφή του blog post.",
      color: "error",
    });
  } finally {
    deleting.value = false;
  }
};

onMounted(() => {
  loadPosts();
});
</script>
