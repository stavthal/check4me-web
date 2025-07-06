import { ref } from "vue";
import { useSupabaseClient } from "#imports";

export function useFetchReviewByRequestId() {
  const review = ref(null);
  const loading = ref(false);
  const error = ref<null | import("@supabase/postgrest-js").PostgrestError>(
    null
  );

  const fetchReview = async (requestId: string | number) => {
    loading.value = true;
    error.value = null;
    const supabase = useSupabaseClient();
    const { data, error: fetchError } = await supabase
      .from("reviews")
      .select("*")
      .eq("request_id", requestId)
      .order("created_at", { ascending: true })
      .single();
    if (fetchError) {
      error.value = fetchError;
      review.value = null;
    } else if (data && Object.keys(data).length > 0) {
      review.value = data;
    } else {
      review.value = null;
    }
    loading.value = false;
  };

  return { review, loading, error, fetchReview };
}
