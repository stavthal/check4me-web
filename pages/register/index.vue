<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="left-div">
      <h1>Εγγραφή</h1>
    </div>
    <div class="">
      <!-- Tabs for Different types of users -->
      <TabsRoot>
        <TabsList>
          <TabsTrigger value="checker" />
          <TabsTrigger value="client" />
          <TabsIndicator />
        </TabsList>
        <TabsContent value="checker">
          <h2>Εγγραφή Ελεγκτή</h2>
          <p>Εδώ θα είναι η φόρμα εγγραφής για ελεγκτές.</p>
        </TabsContent>
      </TabsRoot>
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
  width: 50%;
  height: 100vh;
  background-color: #ffffff;
  float: right;
}
</style>
