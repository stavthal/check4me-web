import type { RequestWithPhotos } from "~/types/request";

type RequestDataWithRelations = {
  id: number;
  title: string;
  vehicle_make: string;
  vehicle_model: string;
  year: number;
  location: string;
  notes: string;
  listing_link: string;
  status: string;
  created_at: string;
  area_id: number;
  checker_id: string | null;
  client_id: string;
  checker?: { full_name: string; email: string } | null;
  client?: { full_name: string; email: string } | null;
};

export const useFetchClientRequestDetails = () => {
  const loading = ref(false);
  const request = ref<RequestWithPhotos | null>(null);
  const error = ref<string | null>(null);

  const supabase = useSupabaseClient();

  const fetchRequestDetails = async (requestId: string | number) => {
    loading.value = true;
    error.value = null;

    try {
      // Fetch request with checker details
      const { data: requestData, error: requestError } = await supabase
        .from("requests")
        .select(
          `
          *,
          checker:checker_id(full_name, email),
          client:client_id(full_name, email)
        `
        )
        .eq("id", requestId)
        .single();

      if (requestError) {
        throw new Error(requestError.message);
      }

      // Fetch photos for this request
      const { data: photosData, error: photosError } = await supabase
        .from("request_photos")
        .select("*")
        .eq("request_id", requestId)
        .order("uploaded_at", { ascending: false });

      if (photosError) {
        console.warn("Error fetching photos:", photosError.message);
        // Don't throw error for photos, just log and continue
      }

      // Combine request and photos data
      const typedRequestData = requestData as RequestDataWithRelations;
      request.value = {
        ...typedRequestData,
        checker_full_name: typedRequestData.checker?.full_name || "-",
        client_full_name: typedRequestData.client?.full_name || "-",
        photos: photosData || [],
      } as RequestWithPhotos;
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message;
        console.error("Error fetching request details:", err.message);
      } else {
        error.value = "Unknown error occurred";
        console.error("Unknown error fetching request details:", err);
      }
    } finally {
      loading.value = false;
    }
  };

  const clearRequest = () => {
    request.value = null;
    error.value = null;
  };

  return {
    loading: readonly(loading),
    request: readonly(request),
    error: readonly(error),
    fetchRequestDetails,
    clearRequest,
  };
};
