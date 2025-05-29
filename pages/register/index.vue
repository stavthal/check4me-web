<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

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
});

const clientForm = reactive({
  role: "client",
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const submitForm = (form: typeof checkerForm | typeof clientForm) => {
  // Here you would typically handle form submission, e.g., send data to an API
  console.log("Form submitted:", form);
  // Reset the form after submission
  form.fullName = "";
  form.email = "";
  form.password = "";
  form.confirmPassword = "";
};
</script>

<template>
  <div class="container">
    <div class="left-div">
      <h1>Εγγραφή</h1>
    </div>
    <div class="right-div bg-primary">
      <UTabs
        :items="items"
        color="primary"
        :ui="{ trigger: 'grow' }"
        class="w-full"
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
              />
            </UFormField>
            <UFormField label="Email" type="email" name="email">
              <UInput
                v-model="checkerForm.email"
                class="w-full"
                placeholder="Enter your email"
                required
              />
            </UFormField>
            <UFormField label="Password" type="password" name="password">
              <UInput
                v-model="checkerForm.password"
                class="w-full"
                placeholder="Enter your password"
                required
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
              />
            </UFormField>

            <UButton
              type="submit"
              color="primary"
              class="w-full justify-center items-center"
              >Register as Checker</UButton
            >
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
              />
            </UFormField>
            <UFormField label="Email" type="email" name="email">
              <UInput
                v-model="clientForm.email"
                class="w-full"
                placeholder="Enter your email"
                required
              />
            </UFormField>
            <UFormField label="Password" type="password" name="password">
              <UInput
                v-model="clientForm.password"
                class="w-full"
                placeholder="Enter your password"
                required
              />
            </UFormField>
            <UFormField label="Confirm Password" name="confirmPassword">
              <UInput
                v-model="clientForm.confirmPassword"
                class="w-full"
                placeholder="Confirm your password"
                required
              />
            </UFormField>

            <UButton
              type="submit"
              class="w-full justify-center items-center"
              color="primary"
              >Register as Client</UButton
            >
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
  padding: 8rem;
}
</style>
