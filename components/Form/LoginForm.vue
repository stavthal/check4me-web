<script setup lang="ts">
const form = reactive({
  email: "",
  password: "",
});

const supabase = useSupabaseClient();

const loading = ref(false);

const toast = useToast();

const submitForm = () => {
  loading.value = true;
  supabase.auth
    .signInWithPassword({
      email: form.email,
      password: form.password,
    })
    .then(({ error }) => {
      if (error) {
        toast.add({
          title: "Login Error",
          description: error.message,
          color: "error",
        });
      } else {
        toast.add({
          title: "Login Successful",
          description: "Welcome back!",
          color: "success",
        });
        navigateTo("/");
      }
    })
    .catch((err) => {
      toast.add({
        title: "Login Error",
        description: err.message,
        color: "error",
      });
    })
    .finally(() => {
      loading.value = false;
    });
};
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
          >
            Login
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>
