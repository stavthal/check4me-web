<template>
  <div>
    <div class="devlinks-div">
      <h2 class="devlinks-header">DEV LINKS</h2>
      <NuxtLink to="/register">Register</NuxtLink>
      <NuxtLink to="/login">Login</NuxtLink>
    </div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
    <NuxtPage />
  </div>
</template>

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
