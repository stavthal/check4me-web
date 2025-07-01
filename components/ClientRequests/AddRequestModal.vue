<script setup lang="ts">
import { reactive } from "vue";
import { z } from "zod";
import type { Area } from "~/types/area";
import type { RequestRequest } from "~/types/request";
import type { CheckerSelect } from "~/types/checker";

interface Props {
  isOpen: boolean;
  onClose: (event: MouseEvent) => void;
}
const props = defineProps<Props>();

const user = useSupabaseUser();

const formData = reactive<RequestRequest>({
  title: "",
  vehicleMake: "",
  vehicleModel: "",
  year: undefined,
  location: "",
  status: "PENDING",
  listingLink: "",
  areaId: "",
  clientId: user.value?.id,
  checkerId: "",
  notes: "",
});

const { areas } = await useFetchAreas();

const toast = useToast();

const schema = z.object({
  title: z.string().min(1, "Απαιτείται τίτλος."),
  vehicleMake: z.string().min(1, "Απαιτείται μάρκα."),
  vehicleModel: z.string().min(1, "Απαιτείται μοντέλο."),
  year: z.coerce
    .number({ invalid_type_error: "Απαιτείται έτος (αριθμός)." })
    .int("Απαιτείται έτος (αριθμός)."),
  location: z.string().min(1, "Απαιτείται τοποθεσία."),
  status: z.string().optional(),
  listingLink: z.string().min(1, "Απαιτείται link αγγελίας."),
  areaId: z.number().optional(),
  clientId: z.string().optional(),
  checkerId: z.string().optional(),
  notes: z.string().min(1, "Απαιτούνται σημειώσεις."),
});

const errors = reactive<Record<string, string>>({});

const { pending, submitForm, errorMsg } = useSubmitClientRequest();

const { fetch, checkers } = useFetchCheckersByArea();

console.log(checkers.value);

const onSelect = async () => {
  await fetch(formData.areaId);
  console.log("Selected area:", formData.areaId);
  console.log("Checkers in area:", checkers.value);
  if (checkers.value.length === 0) {
    toast.add({ title: "No checkers found in this area.", color: "warning" });
  } else {
    toast.add({ title: "Checkers loaded successfully.", color: "success" });
  }
};

const onSubmit = async () => {
  const result = schema.safeParse(formData);
  console.log(formData);
  console.log(result);
  if (!result.success) {
    // Populate errors object with zod errors
    console.error("Validation errors:", result.error.flatten());

    Object.keys(errors).forEach((key) => (errors[key] = ""));
    for (const issue of result.error.issues) {
      errors[issue.path[0]] = issue.message;
    }
    return;
  }
  // Clear errors if valid
  Object.keys(errors).forEach((key) => (errors[key] = ""));
  await submitForm(formData);

  // Reset form data after submission
  formData.title = "";
  formData.vehicleMake = "";
  formData.vehicleModel = "";
  formData.year = undefined;
  formData.location = "";
  formData.status = "PENDING";
  formData.listingLink = "";
  formData.areaId = "";

  // Close the modal after submission
  props.onClose(new MouseEvent("onClick"));
  toast.add({ title: "Request submitted successfully!", color: "success" });
};
</script>

<template>
  <UModal :open="isOpen" title="Νέο αίτημα" :close="{ onClick: props.onClose }">
    <template #body>
      <UForm
        :state="formData"
        class="flex flex-col gap-2 px-4 py-2"
        @submit.prevent="onSubmit"
      >
        <UFormField label="Τίτλος" name="title" :error="errors.title">
          <UInput
            icon="i-lucide-captions"
            v-model="formData.title"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Μάρκα οχήματος"
          name="vehicleMake"
          :error="errors.vehicleMake"
        >
          <UInput
            icon="i-lucide-car"
            v-model="formData.vehicleMake"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Μοντέλο οχήματος"
          name="vehicleModel"
          :error="errors.vehicleModel"
        >
          <UInput
            icon="i-lucide-component"
            v-model="formData.vehicleModel"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Χρονολογία οχήματος"
          name="year"
          :error="errors.year"
        >
          <UInput
            icon="i-lucide-calendar"
            v-model="formData.year"
            type="number"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Περιοχή">
          <USelect
            v-model="formData.areaId"
            class="w-full"
            :items="areas.map((area: Area) => ({ value: area.id, label: area.name }))"
            @change="onSelect"
          />
        </UFormField>
        <!-- Επιλογή Checker -->
        <UFormField
          v-if="checkers?.length > 0"
          label="Επιλογή Ελεγκτή"
          name="checkerId"
        >
          <USelect
            v-model="formData.checkerId"
            class="w-full"
            placeholder="Επιλέξτε έναν ελεγκτή"
            :items="
              checkers?.map((checker: CheckerSelect) => ({
                value: checker.id,
                label: checker.full_name,
              }))
            "
          />
        </UFormField>
        <UFormField label="Τοποθεσία" name="location" :error="errors.location">
          <UInput
            icon="i-lucide-map-pin"
            v-model="formData.location"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Link αγγελίας"
          name="listingLink"
          :error="errors.listingLink"
        >
          <UInput
            icon="i-lucide-link"
            v-model="formData.listingLink"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Σημειώσεις για τον ελεγκτή"
          name="notes"
          :error="errors.notes"
        >
          <UTextarea v-model="formData.notes" class="w-full" />
        </UFormField>
        <div class="flex justify-center gap-4 mt-4">
          <UButton
            type="submit"
            :loading="pending"
            :disabled="pending"
            color="primary"
            class="w-1/3 text-center"
          >
            Υποβολή
          </UButton>
          <UButton
            type="button"
            color="neutral"
            variant="outline"
            @click="props.onClose"
            class="w-1/3 text-center"
          >
            Ακύρωση
          </UButton>
        </div>
        <div v-if="errorMsg" class="mt-2 text-sm text-red-500">
          {{ errorMsg }}
        </div>
      </UForm>
    </template>
  </UModal>
</template>
