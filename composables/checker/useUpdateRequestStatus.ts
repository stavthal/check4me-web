export const useUpdateRequestStatus = () => {
  const supabase = useSupabaseClient();
  const updating = ref(false);

  const updateStatus = async (requestId: number, newStatus: string) => {
    updating.value = true;

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from("requests")
        .update({ status: newStatus })
        .eq("id", requestId);

      if (error) {
        throw new Error(`Failed to update status: ${error.message}`);
      }

      return { success: true, error: null };
    } catch (error) {
      console.error("Error updating request status:", error);
      return { success: false, error };
    } finally {
      updating.value = false;
    }
  };

  const markAsCompleted = async (requestId: number) => {
    return await updateStatus(requestId, "COMPLETED");
  };

  const markAsApproved = async (requestId: number) => {
    return await updateStatus(requestId, "APPROVED");
  };

  const markAsRejected = async (requestId: number) => {
    return await updateStatus(requestId, "REJECTED");
  };

  return {
    updating,
    updateStatus,
    markAsCompleted,
    markAsApproved,
    markAsRejected,
  };
};
