import { useSupabaseClient } from "#imports";

interface SubmitReviewPayload {
  requestId: number;
  checkerId: string;
  clientId: string;
  rating: number;
  comment: string;
}

export async function useSubmitReview(payload: SubmitReviewPayload) {
  const supabase = useSupabaseClient();

  // Check if a review already exists for this request
  const { data: existingReviews, error: fetchError } = await supabase
    .from("reviews")
    .select("id")
    .eq("request_id", payload.requestId)
    .limit(1);
  if (fetchError) throw fetchError;

  if (existingReviews && existingReviews.length > 0) {
    throw new Error("Υπάρχει ήδη αξιολόγηση για αυτό το αίτημα.");
  }

  // Insert review
  const { error: reviewError } = await supabase.from("reviews").insert([
    {
      request_id: payload.requestId,
      checker_id: payload.checkerId,
      client_id: payload.clientId,
      rating: payload.rating,
      comment: payload.comment,
    } as never,
  ]);

  if (reviewError) throw reviewError;

  return true;
}
