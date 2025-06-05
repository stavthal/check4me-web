<template>
  <div>
    <DevOnly>
      <div>
        <div class="devlinks-div">
          <h2 class="devlinks-header">DEV LINKS</h2>
          <NuxtLink to="/register">Register</NuxtLink>
          <NuxtLink to="/login">Login</NuxtLink>
          <NuxtLink to="/dashboard/client">Client Dashboard</NuxtLink>
          <NuxtLink to="/dashboard/checker">Checker Dashboard</NuxtLink>
          <UButton @click="onLogout">Logout</UButton>
        </div>
      </div>
    </DevOnly>

    <div class="flex flex-col items-center justify-center min-h-screen p-2">
      <div
        class="w-full max-w-sm p-6 rounded-lg shadow-md form-container bg-gray-50"
      >
        <h1 class="mb-2 text-xl font-bold">Welcome to the Home Page</h1>
        <p class="text-gray-600">This is the home page of your application.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();

const onLogout = async () => {
  console.log("Logging out...");
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error logging out:", error.message);
  } else {
    console.log("Logged out successfully");
    // Optionally, redirect to the login page or home page
    useRouter().push("/login");
  }
};
definePageMeta({ middleware: "auth" });
</script>

<style scoped>
.devlinks-header {
  color: blue;
  font-weight: bold;
}

.devlinks-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
</style>
