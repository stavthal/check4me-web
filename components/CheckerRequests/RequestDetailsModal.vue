<script setup lang="ts">
import type { RequestWithClient } from "~/types/request";

const props = defineProps<{
  open: boolean;
  request: RequestWithClient | null;
}>();

const emit = defineEmits(["close", "upload-photos"]);

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
};
</script>

<template>
  <UModal
    :open="props.open"
    title="Λεπτομέρειες Αιτήματος"
    :close="{ onClick: () => emit('close') }"
    :ui="{ wrapper: 'max-w-lg', body: 'bg-white rounded-xl p-0' }"
  >
    <template #body>
      <div v-if="props.request" class="p-0">
        <div class="flex flex-col gap-4 p-6 md:flex-row">
          <div class="flex flex-col flex-1 gap-2">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-lg font-bold text-primary">{{
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
            <div class="mb-2 text-sm text-gray-500">
              <i class="mr-1 i-lucide-calendar" />
              {{ new Date(props.request.created_at).toLocaleString("el-GR") }}
            </div>
            <div class="grid grid-cols-2 text-sm gap-x-4 gap-y-2">
              <div>
                <span class="font-semibold">Μάρκα:</span>
                {{ props.request.vehicle_make }}
              </div>
              <div>
                <span class="font-semibold">Μοντέλο:</span>
                {{ props.request.vehicle_model }}
              </div>
              <div>
                <span class="font-semibold">Έτος:</span>
                {{ props.request.year }}
              </div>
              <div>
                <span class="font-semibold">Περιοχή:</span>
                {{ props.request.location }}
              </div>
              <div class="col-span-2">
                <span class="font-semibold">Σημειώσεις:</span>
                {{ props.request.notes }}
              </div>
              <div class="col-span-2">
                <span class="font-semibold">Link:</span>
                <a
                  :href="props.request.listing_link"
                  target="_blank"
                  class="ml-1 underline text-primary"
                  >Προβολή</a
                >
              </div>
            </div>
            <div class="flex items-center gap-2 mt-4">
              <UAvatar
                icon="i-lucide-user"
                size="sm"
                class="bg-primary-100 text-primary"
              />
              <span class="font-medium">Πελάτης:</span>
              <span>{{ props?.request?.client?.full_name }}</span>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-2 px-6 pb-4">
          <UButton
            color="primary"
            icon="i-lucide-upload"
            variant="solid"
            @click="emit('upload-photos')"
          >
            Ανέβασμα Φωτογραφιών
          </UButton>
          <UButton color="neutral" variant="ghost" @click="emit('close')">
            Κλείσιμο
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
