<template>
  <section
    class="relative py-20 overflow-hidden bg-gradient-to-br from-primary-50 to-blue-100 md:py-32"
  >
    <div class="container px-4 mx-auto">
      <div class="flex flex-col items-center gap-12 lg:flex-row">
        <!-- Content -->
        <div class="flex-1 text-center lg:text-left">
          <h1
            class="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl"
          >
            Βρήκες <span class="text-primary">μεταχειρισμένο</span> όχημα αλλά είναι σε <span class="text-primary">άλλη πόλη</span>;
          </h1>
          <p class="max-w-2xl mb-8 text-xl text-gray-600">
            Ζήτησε από έναν φίλο να δει το όχημα από κοντά! Το Check4me συνδέει ανθρώπους με αγάπη και ενδιαφέρον για τα αυτοκίνητα και τις μοτοσικλέτες, με ανθρώπους σε αναζήτησή για το καινούργιο τους όχημα.
          </p>

          <div
            class="flex flex-col justify-center gap-4 mb-8 sm:flex-row lg:justify-start"
          >
            <UButton
              size="xl"
              color="primary"
              class="px-8 py-4 text-lg font-semibold"
              to="/register"
            >
              <Icon name="lucide:search" class="mr-2" />
              Βρες Ελεγκτή
            </UButton>
            <UButton
              size="xl"
              variant="outline"
              color="primary"
              class="px-8 py-4 text-lg font-semibold"
              to="/register"
            >
              <Icon name="lucide:shield-check" class="mr-2" />
              Γίνε Ελεγκτής
            </UButton>
          </div>

        </div>

        <!-- Image/Visual -->
        <div class="relative flex-1">
          <div class="relative w-full max-w-lg mx-auto">
            <!-- Main car image placeholder -->
            <div
              class="p-8 transition-transform duration-300 transform bg-white shadow-2xl rounded-2xl rotate-3 hover:rotate-0"
            >
              <div
                class="flex items-center justify-center aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl"
              >
                <Icon name="lucide:car" class="w-24 h-24 text-gray-400" />
              </div>
              <div class="mt-4 space-y-2">
                <div class="w-3/4 h-4 bg-gray-200 rounded" />
                <div class="w-1/2 h-4 bg-gray-200 rounded" />
              </div>
            </div>

            <!-- Floating elements -->
            <div
              class="absolute px-3 py-2 text-white transform bg-green-500 rounded-lg shadow-lg -top-4 -right-4 rotate-12"
            >
              <Icon name="lucide:shield-check" class="w-5 h-5" />
            </div>
            <div
              class="absolute px-4 py-2 text-white transform rounded-lg shadow-lg -bottom-4 -left-4 bg-primary -rotate-6"
            >
              ✓ Εγκρίθηκε
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Background decorations -->
    <div
      class="absolute top-0 right-0 transform translate-x-32 -translate-y-32 rounded-full w-96 h-96 bg-primary opacity-5"
    />
    <div
      class="absolute bottom-0 left-0 transform -translate-x-32 translate-y-32 bg-blue-500 rounded-full w-96 h-96 opacity-5"
    />
  </section>
</template>

<script setup lang="ts">
</script>
