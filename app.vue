<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
// Hydrate user store globally so it's available everywhere
const { loading: _loading } = useHydrateUserStore();
</script>
