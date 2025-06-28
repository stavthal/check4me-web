<script setup lang="ts">
defineProps<{
  status: string;
  size?: "sm" | "md" | "lg";
}>();

const getStatusColor = (
  status: string
):
  | "error"
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "neutral" => {
  const statusColors: Record<
    string,
    | "error"
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "neutral"
  > = {
    PENDING: "warning",
    APPROVED: "success",
    REJECTED: "error",
    COMPLETED: "primary",
  };
  return statusColors[status] || "neutral";
};

const getStatusText = (status: string) => {
  const statusTexts: Record<string, string> = {
    PENDING: "Σε αναμονή",
    APPROVED: "Εγκρίθηκε",
    REJECTED: "Απορρίφθηκε",
    COMPLETED: "Ολοκληρώθηκε",
  };
  return statusTexts[status] || status;
};

const getStatusIcon = (status: string) => {
  const statusIcons: Record<string, string> = {
    PENDING: "i-lucide-clock",
    APPROVED: "i-lucide-check-circle",
    REJECTED: "i-lucide-x-circle",
    COMPLETED: "i-lucide-check-circle-2",
  };
  return statusIcons[status] || "i-lucide-help-circle";
};

const getStatusDescription = (status: string) => {
  const descriptions: Record<string, string> = {
    PENDING:
      "Το αίτημά σας έχει υποβληθεί και αναμένει έγκριση από έναν ελεγκτή.",
    APPROVED: "Το αίτημά σας έχει εγκριθεί και έχει ανατεθεί σε ελεγκτή.",
    REJECTED: "Το αίτημά σας έχει απορριφθεί.",
    COMPLETED:
      "Ο έλεγχος έχει ολοκληρωθεί και οι φωτογραφίες είναι διαθέσιμες.",
  };
  return descriptions[status] || "";
};
</script>

<template>
  <div
    class="flex items-start space-x-3 p-4 rounded-lg border"
    :class="{
      'bg-yellow-50 border-yellow-200': getStatusColor(status) === 'warning',
      'bg-green-50 border-green-200': getStatusColor(status) === 'success',
      'bg-red-50 border-red-200': getStatusColor(status) === 'error',
      'bg-blue-50 border-blue-200': getStatusColor(status) === 'primary',
      'bg-gray-50 border-gray-200': getStatusColor(status) === 'neutral',
    }"
  >
    <UIcon
      :name="getStatusIcon(status)"
      :class="{
        'text-yellow-600': getStatusColor(status) === 'warning',
        'text-green-600': getStatusColor(status) === 'success',
        'text-red-600': getStatusColor(status) === 'error',
        'text-blue-600': getStatusColor(status) === 'primary',
        'text-gray-600': getStatusColor(status) === 'neutral',
        'h-5 w-5': size !== 'lg',
        'h-6 w-6': size === 'lg',
      }"
    />
    <div class="flex-1">
      <div class="flex items-center space-x-2">
        <h3
          :class="{
            'text-sm font-medium': size !== 'lg',
            'text-base font-semibold': size === 'lg',
          }"
        >
          Κατάσταση:
        </h3>
        <UBadge
          :color="getStatusColor(status)"
          variant="subtle"
          :size="size || 'md'"
        >
          {{ getStatusText(status) }}
        </UBadge>
      </div>
      <p
        v-if="getStatusDescription(status)"
        :class="{
          'text-xs text-gray-600 mt-1': size !== 'lg',
          'text-sm text-gray-600 mt-2': size === 'lg',
        }"
      >
        {{ getStatusDescription(status) }}
      </p>
    </div>
  </div>
</template>
