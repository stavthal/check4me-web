<script setup lang="ts">
import { useFetchClientRequests } from "~/composables/client/useFetchClientRequests";
const UBadge = resolveComponent("UBadge");

defineProps<{
  onNewRequest: () => void;
}>();

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
    accessorKey: "notes",
    header: "Σημειώσεις",
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
    accessorKey: "checker_full_name",
    header: "Checker",
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
];

const { requests, loading, fetchRequests } = useFetchClientRequests();
const data = computed(() => requests.value);

onMounted(() => {
  fetchRequests();
});
</script>

<template>
  <div class="px-4">
    <div>
      <UButton
        leading-icon="i-lucide-plus"
        class="float-right"
        @click="onNewRequest"
        >Νέο αίτημα</UButton
      >
    </div>
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
  </div>
</template>
