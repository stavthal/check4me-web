<template>
  <DevOnly>
    <div>
      <div class="devlinks-div">
        <h2 class="devlinks-header">DEV LINKS</h2>
        <NuxtLink to="/register">Register</NuxtLink>
        <NuxtLink to="/login">Login</NuxtLink>
        <NuxtLink to="/dashboard/client">Client Dashboard</NuxtLink>
        <NuxtLink to="/dashboard/checker">Checker Dashboard</NuxtLink>
        <NuxtLink to="/blog">Blog</NuxtLink>
        <h2 class="devlinks-header">Admin only</h2>
        <NuxtLink to="/admin/blog">Blog Management</NuxtLink>
        <NuxtLink to="/admin/blog/create">Create Blog Post</NuxtLink>
        <NuxtLink to="/admin/blog/preview/1">Preview Blog Post</NuxtLink>
        <UButton @click="onLogout">Logout</UButton>
      </div>
    </div>
  </DevOnly>
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
// definePageMeta({ middleware: "auth" });
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
