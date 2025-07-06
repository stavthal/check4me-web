import type { BlogPost } from "~/types/blog";

export const useFetchBlogPosts = async (publishedOnly = true) => {
  const supabase = useSupabaseClient();

  let query = supabase
    .from("blog_posts")
    .select(
      `
      *,
      author:users(id, full_name, email)
    `
    )
    .order("created_at", { ascending: false });

  if (publishedOnly) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data as BlogPost[];
};
