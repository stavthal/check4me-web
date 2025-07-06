<script setup lang="ts">
definePageMeta({ middleware: "auth" });

const { user } = useUserStore();
const { loading } = useHydrateUserStore();
const router = useRouter();

// Redirect non-admin users
onMounted(() => {
  if (user && user.role !== "admin") {
    router.push("/dashboard/" + user.role);
  }
});
</script>

<template>
  <div>
    <div v-if="loading">Loading user...</div>
    <template v-else>
      <p class="welcome-heading">
        Welcome Admin,
        <span class="user-name">{{ user?.full_name || "Guest" }}</span>
      </p>

      <div class="mt-8">
        <h2 class="mb-4 text-2xl font-semibold">Admin Dashboard</h2>
        <p class="text-gray-600">
          Admin functionality will be implemented here.
        </p>

        <!-- Placeholder for admin features -->
        <div class="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
          <div class="p-6 bg-white border rounded-lg shadow-md">
            <h3 class="mb-2 text-lg font-semibold">Manage Users</h3>
            <p class="text-gray-600">View and manage user accounts</p>
          </div>

          <div class="p-6 bg-white border rounded-lg shadow-md">
            <h3 class="mb-2 text-lg font-semibold">System Settings</h3>
            <p class="text-gray-600">Configure system-wide settings</p>
          </div>

          <div class="p-6 bg-white border rounded-lg shadow-md">
            <h3 class="mb-2 text-lg font-semibold">Reports</h3>
            <p class="text-gray-600">View system reports and analytics</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.welcome-heading {
  font-size: 1.5rem;
  font-weight: 300;
  color: #374151;
}

.user-name {
  font-weight: 600;
  color: var(--color-primary-500);
}
</style>
