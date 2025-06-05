<script setup lang="ts">
import { useAsyncData } from "#app";
import { ref, computed, reactive } from "vue";
import type { TabsItem } from "@nuxt/ui";
import type { Toast } from "~/types/ucomponents";

definePageMeta({ middleware: "auth" });

const toast = useToast();

const items = ref<TabsItem[]>([
  {
    label: "Client",
    icon: "i-lucide-user",
    slot: "client" as const,
  },
  {
    label: "Checker",
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
  area_id: "",
});

const clientForm = reactive({
  role: "client",
  fullName: "",
  email: "",
  password: "",
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
    <div class="left-div !bg-primary max-sm:hidden"></div>
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
            Welcome, please fill in your details to register as a
            {{ item?.label?.toLowerCase() }}.
          </p>
          <UForm
            :state="checkerForm"
            class="flex flex-col gap-4"
            @submit.prevent="submitForm(checkerForm)"
          >
            <UFormField label="Full Name" type="text" name="fullName">
              <UInput
                v-model="checkerForm.fullName"
                class="w-full"
                placeholder="Enter your full name"
                required
                :disabled="loading"
              />
            </UFormField>
            <UFormField label="Email" type="email" name="email">
              <UInput
                v-model="checkerForm.email"
                class="w-full"
                placeholder="Enter your email"
                required
                :disabled="loading"
              />
            </UFormField>
            <UFormField label="Password" type="password" name="password">
              <UInput
                v-model="checkerForm.password"
                class="w-full"
                placeholder="Enter your password"
                required
                type="password"
                :disabled="loading"
              />
            </UFormField>
            <UFormField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            >
              <UInput
                v-model="checkerForm.confirmPassword"
                class="w-full"
                placeholder="Confirm your password"
                required
                type="password"
                :disabled="loading"
              />
            </UFormField>
            <UFormField label="Area" name="area">
              <USelect
                v-model="checkerForm.area_id"
                class="w-full"
                :items="
                  areas.map((area) => ({ value: area.id, label: area.name }))
                "
                placeholder="Select your area"
                required
                :disabled="loading"
              />
            </UFormField>
            <UButton
              type="submit"
              color="primary"
              class="items-center justify-center w-full"
              :disabled="loading"
              >Register as Checker</UButton
            >
            <!-- Navigate to Login -->
            <div class="flex flex-col gap-2 mt-4">
              <p class="mt-2 text-sm text-center text-gray-500">
                Already have an account?
                <NuxtLink to="/login" class="font-extrabold text-primary"
                  >Login!</NuxtLink
                >
              </p>
            </div>
          </UForm>
        </template>

        <!-- Client Form -->
        <template #client="{ item }: { item: TabsItem }">
          <p class="my-2 italic text-gray-400">
            Welcome, please fill in your details to register as a
            {{ item?.label?.toLowerCase() }}.
          </p>
          <UForm
            :state="clientForm"
            class="flex flex-col gap-4"
            @submit.prevent="submitForm(clientForm)"
          >
            <UFormField label="Full Name" type="text" name="fullName">
              <UInput
                v-model="clientForm.fullName"
                class="w-full"
                placeholder="Enter your full name"
                required
                :disabled="loading"
              />
            </UFormField>
            <UFormField label="Email" type="email" name="email">
              <UInput
                v-model="clientForm.email"
                class="w-full"
                placeholder="Enter your email"
                required
                :disabled="loading"
              />
            </UFormField>
            <UFormField label="Password" type="password" name="password">
              <UInput
                v-model="clientForm.password"
                class="w-full"
                placeholder="Enter your password"
                required
                type="password"
                :disabled="loading"
              />
            </UFormField>
            <UFormField label="Confirm Password" name="confirmPassword">
              <UInput
                v-model="clientForm.confirmPassword"
                class="w-full"
                placeholder="Confirm your password"
                required
                type="password"
                :disabled="loading"
              />
            </UFormField>
            <UFormField label="Area" name="area">
              <USelect
                v-model="clientForm.area_id"
                class="w-full"
                :items="
                  areas.map((area) => ({ value: area.id, label: area.name }))
                "
                placeholder="Select your area"
                required
                :disabled="loading"
              />
            </UFormField>
            <UButton
              type="submit"
              class="items-center justify-center w-full"
              color="primary"
              :disabled="loading"
              >Register as Client</UButton
            >

            <!-- Navigate to Login -->
            <div class="flex flex-col gap-2 mt-4">
              <p class="mt-2 text-sm text-center text-gray-500">
                Already have an account?
                <NuxtLink to="/login" class="font-extrabold text-primary"
                  >Login!</NuxtLink
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
