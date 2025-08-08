<template>
  <section
    class="py-20 bg-gradient-to-br from-gray-900 via-primary to-blue-800 text-white relative overflow-hidden"
  >
    <!-- Background decoration -->
    <div class="absolute inset-0 bg-grid-pattern opacity-10" />
    <div
      class="absolute top-0 left-0 w-96 h-96 bg-blue-500 opacity-20 rounded-full transform -translate-x-48 -translate-y-48"
    />
    <div
      class="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 opacity-20 rounded-full transform translate-x-48 translate-y-48"
    />

    <div class="container mx-auto px-4 relative">
      <div class="text-center max-w-4xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Βρες σήμερα τον φίλο που θα ελέγξει το νέο σου όχημα
        </h2>


        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <UButton
            size="xl"
            color="primary"
            class="px-8 py-4 text-lg font-semibold bg-white text-primary hover:bg-gray-100 shadow-2xl transform hover:scale-105 transition-all duration-200"
            to="/register"
          >
            <Icon name="lucide:search" class="mr-2" />
            Βρες Ελεγκτή
          </UButton>
          <UButton
            size="xl"
            variant="outline"
            color="primary"
            class="px-8 py-4 text-lg font-semibold border-white text-white hover:bg-white hover:text-primary shadow-2xl transform hover:scale-105 transition-all duration-200"
            to="/register"
          >
            <Icon name="lucide:shield-check" class="mr-2" />
            Γίνε Ελεγκτής
          </UButton>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.bg-grid-pattern {
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}
</style>
