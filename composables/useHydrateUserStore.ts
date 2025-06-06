import { onMounted, ref } from "vue";
import { useSupabaseClient, useSupabaseUser } from "#imports";
import { useUserStore } from "~/stores/user";
import type { Area } from "~/types/area";

export function useHydrateUserStore() {
  const supabase = useSupabaseClient();
  const supabaseUser = useSupabaseUser();
  const userStore = useUserStore();
  const loading = ref(true);

  onMounted(async () => {
    const sessionUser = supabaseUser.value;
    if (sessionUser) {
      // Fetch area name if area_id exists
      const area = { id: sessionUser.user_metadata?.area_id || "", name: "" };
      if (area.id) {
        const { data: areaData } = await supabase
          .from("areas")
          .select("id, name")
          .eq("id", area.id)
          .single<Area>();
        if (areaData) area.name = areaData.name;
      }
      const user = {
        id: sessionUser.id,
        email: sessionUser.email,
        role: sessionUser.user_metadata?.role || "",
        full_name: sessionUser.user_metadata?.full_name || "",
        area,
      };

      console.log(sessionUser);
      userStore.setUser(user);
    } else {
      userStore.clearUser();
    }
    loading.value = false;
  });

  return { loading };
}
