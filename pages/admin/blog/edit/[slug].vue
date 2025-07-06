<template>
  <div class="max-w-4xl p-6 mx-auto">
    <div class="mb-6">
      <h1 class="mb-2 text-3xl font-bold">Edit Blog Post</h1>
      <NuxtLink
        to="/admin/blog"
        class="flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        ← Back to Blog Management
      </NuxtLink>
    </div>

    <div v-if="pending" class="py-8 text-center">
      <div
        class="w-8 h-8 mx-auto border-b-2 border-blue-600 rounded-full animate-spin"
      ></div>
      <p class="mt-2 text-gray-600">Loading blog post...</p>
    </div>

    <div v-else-if="error" class="py-8 text-center">
      <p class="text-red-600">Error loading blog post: {{ error }}</p>
    </div>

    <BlogCreatePostForm
      v-else-if="post"
      :initial-data="post"
      :is-editing="true"
      @submit="handleUpdate"
      @cancel="$router.push('/admin/blog')"
    />
  </div>
</template>

<script setup lang="ts">
import type { BlogPost, UpdateBlogPost } from "~/types/blog";

definePageMeta({
  middleware: "admin",
});

const route = useRoute();
const router = useRouter();
const toast = useToast();

const slug = route.params.slug as string;

// Fetch the blog post for editing (admins can fetch unpublished posts)
const {
  data: post,
  pending,
  error,
} = await useLazyAsyncData(`blog-post-edit-${slug}`, async () => {
  const supabase = useSupabaseClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      `
          *,
          author:users(id, full_name, email)
        `
    )
    .eq("id", slug)
    .single();

  if (error) throw error;
  return data as BlogPost;
});

const handleUpdate = async (updatedData: UpdateBlogPost) => {
  if (!post.value) return;

  try {
    const { useUpdateBlogPost } = await import(
      "~/composables/blog/useUpdateBlogPost"
    );
    await useUpdateBlogPost(post.value.id, updatedData);

    toast.add({
      title: "Blog post updated successfully!",
      color: "success",
    });

    router.push("/admin/blog");
  } catch (error) {
    console.error("Error updating blog post:", error);
    toast.add({
      title: "Error updating blog post",
      description: "Please try again.",
      color: "error",
    });
  }
};
</script>
