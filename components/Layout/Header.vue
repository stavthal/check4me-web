<template>
  <div
    class="flex flex-row items-center justify-between px-4 py-4 border-b border-gray-100 shadow-md shadow-primary-200"
  >
    <div class="flex items-center space-x-8">
      <h1 class="text-3xl font-extralight text-primary">
        <NuxtLink to="/">Check4<span class="font-bold">Me</span></NuxtLink>
      </h1>
      <nav class="hidden md:flex space-x-6">
        <NuxtLink
          to="/blog"
          class="text-gray-700 hover:text-primary transition-colors"
        >
          Blog
        </NuxtLink>
        <NuxtLink
          v-if="userStore.user?.role === 'admin'"
          to="/admin/blog"
          class="text-gray-700 hover:text-primary transition-colors"
        >
          Διαχείριση Blog
        </NuxtLink>
      </nav>
    </div>
    <LayoutHeaderDropdown />
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
</script>
