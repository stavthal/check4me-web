import type { UpdateBlogPost } from "~/types/blog";

export const useUpdateBlogPost = async (
  id: number,
  postData: UpdateBlogPost
) => {
  const supabase = useSupabaseClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .update(postData)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    throw error;
  }

  return data;
};
