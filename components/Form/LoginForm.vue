<script setup lang="ts">
const form = reactive({
  email: "",
  password: "",
});
const submitForm = () => {
  // Here you would typically handle form submission, e.g., send data to an API
  console.log("Form submitted:", form);
  // Reset the form after submission
  form.email = "";
  form.password = "";
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-2">
    <div
      class="form-container bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-sm"
    >
      <h1 class="font-bold text-xl mb-2">Login</h1>
      <UForm
        :state="form"
        class="flex flex-col gap-4"
        aria-label="Login Form"
        role="form"
        @submit.prevent="submitForm"
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

        <div class="flex flex-col mt-4 gap-2">
          <p class="text-sm text-gray-500 mt-2 text-center">
            Don't have an account?
            <NuxtLink to="/register" class="text-primary font-extrabold"
              >Register!</NuxtLink
            >
          </p>
          <UButton
            type="submit"
            color="primary"
            class="w-full items-center justify-center"
          >
            Login
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>
