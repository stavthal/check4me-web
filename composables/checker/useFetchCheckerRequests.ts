export const useFetchCheckerRequests = () => {
  const loading = ref(false);
  type RequestWithClient = {
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
    client_id: string;
    client?: { full_name: string } | null;
    client_full_name?: string;
    photos?: Array<{
      id: number;
      photo_url: string;
      filename: string;
      uploaded_at: string;
    }>;
  };
  const requests = ref<RequestWithClient[]>([]); // fix type to any[] for now

  const supabase = useSupabaseClient();

  const fetchRequests = async () => {
    loading.value = true;
    try {
      const { data, error } = await supabase
        .from("requests")
        .select(
          `
          *, 
          client:client_id(full_name),
          photos:request_photos(id, photo_url, filename, uploaded_at)
        `
        )
        .order("created_at", { ascending: false });

      console.log("Fetched requests:", data);
      if (error) {
        throw new Error(error.message);
      }

      // Map client full_name to a top-level field for easier table access
      requests.value = (data || []).map((req: RequestWithClient) => ({
        ...req,
        client_full_name: req.client?.full_name || "-",
      }));
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching requests:", err.message);
      } else {
        console.error("Unknown error fetching requests:", err);
      }
    } finally {
      loading.value = false;
    }
  };

  return { loading, requests, fetchRequests };
};
