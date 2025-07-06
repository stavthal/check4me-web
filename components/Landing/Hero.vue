<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-primary-50 to-blue-100 py-20 md:py-32">
    <div class="container mx-auto px-4">
      <div class="flex flex-col lg:flex-row items-center gap-12">
        <!-- Content -->
        <div class="flex-1 text-center lg:text-left">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Αξιόπιστος <span class="text-primary">έλεγχος</span><br>
            μεταχειρισμένων <span class="text-primary">οχημάτων</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-2xl">
            Συνδέουμε αγοραστές με εξειδικευμένους ελεγκτές για την ασφαλή αγορά 
            μεταχειρισμένων αυτοκινήτων και μοτοσικλετών σε όλη την Ελλάδα.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
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

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
            <div class="text-center lg:text-left">
              <div class="text-2xl font-bold text-primary">500+</div>
              <div class="text-sm text-gray-600">Ολοκληρωμένοι Έλεγχοι</div>
            </div>
            <div class="text-center lg:text-left">
              <div class="text-2xl font-bold text-primary">50+</div>
              <div class="text-sm text-gray-600">Πιστοποιημένοι Ελεγκτές</div>
            </div>
            <div class="text-center lg:text-left">
              <div class="text-2xl font-bold text-primary">98%</div>
              <div class="text-sm text-gray-600">Ικανοποίηση Πελατών</div>
            </div>
          </div>
        </div>

        <!-- Image/Visual -->
        <div class="flex-1 relative">
          <div class="relative w-full max-w-lg mx-auto">
            <!-- Main car image placeholder -->
            <div class="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div class="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                <Icon name="lucide:car" class="w-24 h-24 text-gray-400" />
              </div>
              <div class="mt-4 space-y-2">
                <div class="h-4 bg-gray-200 rounded w-3/4" />
                <div class="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
            
            <!-- Floating elements -->
            <div class="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-2 rounded-lg shadow-lg transform rotate-12">
              <Icon name="lucide:shield-check" class="w-5 h-5" />
            </div>
            <div class="absolute -bottom-4 -left-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg transform -rotate-6">
              ✓ Εγκρίθηκε
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Background decorations -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-primary opacity-5 rounded-full transform translate-x-32 -translate-y-32" />
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 opacity-5 rounded-full transform -translate-x-32 translate-y-32" />
  </section>
</template>

<script setup lang="ts">
</script>
