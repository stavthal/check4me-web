import { ref } from "vue";
import { useSupabaseClient } from "#imports";
import { useUserStore } from "~/stores/user";
import type { Toast } from "~/types/ucomponents";
import type { Area } from "~/types/area";

export function useLoginForm(toast: Toast) {
  const loading = ref(false);
  const supabase = useSupabaseClient();
  const userStore = useUserStore();
  const router = useRouter();

  const submitForm = async (form: { email: string; password: string }) => {
    loading.value = true;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) {
        toast.add({
          title: "Login Error",
          description: error.message,
          color: "error",
        });
        return;
      }
      // Fetch user details from Supabase session
      const sessionUser = data?.user;
      if (sessionUser) {
        const { data: areaData } = await supabase
          .from("areas")
          .select("id, name")
          .eq("id", sessionUser.user_metadata?.area_id)
          .single<Area>();

        // Merge user_metadata into user object for store
        const user = {
          id: sessionUser.id,
          email: sessionUser.email,
          role: sessionUser.user_metadata?.role || "",
          full_name: sessionUser.user_metadata?.fullName || "",
          area: {
            id: areaData?.id || "",
            name: areaData?.name || "",
          },
        };

        userStore.setUser(user);
      }
      toast.add({
        title: "Login Successful",
        description: "Welcome back!",
        color: "success",
      });
      router.push("/");
    } catch (err: unknown) {
      let message = "An unknown error occurred.";
      if (err instanceof Error) {
        message = err.message;
      }
      toast.add({
        title: "Login Error",
        description: message,
        color: "error",
      });
    } finally {
      loading.value = false;
    }
  };

  return { loading, submitForm };
}
