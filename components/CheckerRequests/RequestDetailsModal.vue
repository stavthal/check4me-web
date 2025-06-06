<script setup lang="ts">
import type { RequestWithClient } from "~/types/request";

defineProps<{
  open: boolean;
  request: RequestWithClient | null;
}>();

const emit = defineEmits(["close", "upload-photos"]);
</script>

<template>
  <UModal
    :open="open"
    title="Λεπτομέρειες Αιτήματος"
    :close="{ onClick: () => emit('close') }"
  >
    <template #body>
      <div v-if="request">
        <div class="mb-2">
          <b>Ημερομηνία:</b>
          {{ new Date(request.created_at).toLocaleString("el-GR") }}
        </div>
        <div class="mb-2"><b>Τίτλος:</b> {{ request.title }}</div>
        <div class="mb-2"><b>Μάρκα:</b> {{ request.vehicle_make }}</div>
        <div class="mb-2"><b>Μοντέλο:</b> {{ request.vehicle_model }}</div>
        <div class="mb-2"><b>Έτος:</b> {{ request.year }}</div>
        <div class="mb-2"><b>Περιοχή:</b> {{ request.location }}</div>
        <div class="mb-2"><b>Σημειώσεις:</b> {{ request.notes }}</div>
        <div class="mb-2">
          <b>Link:</b>
          <a
            :href="request.listing_link"
            target="_blank"
            class="underline text-primary"
            >Προβολή</a
          >
        </div>
        <div class="mb-2"><b>Checker:</b> {{ request.checker_full_name }}</div>
        <div class="mb-2"><b>Κατάσταση:</b> {{ request.status }}</div>
        <UButton class="mt-4" @click="emit('upload-photos')"
          >Upload Photos</UButton
        >
      </div>
    </template>
  </UModal>
</template>
