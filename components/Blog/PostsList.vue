<template>
  <div class="space-y-4">
    <div v-if="loading" class="text-center py-8">
      <div class="text-gray-600">Φόρτωση...</div>
    </div>

    <div v-else-if="posts.length === 0" class="text-center py-8 text-gray-600">
      {{
        showAll
          ? "Δεν υπάρχουν blog posts"
          : "Δεν υπάρχουν δημοσιευμένα blog posts"
      }}
    </div>

    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
        @click="navigateToPost(post.slug)"
      >
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-xl font-semibold text-gray-900 line-clamp-2">
            {{ post.title }}
          </h3>
          <span
            v-if="showAll"
            :class="[
              'text-xs px-2 py-1 rounded-full',
              post.published
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800',
            ]"
          >
            {{ post.published ? "Δημοσιευμένο" : "Προσχέδιο" }}
          </span>
        </div>

        <p v-if="post.excerpt" class="text-gray-600 mb-4 line-clamp-3">
          {{ post.excerpt }}
        </p>

        <div class="flex justify-between items-center text-sm text-gray-500">
          <span v-if="post.author"> Από {{ post.author.full_name }} </span>
          <span>
            {{ formatDate(post.created_at) }}
          </span>
        </div>

        <div v-if="showAll && showActions" class="mt-4 flex gap-2">
          <UButton
            size="sm"
            variant="outline"
            @click.stop="$emit('edit', post)"
          >
            Επεξεργασία
          </UButton>
          <UButton
            size="sm"
            variant="outline"
            color="error"
            @click.stop="$emit('delete', post)"
          >
            Διαγραφή
          </UButton>
        </div>
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
