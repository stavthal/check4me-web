<script setup lang="ts">
import { ref } from "vue";
import { usePhotoUpload } from "~/composables/checker/usePhotoUpload";
import type { RequestWithClient } from "~/types/request";

const props = defineProps<{
  open: boolean;
  request: RequestWithClient | null;
}>();

const emit = defineEmits(["close"]);

const { uploading, uploadPhotos } = usePhotoUpload();
const selectedFiles = ref<File[]>([]);
const toast = useToast();

const onFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    selectedFiles.value = Array.from(target.files);
  }
};

const onUpload = async () => {
  if (!props.request || selectedFiles.value.length === 0) {
    toast.add({
      title: "Σφάλμα",
      description: "Παρακαλώ επιλέξτε τουλάχιστον μία φωτογραφία",
      color: "error",
    });
    return;
  }

  try {
    await uploadPhotos(props.request.id, selectedFiles.value);
    toast.add({
      title: "Επιτυχία",
      description: "Οι φωτογραφίες ανέβηκαν επιτυχώς!",
      color: "success",
    });
    selectedFiles.value = [];
    emit("close");
  } catch (error: unknown) {
    console.error("Upload error:", error);
    toast.add({
      title: "Σφάλμα",
      description: "Αποτυχία ανεβάσματος φωτογραφιών",
      color: "error",
    });
  }
};

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1);
};

const formatFileSize = (bytes: number) => {
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(1)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
</script>

<template>
  <UModal
    :open="props.open"
    title="Ανέβασμα Φωτογραφιών"
    :close="{ onClick: () => emit('close') }"
    :ui="{ wrapper: 'max-w-2xl' }"
  >
    <template #body>
      <div v-if="props.request" class="space-y-4 p-6">
        <div class="text-center">
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            Αίτημα: {{ props.request.title }}
          </h3>
          <p class="text-sm text-gray-500">
            {{ props.request.vehicle_make }}
            {{ props.request.vehicle_model }} ({{ props.request.year }})
          </p>
        </div>

        <div
          class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
        >
          <div class="space-y-2">
            <UIcon
              name="i-lucide-upload-cloud"
              class="mx-auto h-12 w-12 text-gray-400"
            />
            <div class="text-sm text-gray-600">
              <label
                for="file-upload"
                class="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark"
              >
                <span>Επιλέξτε φωτογραφίες</span>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  class="sr-only"
                  @change="onFileSelect"
                />
              </label>
              <p class="pl-1">ή σύρετε και αφήστε</p>
            </div>
            <p class="text-xs text-gray-500">
              PNG, JPG, GIF έως 10MB το καθένα
            </p>
          </div>
        </div>

        <!-- Selected Files -->
        <div v-if="selectedFiles.length > 0" class="space-y-3">
          <h4 class="text-sm font-medium text-gray-900">
            Επιλεγμένες φωτογραφίες:
          </h4>
          <div class="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
            <div
              v-for="(file, index) in selectedFiles"
              :key="index"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <UIcon
                  name="i-lucide-file-image"
                  class="h-5 w-5 text-gray-400"
                />
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    {{ file.name }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ formatFileSize(file.size) }}
                  </p>
                </div>
              </div>
              <UButton
                color="error"
                variant="ghost"
                size="xs"
                @click="removeFile(index)"
              >
                <UIcon name="i-lucide-trash-2" class="h-4 w-4" />
              </UButton>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-3 pt-4 border-t">
          <UButton
            color="neutral"
            variant="ghost"
            :disabled="uploading"
            @click="emit('close')"
          >
            Ακύρωση
          </UButton>
          <UButton
            color="primary"
            :loading="uploading"
            :disabled="selectedFiles.length === 0"
            @click="onUpload"
          >
            Ανέβασμα
            {{ selectedFiles.length > 0 ? `(${selectedFiles.length})` : "" }}
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
