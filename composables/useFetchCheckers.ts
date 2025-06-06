export const useFetchCheckersByArea = () => {
  const supabase = useSupabaseClient();

  const loading = ref(true);

  const checkers = ref([]);

  const fetchCheckers = async (area_id: string | number) => {
    const parsedAreaId =
      typeof area_id === "string" ? parseInt(area_id) : area_id;

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("area_id", parsedAreaId);

    checkers.value = data || [];
    loading.value = false;
  };

  return { checkers, loading, fetch: fetchCheckers };
};
