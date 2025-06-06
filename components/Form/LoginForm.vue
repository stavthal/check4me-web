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
      <h1 class="mb-2 text-xl font-bold">Login</h1>
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
            placeholder="Enter your email"
            class="w-full"
            trailing-icon="i-heroicons-envelope-solid"
            required
          />
        </UFormField>
        <UFormField label="Password" for="password" class="w-full">
          <UInput
            id="password"
            v-model="form.password"
            trailing-icon="i-heroicons-lock-closed-solid"
            type="password"
            placeholder="Enter your password"
            class="w-full"
            required
          />
        </UFormField>

        <div class="flex flex-col gap-2 mt-4">
          <p class="mt-2 text-sm text-center text-gray-500">
            Don't have an account?
            <NuxtLink to="/register" class="font-extrabold text-primary"
              >Register!</NuxtLink
            >
          </p>
          <UButton
            type="submit"
            color="primary"
            class="items-center justify-center w-full"
            :loading="loading"
          >
            Login
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>
