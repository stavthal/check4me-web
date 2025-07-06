<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="loading" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="i in 6"
        :key="i"
        class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse"
      >
        <div class="space-y-4">
          <div class="h-4 bg-gray-200 rounded w-3/4" />
          <div class="space-y-2">
            <div class="h-3 bg-gray-200 rounded" />
            <div class="h-3 bg-gray-200 rounded w-5/6" />
          </div>
          <div class="flex justify-between">
            <div class="h-3 bg-gray-200 rounded w-1/4" />
            <div class="h-3 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="posts.length === 0" class="text-center py-16">
      <div class="max-w-md mx-auto">
        <div
          class="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center"
        >
          <Icon name="lucide:file-text" class="w-10 h-10 text-gray-400" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">
          {{
            showAll
              ? "Δεν υπάρχουν blog posts"
              : "Δεν υπάρχουν δημοσιευμένα blog posts"
          }}
        </h3>
        <p class="text-gray-600 mb-6">
          {{
            showAll
              ? "Δημιουργήστε το πρώτο σας blog post για να ξεκινήσετε"
              : "Δημοσιεύστε κάποια άρθρα για να τα δουν οι επισκέπτες σας"
          }}
        </p>
        <UButton
          v-if="showAll"
          color="primary"
          @click="$router.push('/admin/blog/create')"
        >
          <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
          Δημιουργία Blog Post
        </UButton>
      </div>
    </div>

    <!-- Posts Grid -->
    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="post in posts"
        :key="post.id"
        class="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
        @click="navigateToPost(post.slug)"
      >
        <!-- Post Header -->
        <div class="p-6 pb-4">
          <div class="flex justify-between items-start mb-3">
            <h3
              class="text-xl font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors"
            >
              {{ post.title }}
            </h3>
            <div v-if="showAll" class="ml-3 flex-shrink-0">
              <span
                :class="[
                  'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                  post.published
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200',
                ]"
              >
                <div
                  :class="[
                    'w-2 h-2 rounded-full mr-2',
                    post.published ? 'bg-emerald-500' : 'bg-amber-500',
                  ]"
                />
                {{ post.published ? "Δημοσιευμένο" : "Προσχέδιο" }}
              </span>
            </div>
          </div>

          <p
            v-if="post.excerpt"
            class="text-gray-600 mb-4 line-clamp-3 leading-relaxed"
          >
            {{ post.excerpt }}
          </p>
        </div>

        <!-- Post Footer -->
        <div class="px-6 pb-6">
          <div
            class="flex justify-between items-center text-sm text-gray-500 mb-4"
          >
            <div class="flex items-center gap-2">
              <Icon name="lucide:user" class="w-4 h-4" />
              <span v-if="post.author">{{ post.author.full_name }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="lucide:calendar" class="w-4 h-4" />
              <span>{{ formatDate(post.created_at) }}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div v-if="showAll && showActions" class="flex gap-2">
            <UButton
              size="sm"
              variant="outline"
              color="primary"
              class="flex-1"
              @click.stop="$emit('edit', post)"
            >
              <Icon name="lucide:edit-3" class="w-4 h-4 mr-2" />
              Επεξεργασία
            </UButton>
            <UButton
              size="sm"
              variant="outline"
              color="error"
              @click.stop="$emit('delete', post)"
            >
              <Icon name="lucide:trash-2" class="w-4 h-4" />
            </UButton>
          </div>
        </div>

        <!-- Hover Effect Gradient -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogPost } from "~/types/blog";

interface Props {
  posts: BlogPost[];
  loading?: boolean;
  showAll?: boolean;
  showActions?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  showAll: false,
  showActions: false,
});

const _emit = defineEmits<{
  edit: [post: BlogPost];
  delete: [post: BlogPost];
}>();

const router = useRouter();

const navigateToPost = (slug: string) => {
  if (props.showAll) {
    router.push(`/admin/blog/preview/${slug}`);
  } else {
    router.push(`/blog/${slug}`);
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("el-GR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
