<script setup lang="ts">
import type { RequestWithClient } from "~/types/request";
import { useUpdateRequestStatus } from "~/composables/checker/useUpdateRequestStatus";

const props = defineProps<{
  open: boolean;
  request: RequestWithClient | null;
}>();

const emit = defineEmits(["close", "upload-photos", "status-updated"]);

const { updating, markAsCompleted } = useUpdateRequestStatus();
const toast = useToast();
const user = useSupabaseUser();

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

  const result = await markAsCompleted(props.request.id);

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
          <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            <div
              v-for="photo in props.request.photos"
              :key="photo.id"
              class="relative cursor-pointer group"
            >
              <img
                :src="photo.photo_url"
                :alt="photo.filename"
                class="object-cover w-full h-24 transition-colors border border-gray-200 rounded-lg hover:border-primary-300"
              />
              <div
                class="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-0 rounded-lg group-hover:bg-opacity-20"
              >
                <UIcon
                  name="i-lucide-expand"
                  class="w-6 h-6 text-white transition-opacity opacity-0 group-hover:opacity-100"
                />
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
</template>
