export const useFetchAreas = async () => {
  const supabase = useSupabaseClient();

  const areas = ref([]);

  const { data, error } = await supabase.from("areas").select();
  areas.value = data ?? [];

  if (error) {
    console.error("Error fetching areas");
  }

  return { areas };
};
