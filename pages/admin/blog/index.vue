<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Header Section -->
    <div class="bg-white shadow-sm border-b border-gray-100">
      <div class="container mx-auto px-4 py-8">
        <div
          class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        >
          <div class="space-y-2">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-primary/10 rounded-xl">
                <Icon name="lucide:book-open" class="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 class="text-4xl font-bold text-gray-900">
                  Διαχείριση Blog
                </h1>
                <p class="text-lg text-gray-600">
                  Δημιουργήστε και διαχειριστείτε τα blog posts σας με στυλ
                </p>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <!-- Stats Cards -->
            <div class="hidden lg:flex items-center gap-4">
              <div
                class="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg"
              >
                <div class="text-2xl font-bold">
                  {{ publishedPosts.length }}
                </div>
                <div class="text-sm opacity-90">Δημοσιευμένα</div>
              </div>
              <div
                class="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-3 rounded-xl shadow-lg"
              >
                <div class="text-2xl font-bold">{{ draftPosts.length }}</div>
                <div class="text-sm opacity-90">Προσχέδια</div>
              </div>
            </div>

            <UButton
              size="xl"
              color="primary"
              class="shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              @click="$router.push('/admin/blog/create')"
            >
              <Icon name="lucide:plus" class="w-5 h-5 mr-2" />
              Νέο Blog Post
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <!-- Enhanced Tabs -->
      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
      >
        <nav class="flex space-x-1 bg-gray-100 rounded-xl p-1">
          <button
            :class="[
              'flex-1 py-3 px-6 rounded-lg font-medium text-sm transition-all duration-200',
              activeTab === 'all'
                ? 'bg-white text-primary shadow-md transform scale-105'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
            ]"
            @click="activeTab = 'all'"
          >
            <div class="flex items-center justify-center gap-2">
              <Icon name="lucide:layers" class="w-4 h-4" />
              <span>Όλα</span>
              <span
                class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-bold"
              >
                {{ allPosts.length }}
              </span>
            </div>
          </button>
          <button
            :class="[
              'flex-1 py-3 px-6 rounded-lg font-medium text-sm transition-all duration-200',
              activeTab === 'published'
                ? 'bg-white text-emerald-600 shadow-md transform scale-105'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
            ]"
            @click="activeTab = 'published'"
          >
            <div class="flex items-center justify-center gap-2">
              <Icon name="lucide:check-circle" class="w-4 h-4" />
              <span>Δημοσιευμένα</span>
              <span
                class="bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full text-xs font-bold"
              >
                {{ publishedPosts.length }}
              </span>
            </div>
          </button>
          <button
            :class="[
              'flex-1 py-3 px-6 rounded-lg font-medium text-sm transition-all duration-200',
              activeTab === 'drafts'
                ? 'bg-white text-amber-600 shadow-md transform scale-105'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
            ]"
            @click="activeTab = 'drafts'"
          >
            <div class="flex items-center justify-center gap-2">
              <Icon name="lucide:edit-3" class="w-4 h-4" />
              <span>Προσχέδια</span>
              <span
                class="bg-amber-100 text-amber-600 px-2 py-1 rounded-full text-xs font-bold"
              >
                {{ draftPosts.length }}
              </span>
            </div>
          </button>
        </nav>
      </div>

      <!-- Enhanced Blog Posts List -->
      <BlogPostsList
        :posts="displayedPosts"
        :loading="pending"
        show-all
        show-actions
        @edit="editPost"
        @delete="deletePost"
      />

      <!-- Enhanced Delete Confirmation Modal -->
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        @click.self="showDeleteModal = false"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all"
        >
          <div class="p-6">
            <div class="flex items-start gap-4">
              <div class="p-3 bg-red-100 rounded-full flex-shrink-0">
                <Icon name="lucide:trash-2" class="w-6 h-6 text-red-600" />
              </div>
              <div class="flex-1">
                <h2 class="text-xl font-semibold text-gray-900 mb-3">
                  Επιβεβαίωση διαγραφής
                </h2>
                <p class="text-gray-600 mb-6 leading-relaxed">
                  Είστε σίγουροι ότι θέλετε να διαγράψετε το blog post
                  <span class="font-medium text-gray-900"
                    >"{{ postToDelete?.title }}"</span
                  >?
                </p>
                <p class="text-red-600 font-medium mb-6">
                  Αυτή η ενέργεια δεν μπορεί να αναιρεθεί.
                </p>

                <div class="flex gap-3 justify-end">
                  <UButton
                    variant="outline"
                    color="neutral"
                    @click="showDeleteModal = false"
                  >
                    Ακύρωση
                  </UButton>
                  <UButton
                    color="error"
                    :loading="deleting"
                    @click="confirmDelete"
                  >
                    <Icon name="lucide:trash-2" class="w-4 h-4 mr-2" />
                    Διαγραφή
                  </UButton>
                </div>
              </div>
            </div>
          </div>
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
    // Admin: fetch all posts, including drafts
    const { useFetchBlogPosts } = await import(
      "~/composables/blog/useFetchBlogPosts"
    );
    allPosts.value = await useFetchBlogPosts(false); // false = include drafts
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
