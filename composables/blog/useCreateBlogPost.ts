import type { CreateBlogPost } from "~/types/blog";

export const useCreateBlogPost = async (postData: CreateBlogPost) => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  if (!user.value) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      ...postData,
      author_id: user.value.id,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
