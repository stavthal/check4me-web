<script setup lang="ts">
import { useFetchClientRequestDetails } from "~/composables/client/useFetchClientRequestDetails";
import AddReviewModal from "~/components/ClientRequests/AddReviewModal.vue";
import { ref, computed, onMounted } from "vue";
import { useSupabaseClient, useSupabaseUser } from "#imports";

definePageMeta({
  middleware: "auth",
  layout: "client",
});

const route = useRoute();
const router = useRouter();
const requestId = route.params.id as string;

const { loading, request, error, fetchRequestDetails } =
  useFetchClientRequestDetails();
const showReviewModal = ref(false);
const review = ref<{ rating: number; comment: string } | null>(null);
const user = useSupabaseUser();

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("el-GR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const goBack = () => {
  router.push("/dashboard/client");
};

// Fetch request details on mount
onMounted(() => {
  fetchRequestDetails(requestId);
  fetchReview();
});

const fetchReview = async () => {
  const supabase = useSupabaseClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("request_id", requestId)
    .limit(1);

  console.log("Fetched review data:", data, "Error:", error);
  if (!error && data && data.length > 0) {
    review.value = data[0];
  } else {
    review.value = null;
  }
};

const canReview = computed(() => {
  // Only allow review if there is no review and the request is eligible
  return !review.value && request.value && request.value.status === "COMPLETED";
});

const onReviewSubmitted = () => {
  fetchRequestDetails(requestId).then(() => {
    fetchReview();
    showReviewModal.value = false;
  });
};
</script>

<template>
  <div class="max-w-4xl p-6 mx-auto">
    <!-- Back Button -->
    <div class="mb-6">
      <UButton
        variant="ghost"
        color="neutral"
        leading-icon="i-lucide-arrow-left"
        @click="goBack"
      >
        Επιστροφή στα αιτήματα
      </UButton>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center h-64">
      <USpinner size="lg" />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="py-12 text-center">
      <UIcon
        name="i-lucide-alert-circle"
        class="w-12 h-12 mx-auto mb-4 text-red-500"
      />
      <h2 class="mb-2 text-xl font-semibold text-gray-900">Σφάλμα</h2>
      <p class="mb-4 text-gray-600">{{ error }}</p>
      <UButton @click="goBack">Επιστροφή</UButton>
    </div>

    <!-- Request Details -->
    <div v-else-if="request" class="space-y-6">
      <!-- Header -->
      <div class="p-6 bg-white border border-gray-200 rounded-lg">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h1 class="mb-2 text-2xl font-bold text-gray-900">
              {{ request.title }}
            </h1>
            <p class="text-sm text-gray-500">
              Δημιουργήθηκε στις {{ formatDate(request.created_at) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Status Card -->
      <ClientRequestsStatusCard :status="request.status" size="lg" />

      <!-- Vehicle Information -->
      <div class="p-6 bg-white border border-gray-200 rounded-lg">
        <h2 class="flex items-center mb-4 text-lg font-semibold text-gray-900">
          <UIcon name="i-lucide-car" class="w-5 h-5 mr-2" />
          Στοιχεία Οχήματος
        </h2>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label class="text-sm font-medium text-gray-500">Μάρκα</label>
            <p class="font-medium text-gray-900">{{ request.vehicle_make }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Μοντέλο</label>
            <p class="font-medium text-gray-900">{{ request.vehicle_model }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Έτος</label>
            <p class="font-medium text-gray-900">{{ request.year }}</p>
          </div>
        </div>
      </div>

      <!-- Details -->
      <div class="p-6 bg-white border border-gray-200 rounded-lg">
        <h2 class="flex items-center mb-4 text-lg font-semibold text-gray-900">
          <UIcon name="i-lucide-info" class="w-5 h-5 mr-2" />
          Λεπτομέρειες
        </h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label class="text-sm font-medium text-gray-500">Περιοχή</label>
            <p class="mt-1 text-gray-900">{{ request.location }}</p>
          </div>
          <div
            v-if="
              request.checker_full_name && request.checker_full_name !== '-'
            "
          >
            <label class="text-sm font-medium text-gray-500">Ελεγκτής</label>
            <p class="mt-1 text-gray-900">{{ request.checker_full_name }}</p>
          </div>
        </div>

        <div v-if="request.notes" class="mt-4">
          <label class="text-sm font-medium text-gray-500">Σημειώσεις</label>
          <p class="mt-1 text-gray-900 whitespace-pre-wrap">
            {{ request.notes }}
          </p>
        </div>

        <div v-if="request.listing_link" class="mt-4">
          <label class="text-sm font-medium text-gray-500"
            >Σύνδεσμος Αγγελίας</label
          >
          <div class="mt-1">
            <UButton
              :to="request.listing_link"
              external
              target="_blank"
              variant="outline"
              color="primary"
              leading-icon="i-lucide-external-link"
            >
              Προβολή Αγγελίας
            </UButton>
          </div>
        </div>

        <!-- Review Section -->
        <div class="mt-6">
          <template v-if="review">
            <div class="p-4 border border-yellow-200 rounded bg-yellow-50">
              <div class="flex items-center mb-2">
                <span class="mr-2 font-semibold">Η αξιολόγησή σας:</span>
                <span class="text-xl text-yellow-400">
                  <span v-for="star in review.rating" :key="star">★</span>
                  <span
                    v-for="star in 5 - review.rating"
                    :key="star + 'empty'"
                    class="text-gray-300"
                  >
                    ★
                  </span>
                </span>
              </div>
              <div class="text-gray-800 whitespace-pre-line">
                {{ review.comment }}
              </div>
            </div>
          </template>
          <template v-else-if="canReview">
            <UButton
              color="warning"
              variant="solid"
              size="lg"
              leading-icon="i-lucide-star"
              class="font-semibold transition-transform duration-150 shadow-md hover:scale-105"
              @click="showReviewModal = true"
            >
              Αξιολόγηση Ελεγκτή
            </UButton>
          </template>
        </div>
      </div>

      <!-- Photos Section -->
      <div
        v-if="request.photos && request.photos.length > 0"
        class="p-6 bg-white border border-gray-200 rounded-lg"
      >
        <h2 class="flex items-center mb-4 text-lg font-semibold text-gray-900">
          <UIcon name="i-lucide-camera" class="w-5 h-5 mr-2" />
          Φωτογραφίες ({{ request.photos.length }})
        </h2>
        <ClientRequestsPhotoGallerySecure :photos="request.photos" />
      </div>

      <!-- No Photos Message -->
      <div v-else class="p-6 bg-white border border-gray-200 rounded-lg">
        <h2 class="flex items-center mb-4 text-lg font-semibold text-gray-900">
          <UIcon name="i-lucide-camera" class="w-5 h-5 mr-2" />
          Φωτογραφίες
        </h2>
        <div class="py-8 text-center">
          <UIcon
            name="i-lucide-image-off"
            class="w-12 h-12 mx-auto mb-3 text-gray-400"
          />
          <p class="text-gray-500">
            Δεν υπάρχουν ακόμη φωτογραφίες για αυτό το αίτημα
          </p>
        </div>
      </div>

      <!-- Chat Section -->
      <div
        v-if="request.checker_id && request.status !== 'PENDING'"
        class="p-6 bg-white border border-gray-200 rounded-lg"
      >
        <h2 class="flex items-center mb-4 text-lg font-semibold text-gray-900">
          <UIcon name="i-lucide-message-circle" class="w-5 h-5 mr-2" />
          Συνομιλία με τον Ελεγκτή
        </h2>
        <RequestChat
          :request-id="request.id"
          current-user-type="client"
          :current-user-id="user?.id || ''"
        />
      </div>
    </div>

    <AddReviewModal
      v-if="showReviewModal && request"
      :show="showReviewModal"
      :request-id="request?.id"
      :checker-id="request?.checker_id"
      :client-id="user?.id ?? ''"
      @close="showReviewModal = false"
      @reviewed="onReviewSubmitted"
    />
  </div>
</template>
