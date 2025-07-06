import type { BlogPost } from "~/types/blog";

export const useFetchBlogPost = async (
  slug: string,
  publishedOnly: boolean = true
) => {
  const supabase = useSupabaseClient();

  let query = supabase
    .from("blog_posts")
    .select(
      `
      *,
      author:users(id, full_name, email)
    `
    )
    .eq("slug", slug);

  // Only filter by published status if publishedOnly is true
  if (publishedOnly) {
    query = query.eq("published", true);
  }

  const { data, error } = await query.single();

  if (error) {
    throw error;
  }

  return data as BlogPost;
};
