<!-- This file is the modal that pops up when a user wants to review
 a checker. In order for this modal to come up, the request must have
 a status of COMPLETED, and there must be no other review in the database
 regarding the checker and the request (One review per request and of course per checker,as there can only be one checker per request)
  -->

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 class="mb-4 text-xl font-semibold">Αξιολογήστε τον ελεγκτή</h2>
      <form @submit.prevent="submitReview">
        <div class="mb-4">
          <label class="block mb-1 font-medium">Βαθμολογία</label>
          <div class="flex space-x-1">
            <button
              v-for="star in 5"
              :key="star"
              type="button"
              @click="rating = star"
              :class="rating >= star ? 'text-yellow-400' : 'text-gray-300'"
              class="text-2xl focus:outline-none"
            >
              ★
            </button>
          </div>
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-medium" for="comment">Σχόλιο</label>
          <textarea
            id="comment"
            v-model="comment"
            class="w-full p-2 border rounded"
            rows="3"
            placeholder="Γράψτε τα σχόλιά σας..."
            required
          ></textarea>
        </div>
        <div class="flex justify-end space-x-2">
          <UButton
            type="button"
            color="neutral"
            variant="outline"
            class="px-4 py-2"
            @click="$emit('close')"
          >
            Ακύρωση
          </UButton>
          <UButton
            type="submit"
            color="primary"
            :loading="loading"
            :disabled="loading || rating === 0"
            class="px-4 py-2"
          >
            Υποβολή
          </UButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSubmitReview } from "~/composables/client/useSubmitReview";

const props = defineProps<{
  show: boolean;
  requestId: number;
  checkerId: string;
  clientId: string;
}>();
const emit = defineEmits(["close", "reviewed"]);

const rating = ref(0);
const comment = ref("");
const loading = ref(false);

const toast = useToast();

const submitReview = async () => {
  if (rating.value === 0 || !comment.value.trim()) return;
  loading.value = true;
  try {
    await useSubmitReview({
      requestId: props.requestId,
      checkerId: props.checkerId,
      clientId: props.clientId,
      rating: rating.value,
      comment: comment.value,
    });
    emit("reviewed");
    emit("close");
  } catch {
    toast.add({
      title: "Σφάλμα κατά την υποβολή της αξιολόγησης.",
      description: "Παρακαλώ δοκιμάστε ξανά.",
      color: "error",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
