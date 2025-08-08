<script setup lang="ts">
import { useAsyncData } from "#app";
import { ref, computed, reactive } from "vue";
import type { TabsItem } from "@nuxt/ui";
import type { Toast } from "~/types/ucomponents";

definePageMeta({ middleware: "auth" });

const toast = useToast();

const items = ref<TabsItem[]>([
  {
    label: "Πελάτης",
    icon: "i-lucide-user",
    slot: "client" as const,
  },
  {
    label: "Ελεγκτής",
    icon: "simple-icons:lucide",
    slot: "checker" as const,
  },
]);

const checkerForm = reactive({
  role: "checker",
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  location: "",
  area_id: "",
});

const clientForm = reactive({
  role: "client",
  fullName: "",
  email: "",
  password: "",
  location: "",
  confirmPassword: "",
  area_id: "",
});

type Area = { id: string; name: string };

const { data: fetchedAreas } = await useAsyncData<Area[]>("areas", async () => {
  const supabase = useSupabaseClient();

  const { data, error } = await supabase.from("areas").select("id, name");
  if (error) {
    console.error("Error fetching areas:", error.message);
    return [];
  }
  return data as Area[];
});

const areas = computed(() => fetchedAreas.value ?? []);

// Add loading ref
const loading = ref(false);

const submitForm = async (form: typeof checkerForm | typeof clientForm) => {
  const { loading, submitForm } = useRegisterForm(toast as Toast);
  try {
    await submitForm(form);
  } catch (error) {
    console.error("Registration error:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container">
    <div class="left-div !bg-primary max-sm:hidden" />
    <div class="right-div max-sm:!w-full !flex-col">
      <h1 class="mb-12 text-5xl font-bold">Check4Me</h1>
      <UTabs
        :items="items"
        color="primary"
        :ui="{ trigger: 'grow' }"
        class="w-full"
        :disabled="loading"
      >
        <!-- Checker Form -->
        <template #checker="{ item }: { item: TabsItem }">
          <p class="my-2 italic text-gray-400">
            Καλώς ήρθατε, παρακαλώ συμπληρώστε τα στοιχεία σας για εγγραφή ως
            {{ item?.label?.toLowerCase() }}.
          </p>
          <UForm
            :state="checkerForm"
            class="flex flex-col gap-4"
            @submit.prevent="submitForm(checkerForm)"
          >
            <UFormField label="Ονοματεπώνυμο" type="text" name="fullName">
              <UInput
                v-model="checkerForm.fullName"
                class="w-full"
                placeholder="Εισάγετε το ονοματεπώνυμό σας"
                required
                :disabled="loading"
              />
            </UFormField>
            <UFormField label="Email" type="email" name="email">
              <UInput
                v-model="checkerForm.email"
                class="w-full"
                placeholder="Εισάγετε το email σας"
                required
                :disabled="loading"
              />
            </UFormField>
            <UFormField label="Κωδικός" type="password" name="password">
              <UInput
                v-model="checkerForm.password"
                class="w-full"
                placeholder="Εισάγετε τον κωδικό σας"
                required
                type="password"
                :disabled="loading"
              />
            </UFormField>
            <UFormField
              label="Επιβεβαίωση Κωδικού"
              name="confirmPassword"
              type="password"
            >
              <UInput
                v-model="checkerForm.confirmPassword"
                class="w-full"
                placeholder="Επιβεβαιώστε τον κωδικό σας"
                required
                type="password"
                :disabled="loading"
              />
            </UFormField>
            <UFormField label="Περιοχή" name="area">
              <USelect
                v-model="checkerForm.area_id"
                class="w-full"
                :items="
                  areas.map((area) => ({ value: area.id, label: area.name }))
                "
                placeholder="Επιλέξτε την περιοχή σας"
                required
                :disabled="loading"
              />
            </UFormField>
            <UFormField label="Τοποθεσία" name="location">
              <UInput
                v-model="checkerForm.location"
                class="w-full"
                placeholder="Εισάγετε την τοποθεσία σας"
                required
                :disabled="loading"
              />
            </UFormField>
            <UButton
              type="submit"
              color="primary"
              class="items-center justify-center w-full"
              :loading="loading"
              :disabled="loading"
              >Εγγραφή ως Ελεγκτής</UButton
            >
            <!-- Navigate to Login -->
            <div class="flex flex-col gap-2 mt-4">
              <p class="mt-2 text-sm text-center text-gray-500">
                Έχετε ήδη λογαριασμό;
                <NuxtLink to="/login" class="font-extrabold text-primary"
                  >Σύνδεση!</NuxtLink
                >
              </p>
            </div>
          </UForm>
        </template>

        <!-- Client Form -->
        <template #client="{ item }: { item: TabsItem }">
          <p class="my-2 italic text-gray-400">
            Καλώς ήρθατε, παρακαλώ συμπληρώστε τα στοιχεία σας για εγγραφή ως
            {{ item?.label?.toLowerCase() }}.
          </p>
          <UForm
            :state="clientForm"
            class="flex flex-col gap-4"
            @submit.prevent="submitForm(clientForm)"
          >
            <UFormField label="Ονοματεπώνυμο" type="text" name="fullName">
              <UInput
                v-model="clientForm.fullName"
                class="w-full"
                placeholder="Εισάγετε το ονοματεπώνυμό σας"
                required
                :disabled="loading"
              />
            </UFormField>
            <UFormField label="Email" type="email" name="email">
              <UInput
                v-model="clientForm.email"
                class="w-full"
                placeholder="Εισάγετε το email σας"
                required
                :disabled="loading"
              />
            </UFormField>
            <UFormField label="Κωδικός" type="password" name="password">
              <UInput
                v-model="clientForm.password"
                class="w-full"
                placeholder="Εισάγετε τον κωδικό σας"
                required
                type="password"
                :disabled="loading"
              />
            </UFormField>
            <UFormField label="Επιβεβαίωση Κωδικού" name="confirmPassword">
              <UInput
                v-model="clientForm.confirmPassword"
                class="w-full"
                placeholder="Επιβεβαιώστε τον κωδικό σας"
                required
                type="password"
                :disabled="loading"
              />
            </UFormField>
            <UFormField label="Περιοχή" name="area">
              <USelect
                v-model="clientForm.area_id"
                class="w-full"
                :items="
                  areas.map((area) => ({ value: area.id, label: area.name }))
                "
                placeholder="Επιλέξτε την περιοχή σας"
                required
                :disabled="loading"
              />
            </UFormField>
            <UFormField label="Τοποθεσία" name="location">
              <UInput
                v-model="clientForm.location"
                class="w-full"
                placeholder="Εισάγετε την τοποθεσία σας"
                required
                :disabled="loading"
              />
            </UFormField>
            <UButton
              type="submit"
              class="items-center justify-center w-full"
              color="primary"
              :disabled="loading"
              >Εγγραφή ως Πελάτης</UButton
            >

            <!-- Navigate to Login -->
            <div class="flex flex-col gap-2 mt-4">
              <p class="mt-2 text-sm text-center text-gray-500">
                Έχετε ήδη λογαριασμό;
                <NuxtLink to="/login" class="font-extrabold text-primary"
                  >Σύνδεση!</NuxtLink
                >
              </p>
            </div>
          </UForm>
        </template>
      </UTabs>
    </div>
  </div>
</template>

<style scoped>
.left-div {
  width: 50%;
  height: 100vh;
  background-color: #f0f0f0;
  float: left;
}
.right-div {
  display: flex;
  width: 50%;
  height: 100vh;
  background-color: #ffffff;
  float: right;
  justify-content: center;
  align-items: center;
  padding: 32px;
}
</style>
