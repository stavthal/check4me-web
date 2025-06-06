<script setup lang="ts">
// Define or import TableColumn type
type TableColumn = {
  key: string;
  label: string;
};

defineProps<{
  columns: TableColumn[];
  data: any[];
  onNewRequest: () => void;
}>();
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
    <UTable
      :data="data"
      :columns="columns"
      class="flex-1 border border-gray-300 rounded-xl"
    />
  </div>
</template>
