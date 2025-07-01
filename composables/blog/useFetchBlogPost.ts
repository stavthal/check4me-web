import type { BlogPost } from "~/types/blog";

export const useFetchBlogPost = async (slug: string) => {
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
    .eq("published", true)
    .single();

  if (error) {
    throw error;
  }

  return data as BlogPost;
};
