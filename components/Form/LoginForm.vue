<script setup lang="ts">
import { useLoginForm } from "~/composables/useLoginForm";

const form = reactive({
  email: "",
  password: "",
});

const toast = useToast();
const { loading, submitForm } = useLoginForm(toast);
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-2">
    <div
      class="w-full max-w-sm p-6 rounded-lg shadow-md form-container bg-gray-50"
    >
      <h1 class="mb-2 text-xl font-bold">Σύνδεση</h1>
      <UForm
        :state="form"
        class="flex flex-col gap-4"
        aria-label="Login Form"
        role="form"
        @submit.prevent="submitForm(form)"
      >
        <UFormField label="Email" for="email" class="w-full">
          <UInput
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Εισάγετε το email σας"
            class="w-full"
            trailing-icon="i-heroicons-envelope-solid"
            required
          />
        </UFormField>
        <UFormField label="Κωδικός" for="password" class="w-full">
          <UInput
            id="password"
            v-model="form.password"
            trailing-icon="i-heroicons-lock-closed-solid"
            type="password"
            placeholder="Εισάγετε τον κωδικό σας"
            class="w-full"
            required
          />
        </UFormField>

        <div class="flex flex-col gap-2 mt-4">
          <p class="mt-2 text-sm text-center text-gray-500">
            Δεν έχετε λογαριασμό;
            <NuxtLink to="/register" class="font-extrabold text-primary"
              >Εγγραφή!</NuxtLink
            >
          </p>
          <UButton
            type="submit"
            color="primary"
            class="items-center justify-center w-full"
            :loading="loading"
          >
            Σύνδεση
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>
