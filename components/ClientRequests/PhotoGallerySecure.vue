<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import type { RequestPhoto } from "~/types/request";
import { usePhotoUrls } from "~/composables/usePhotoUrls";

const props = defineProps<{
  photos: readonly RequestPhoto[];
}>();

type PhotoWithSignedUrl = RequestPhoto & { signedUrl: string | null };

const selectedPhoto = ref<PhotoWithSignedUrl | null>(null);
const isModalOpen = ref(false);
const photosWithUrls = ref<PhotoWithSignedUrl[]>([]);
const loading = ref(true);

const { getSignedUrls } = usePhotoUrls();

const loadSignedUrls = async () => {
  if (props.photos.length === 0) {
    loading.value = false;
    return;
  }

  loading.value = true;
  try {
    photosWithUrls.value = await getSignedUrls([...props.photos]);
  } catch (error) {
    console.error("Error loading signed URLs:", error);
  } finally {
    loading.value = false;
  }
};

const openPhotoModal = (photo: PhotoWithSignedUrl) => {
  selectedPhoto.value = photo;
  isModalOpen.value = true;
};

const closePhotoModal = () => {
  selectedPhoto.value = null;
  isModalOpen.value = false;
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

// Load signed URLs when component mounts or photos change
onMounted(() => {
  loadSignedUrls();
});

watch(
  () => props.photos,
  () => {
    loadSignedUrls();
  },
  { deep: true }
);
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-8">
      <USpinner size="lg" />
      <span class="ml-2 text-gray-500">Φόρτωση φωτογραφιών...</span>
    </div>

    <!-- Photos Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="photo in photosWithUrls"
        :key="photo.id"
        class="group relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
        @click="openPhotoModal(photo)"
      >
        <div class="aspect-w-16 aspect-h-9 w-full h-48">
          <img
            v-if="photo.signedUrl"
            :src="photo.signedUrl"
            :alt="photo.filename"
            class="w-full h-full object-cover"
            loading="lazy"
          />
          <div
            v-else
            class="w-full h-full flex items-center justify-center bg-gray-100"
          >
            <UIcon name="i-lucide-image-off" class="h-8 w-8 text-gray-400" />
          </div>
        </div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <div class="absolute bottom-2 left-2 right-2">
            <p class="text-white text-sm font-medium truncate">
              {{ photo.filename }}
            </p>
            <p class="text-white/80 text-xs">
              {{ formatDate(photo.uploaded_at) }}
            </p>
          </div>
        </div>
        <div
          class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <UIcon name="i-lucide-maximize-2" class="text-white h-6 w-6" />
        </div>
      </div>
    </div>

    <!-- Photo Modal -->
    <UModal
      :open="isModalOpen"
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
              class="w-full h-64 flex items-center justify-center bg-gray-100"
            >
              <UIcon
                name="i-lucide-image-off"
                class="h-12 w-12 text-gray-400"
              />
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
            <h3 class="font-medium text-gray-900 mb-2">
              {{ selectedPhoto.filename }}
            </h3>
            <p class="text-sm text-gray-500">
              Ανέβηκε στις {{ formatDate(selectedPhoto.uploaded_at) }}
            </p>
            <div v-if="selectedPhoto.signedUrl" class="mt-3 flex space-x-2">
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
  </div>
</template>
