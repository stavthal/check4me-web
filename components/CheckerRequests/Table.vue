<script setup lang="ts">
import { ref, computed, onMounted, h, resolveComponent } from "vue";
import { useFetchCheckerRequests } from "~/composables/checker/useFetchCheckerRequests";
import RequestDetailsModal from "~/components/CheckerRequests/RequestDetailsModal.vue";
import PhotoUploadModal from "~/components/CheckerRequests/PhotoUploadModal.vue";
import type { RequestWithClient } from "~/types/request";

const UBadge = resolveComponent("UBadge");

const columns = [
  {
    accessorKey: "created_at",
    header: "Ημερομηνία",
    cell: ({ row }: { row: { getValue: (key: string) => unknown } }) =>
      new Date(row.getValue("created_at") as string).toLocaleString("el-GR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
  },
  {
    accessorKey: "title",
    header: "Τίτλος",
  },
  {
    accessorKey: "vehicle_make",
    header: "Μάρκα",
  },
  {
    accessorKey: "vehicle_model",
    header: "Μοντέλο",
  },
  {
    accessorKey: "year",
    header: "Έτος",
  },
  {
    accessorKey: "location",
    header: "Περιοχή",
  },
  {
    accessorKey: "listing_link",
    header: "Link",
    cell: ({ row }: { row: { getValue: (key: string) => unknown } }) =>
      h(
        "a",
        {
          href: row.getValue("listing_link") as string,
          target: "_blank",
          class: "text-primary underline",
        },
        "Προβολή"
      ),
  },
  {
    accessorKey: "client.full_name",
    header: "Πελάτης",
  },
  {
    accessorKey: "status",
    header: "Κατάσταση",
    cell: ({ row }: { row: { getValue: (key: string) => unknown } }) => {
      const status = row.getValue("status") as string;
      const statusColors: Record<string, string> = {
        PENDING: "warning",
        APPROVED: "success",
        REJECTED: "error",
      };
      const color = statusColors[status] || "neutral";
      return h(
        UBadge,
        { class: "capitalize", variant: "subtle", color },
        () => status
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ενέργειες",
    cell: ({
      row,
    }: {
      row: { getValue: (key: string) => unknown; original: RequestWithClient };
    }) => {
      const status = row.getValue("status") as string;
      if (status === "PENDING") {
        return h(
          "button",
          {
            class:
              "u-btn u-btn-primary text-xs px-2 py-1 rounded bg-primary text-white hover:bg-primary-dark transition",
            onClick: () => openDetailsModal(row.original),
          },
          "Προβολή Αιτήματος"
        );
      }
      return null;
    },
  },
];

const { requests, loading, fetchRequests } = useFetchCheckerRequests();
const data = computed(() => requests.value);

const isDetailsModalOpen = ref(false);
const selectedRequest = ref<RequestWithClient | null>(null);

const openDetailsModal = (request: RequestWithClient) => {
  selectedRequest.value = request;
  isDetailsModalOpen.value = true;
};
const closeDetailsModal = () => {
  isDetailsModalOpen.value = false;
  selectedRequest.value = null;
};

const isUploadModalOpen = ref(false);
const openUploadModal = () => {
  isUploadModalOpen.value = true;
};
const closeUploadModal = () => {
  isUploadModalOpen.value = false;
};

onMounted(() => {
  fetchRequests();
});
</script>

<template>
  <div class="px-4">
    <h1 class="mb-4 text-2xl font-bold">Τα αιτήματα σου</h1>

    <div v-if="loading" class="flex items-center justify-center h-64">
      <USpinner />
    </div>
    <div v-else-if="!data.length" class="flex items-center justify-center h-64">
      <p class="text-gray-500">Δεν υπάρχουν αιτήματα.</p>
    </div>
    <UTable
      :data="data"
      :columns="columns"
      class="flex-1 border border-gray-300 rounded-xl"
    />
    <RequestDetailsModal
      :open="isDetailsModalOpen"
      :request="selectedRequest"
      @close="closeDetailsModal"
      @upload-photos="openUploadModal"
    />
    <PhotoUploadModal
      :open="isUploadModalOpen"
      :request="selectedRequest"
      @close="closeUploadModal"
    />
  </div>
</template>
