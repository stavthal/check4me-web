import type { RequestRequest } from "~/types/request";
import decamelize from "decamelize-keys";

export const useSubmitClientRequest = () => {
  const loading = ref(false);
  const payload = ref<RequestRequest | null>(null);
  const errorMsg = ref<string | null>(null);
  const supabase = useSupabaseClient();

  const submitForm = async (request: RequestRequest) => {
    loading.value = true;
    errorMsg.value = null;
    payload.value = null;
    try {
      const deserializedData = decamelize(request);
      const { data, error } = await supabase
        .from("requests")
        .insert([deserializedData as never])
        .select()
        .single();
      if (error) {
        errorMsg.value = error.message;
        return { data: null, error };
      }
      payload.value = data;
      return { data, error: null };
    } catch (err: unknown) {
      if (err instanceof Error) {
        errorMsg.value = err.message;
        return { data: null, error: err };
      } else {
        errorMsg.value = "Unknown error";
        return { data: null, error: err };
      }
    } finally {
      loading.value = false;
    }
  };

  return { loading, submitForm, payload, errorMsg };
};
