export const useFetchClientRequests = () => {
  const loading = ref(false);
  type RequestWithChecker = {
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
    checker_id: string;
    checker?: { full_name: string } | null;
    checker_full_name?: string;
  };
  const requests = ref<RequestWithChecker[]>([]); // fix type to any[] for now

  const supabase = useSupabaseClient();

  const fetchRequests = async () => {
    loading.value = true;
    try {
      const { data, error } = await supabase
        .from("requests")
        .select(`*, checker:checker_id(full_name)`)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      // Map checker full_name to a top-level field for easier table access
      requests.value = (data || []).map((req: RequestWithChecker) => ({
        ...req,
        checker_full_name: req.checker?.full_name || "-",
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
