<script setup lang="ts">
import { ref } from "vue";
import type { RequestPhoto } from "~/types/request";

defineProps<{
  photos: readonly RequestPhoto[];
}>();

const selectedPhoto = ref<RequestPhoto | null>(null);
const isModalOpen = ref(false);

const openPhotoModal = (photo: RequestPhoto) => {
  selectedPhoto.value = photo;
  isModalOpen.value = true;
};

const closePhotoModal = () => {
  selectedPhoto.value = null;
  isModalOpen.value = false;
};

const openInNewTab = (url: string) => {
  if (import.meta.client && selectedPhoto.value) {
    window.open(url, "_blank");
  }
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
</script>

<template>
  <div>
    <!-- Photos Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="photo in photos"
        :key="photo.id"
        class="group relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
        @click="openPhotoModal(photo)"
      >
        <div class="aspect-w-16 aspect-h-9 w-full h-48">
          <img
            :src="photo.photo_url"
            :alt="photo.filename"
            class="w-full h-full object-cover"
            loading="lazy"
          />
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
              :src="selectedPhoto.photo_url"
              :alt="selectedPhoto.filename"
              class="w-full max-h-[70vh] object-contain bg-gray-100"
            />
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
            <div class="mt-3 flex space-x-2">
              <UButton
                variant="outline"
                color="primary"
                leading-icon="i-lucide-download"
                :to="selectedPhoto.photo_url"
                external
                target="_blank"
              >
                Λήψη
              </UButton>
              <UButton
                variant="outline"
                color="neutral"
                leading-icon="i-lucide-external-link"
                @click="() => openInNewTab(selectedPhoto?.photo_url || '')"
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
