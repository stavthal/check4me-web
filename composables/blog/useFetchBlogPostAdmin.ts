import type { BlogPost } from "~/types/blog";

/**
 * Fetch a blog post by slug for admin preview
 * This composable fetches both published and draft posts
 */
export const useFetchBlogPostAdmin = async (slug: string) => {
  const supabase = useSupabaseClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      `
      *,
      author:users(id, full_name, email)
    `
    )
    .eq("slug", slug)
    .single();

  if (error) {
    throw error;
  }

  return data as BlogPost;
};
