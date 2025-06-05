<script setup lang="ts">
// Define or import TableColumn type
type TableColumn = {
  key: string;
  label: string;
};

defineProps<{
  columns: TableColumn[];
  data: any[];
}>();
</script>

<template>
  <div class="px-4">
    <div>
      <UButton leading-icon="i-lucide-plus" class="float-right"
        >New Request</UButton
      >
    </div>
    <h1 class="mb-4 text-2xl font-bold">Your Requests</h1>
    <UTable
      :data="data"
      :columns="columns"
      class="flex-1 border border-gray-300 rounded-xl"
    />
  </div>
</template>
