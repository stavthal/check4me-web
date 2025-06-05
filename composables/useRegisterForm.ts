import { ref } from "vue";
import { useSupabaseClient } from "#imports";
import type { Toast } from "~/types/ucomponents";

type RegisterForm = {
  email: string;
  password: string;
  fullName: string;
  area_id: string;
  role: string;
};

export function useRegisterForm(toast: Toast) {
  const loading = ref(false);

  const router = useRouter();

  const submitForm = async (form: RegisterForm) => {
    loading.value = true;
    const supabase = useSupabaseClient();
    try {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            fullName: form.fullName,
            area_id: form.area_id,
            role: form.role,
          },
        },
      });

      toast.add({
        title: "Registration successful! Please check your email to confirm.",
        color: "success",
      });
      router.push("/login");

      if (error) {
        if (
          error.message?.toLowerCase().includes("user already registered") ||
          error.message?.toLowerCase().includes("user already exists") ||
          error.status === 400
        ) {
          toast.add({
            title: "A user with this email already exists.",
            color: "warning",
          });
        } else {
          throw error;
        }
        return;
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.add({
        title: "Registration failed. Please try again.",
        color: "error",
      });
    } finally {
      loading.value = false;
    }
  };

  return { loading, submitForm };
}
