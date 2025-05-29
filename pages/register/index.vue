<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

const items = ref<TabsItem[]>([
  {
    label: "Client",
    icon: "i-lucide-user",
    content: "This is the account content.",
  },
  {
    label: "Checker",
    icon: "i-lucide-lock",
    content: "This is the password content.",
  },
]);
</script>

<template>
  <div class="container">
    <div class="left-div">
      <h1>Εγγραφή</h1>
    </div>
    <div class="right-div bg-primary">
      <UTabs :items="items" class="tabs" color="primary" />
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

.tabs {
}
</style>
