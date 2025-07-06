<script setup lang="ts">
import type { RequestWithPhotos, RequestPhoto } from "~/types/request";
import { useUpdateRequestStatus } from "~/composables/checker/useUpdateRequestStatus";
import { usePhotoUrls } from "~/composables/usePhotoUrls";
import { ref, watch, onMounted } from "vue";

const props = defineProps<{
  open: boolean;
  request: RequestWithPhotos | null;
}>();

const emit = defineEmits(["close", "upload-photos", "status-updated"]);

const { updating, markAsCompleted } = useUpdateRequestStatus();
const { getSignedUrls } = usePhotoUrls();
const toast = useToast();
const user = useSupabaseUser();

// Photo handling
type PhotoWithSignedUrl = RequestPhoto & { signedUrl: string | null };
const selectedPhoto = ref<PhotoWithSignedUrl | null>(null);
const isPhotoModalOpen = ref(false);
const photosWithUrls = ref<PhotoWithSignedUrl[]>([]);
const loadingPhotos = ref(false);

const loadSignedUrls = async () => {
  if (!props.request?.photos || props.request.photos.length === 0) {
    loadingPhotos.value = false;
    return;
  }

  loadingPhotos.value = true;
  try {
    photosWithUrls.value = await getSignedUrls([...props.request.photos]);
  } catch (error) {
    console.error("Error loading signed URLs:", error);
  } finally {
    loadingPhotos.value = false;
  }
};

const openPhotoModal = (photo: PhotoWithSignedUrl) => {
  selectedPhoto.value = photo;
  isPhotoModalOpen.value = true;
};

const closePhotoModal = () => {
  selectedPhoto.value = null;
  isPhotoModalOpen.value = false;
};

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

const openInNewTab = (url: string) => {
  if (import.meta.client) {
    window.open(url, "_blank");
  }
};

// Watch for request changes to load photos
watch(
  () => props.request?.photos,
  () => {
    if (props.open && props.request?.photos) {
      loadSignedUrls();
    }
  },
  { immediate: true, deep: true }
);

// Watch for modal open to load photos
watch(
  () => props.open,
  (isOpen) => {
    if (isOpen && props.request?.photos) {
      loadSignedUrls();
    }
  }
);

export type UBadgeColor =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "error";

const statusColors: Record<string, UBadgeColor> = {
  PENDING: "warning",
  APPROVED: "success",
  REJECTED: "error",
  COMPLETED: "success",
};

const onMarkAsCompleted = async () => {
  if (!props.request) return;

  const result = await markAsCompleted(parseInt(props.request.id));

  if (result.success) {
    toast.add({
      title: "Επιτυχία",
      description: "Το αίτημα σημειώθηκε ως ολοκληρωμένο!",
      color: "success",
    });
    emit("status-updated");
    emit("close");
  } else {
    toast.add({
      title: "Σφάλμα",
      description: "Αποτυχία ενημέρωσης κατάστασης",
      color: "error",
    });
  }
};
</script>

<template>
  <UModal
    :open="props.open"
    title="Λεπτομέρειες Αιτήματος"
    :close="{ onClick: () => emit('close') }"
    :ui="{
      wrapper: 'max-w-5xl max-h-[90vh] overflow-y-auto',
      body: 'bg-white rounded-xl p-0',
    }"
  >
    <template #body>
      <div v-if="props.request" class="p-0">
        <!-- Request Details Section -->
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center gap-2 mb-4">
            <span class="text-xl font-bold text-primary">{{
              props.request.title
            }}</span>
            <UBadge
              :color="statusColors[props.request.status] ?? 'neutral'"
              variant="subtle"
              class="capitalize"
            >
              {{ props.request.status }}
            </UBadge>
          </div>

          <div class="mb-4 text-sm text-gray-500">
            <UIcon name="i-lucide-calendar" class="inline w-4 h-4 mr-1" />
            {{ new Date(props.request.created_at).toLocaleString("el-GR") }}
          </div>

          <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <!-- Vehicle Details -->
            <div>
              <h4 class="mb-3 font-semibold text-gray-900">
                Στοιχεία Οχήματος
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="font-medium text-gray-600">Μάρκα:</span>
                  <span>{{ props.request.vehicle_make }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium text-gray-600">Μοντέλο:</span>
                  <span>{{ props.request.vehicle_model }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium text-gray-600">Έτος:</span>
                  <span>{{ props.request.year }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium text-gray-600">Περιοχή:</span>
                  <span>{{ props.request.location }}</span>
                </div>
              </div>
            </div>

            <!-- Request Details -->
            <div>
              <h4 class="mb-3 font-semibold text-gray-900">
                Λεπτομέρειες Αιτήματος
              </h4>
              <div class="space-y-2 text-sm">
                <div>
                  <span class="font-medium text-gray-600">Σημειώσεις:</span>
                  <p class="mt-1 text-gray-900">{{ props.request.notes }}</p>
                </div>
                <div>
                  <span class="font-medium text-gray-600">Link:</span>
                  <a
                    :href="props.request.listing_link"
                    target="_blank"
                    class="ml-1 underline text-primary hover:text-primary-600"
                  >
                    Προβολή Αγγελίας
                  </a>
                </div>
                <div class="flex items-center gap-2 mt-3">
                  <UAvatar
                    icon="i-lucide-user"
                    size="sm"
                    class="bg-primary-100 text-primary"
                  />
                  <span class="font-medium text-gray-600">Πελάτης:</span>
                  <span>{{ props?.request?.client?.full_name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Photos Section -->
        <div
          v-if="props.request?.photos && props.request.photos.length > 0"
          class="p-6 border-b border-gray-200"
        >
          <h3
            class="flex items-center mb-4 text-lg font-semibold text-gray-900"
          >
            <UIcon name="i-lucide-camera" class="w-5 h-5 mr-2" />
            Φωτογραφίες Ελέγχου ({{ props.request.photos.length }})
          </h3>

          <!-- Loading State -->
          <div
            v-if="loadingPhotos"
            class="flex items-center justify-center py-8"
          >
            <USpinner size="lg" />
            <span class="ml-2 text-gray-500">Φόρτωση φωτογραφιών...</span>
          </div>

          <!-- Photos Grid -->
          <div
            v-else
            class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
          >
            <div
              v-for="photo in photosWithUrls"
              :key="photo.id"
              class="relative overflow-hidden transition-all duration-200 transform border border-gray-200 rounded-lg cursor-pointer group bg-gray-50 hover:scale-105 hover:shadow-lg"
              @click="openPhotoModal(photo)"
            >
              <div class="w-full h-24 aspect-w-16 aspect-h-9">
                <img
                  v-if="photo.signedUrl"
                  :src="photo.signedUrl"
                  :alt="photo.filename"
                  class="object-cover w-full h-full"
                  loading="lazy"
                />
                <div
                  v-else
                  class="flex items-center justify-center w-full h-full bg-gray-100"
                >
                  <UIcon
                    name="i-lucide-image-off"
                    class="w-8 h-8 text-gray-400"
                  />
                </div>
              </div>
              <div
                class="absolute inset-0 transition-opacity duration-200 opacity-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100"
              >
                <div class="absolute bottom-1 left-1 right-1">
                  <p class="text-xs font-medium text-white truncate">
                    {{ photo.filename }}
                  </p>
                </div>
              </div>
              <div
                class="absolute inset-0 flex items-center justify-center transition-opacity duration-200 opacity-0 group-hover:opacity-100"
              >
                <UIcon name="i-lucide-maximize-2" class="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Section -->
        <div v-if="props.request?.status !== 'PENDING'">
          <h3
            class="flex items-center mt-4 mb-4 text-lg font-semibold text-gray-900"
          >
            <UIcon name="i-lucide-message-circle" class="w-5 h-5 mr-2" />
            Συνομιλία με τον Πελάτη
          </h3>
          <div class="h-64">
            <RequestChat
              :request-id="props.request.id"
              current-user-type="checker"
              :current-user-id="user?.id || ''"
            />
          </div>
        </div>

        <!-- Action Buttons -->
        <div
          class="flex justify-end gap-2 px-6 py-6 mt-40 border-t border-gray-200 bg-gray-50"
        >
          <UButton
            v-if="props.request?.status === 'PENDING'"
            color="success"
            icon="i-lucide-check-circle"
            variant="solid"
            :loading="updating"
            :disabled="updating"
            @click="onMarkAsCompleted"
          >
            Σημείωση ως Ολοκληρωμένο
          </UButton>
          <UButton
            color="primary"
            icon="i-lucide-upload"
            variant="solid"
            :disabled="updating"
            @click="emit('upload-photos')"
          >
            Ανέβασμα Φωτογραφιών
          </UButton>
          <UButton
            color="neutral"
            variant="ghost"
            :disabled="updating"
            @click="emit('close')"
          >
            Κλείσιμο
          </UButton>
        </div>
      </div>
    </template>
  </UModal>

  <!-- Photo Modal -->
  <UModal
    :open="isPhotoModalOpen"
    :ui="{ wrapper: 'max-w-4xl' }"
    @close="closePhotoModal"
  >
    <template #body>
      <div v-if="selectedPhoto" class="p-0">
        <div class="relative">
          <img
            v-if="selectedPhoto.signedUrl"
            :src="selectedPhoto.signedUrl"
            :alt="selectedPhoto.filename"
            class="w-full max-h-[70vh] object-contain bg-gray-100"
          />
          <div
            v-else
            class="flex items-center justify-center w-full h-64 bg-gray-100"
          >
            <UIcon name="i-lucide-image-off" class="w-12 h-12 text-gray-400" />
          </div>
          <UButton
            variant="solid"
            color="neutral"
            class="absolute top-4 right-4 bg-black/50 hover:bg-black/70"
            leading-icon="i-lucide-x"
            @click="closePhotoModal"
          />
        </div>
        <div class="p-4 border-t border-gray-200">
          <h3 class="mb-2 font-medium text-gray-900">
            {{ selectedPhoto.filename }}
          </h3>
          <p class="text-sm text-gray-500">
            Ανέβηκε στις {{ formatDate(selectedPhoto.uploaded_at) }}
          </p>
          <div v-if="selectedPhoto.signedUrl" class="flex mt-3 space-x-2">
            <UButton
              variant="outline"
              color="primary"
              leading-icon="i-lucide-download"
              :to="selectedPhoto.signedUrl"
              external
              target="_blank"
            >
              Λήψη
            </UButton>
            <UButton
              variant="outline"
              color="neutral"
              leading-icon="i-lucide-external-link"
              @click="() => openInNewTab(selectedPhoto?.signedUrl || '')"
            >
              Άνοιγμα σε νέα καρτέλα
            </UButton>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>
