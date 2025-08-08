<template>
  <section class="py-20 bg-gradient-to-br from-blue-50 via-white to-primary-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Τι είναι το Check4Me;
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Η πρώτη ψηφιακή πλατφόρμα που συνδέει αγοραστές μεταχειρισμένων οχημάτων 
          με πιστοποιημένους ελεγκτές σε όλη την Ελλάδα
        </p>
      </div>

      <!-- Main content grid -->
      <div class="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        <!-- Left side - Content -->
        <div class="space-y-8">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
              <Icon name="lucide:target" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">
                Η Αποστολή μας
              </h3>
              <p class="text-gray-600 leading-relaxed">
                Να κάνουμε την αγορά μεταχειρισμένων οχημάτων ασφαλή, διαφανή και αξιόπιστη. 
                Συνδέουμε ανθρώπους που αναζητούν το επόμενο όχημά τους με έμπειρους ελεγκτές 
                που μπορούν να τους βοηθήσουν να πάρουν τη σωστή απόφαση.
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
              <Icon name="lucide:users" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">
                Για ποιους είμαστε
              </h3>
              <p class="text-gray-600 leading-relaxed">
                Για κάθε αγοραστή που θέλει να αποφύγει κρυφά προβλήματα και για κάθε 
                έμπειρο επαγγελματία που θέλει να μοιραστεί τις γνώσεις του και να 
                βοηθήσει άλλους να κάνουν ασφαλείς αγορές.
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
              <Icon name="lucide:shield-check" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">
                Γιατί να μας εμπιστευτείς
              </h3>
              <p class="text-gray-600 leading-relaxed">
                Με αυστηρά κριτήρια επιλογής ελεγκτών, διαφανή διαδικασίες και 
                αξιολογήσεις από πραγματικούς χρήστες, εξασφαλίζουμε την υψηλότερη 
                ποιότητα υπηρεσιών.
              </p>
            </div>
          </div>
        </div>

        <!-- Right side - Visual elements -->
        <div class="relative">
          <div class="bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
            <!-- Mock interface -->
            <div class="space-y-6">
              <div class="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div class="w-3 h-3 bg-red-400 rounded-full"></div>
                <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                <div class="ml-auto text-sm text-gray-500 font-medium">Check4Me</div>
              </div>
              
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <Icon name="lucide:car" class="w-8 h-8 text-primary" />
                  <div class="flex-1">
                    <div class="h-3 bg-gray-200 rounded w-3/4"></div>
                    <div class="h-2 bg-gray-100 rounded w-1/2 mt-2"></div>
                  </div>
                  <Icon name="lucide:check-circle" class="w-6 h-6 text-green-500" />
                </div>
                
                <div class="flex items-center gap-3">
                  <Icon name="lucide:camera" class="w-8 h-8 text-blue-500" />
                  <div class="flex-1">
                    <div class="h-3 bg-gray-200 rounded w-2/3"></div>
                    <div class="h-2 bg-gray-100 rounded w-3/4 mt-2"></div>
                  </div>
                  <div class="text-sm text-gray-500">24 φωτογραφίες</div>
                </div>
                
                <div class="flex items-center gap-3">
                  <Icon name="lucide:file-text" class="w-8 h-8 text-purple-500" />
                  <div class="flex-1">
                    <div class="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div class="h-2 bg-gray-100 rounded w-2/3 mt-2"></div>
                  </div>
                  <div class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Έτοιμη
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Floating elements -->
          <div class="absolute -top-4 -left-4 w-16 h-16 bg-primary opacity-20 rounded-full animate-pulse"></div>
          <div class="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-400 opacity-15 rounded-full animate-pulse" style="animation-delay: 1s"></div>
          <div class="absolute top-1/2 -right-8 w-12 h-12 bg-green-400 opacity-10 rounded-full animate-pulse" style="animation-delay: 2s"></div>
        </div>
      </div>

      <!-- Bottom stats section -->
      <div class="mt-20 bg-white rounded-3xl shadow-lg p-8 max-w-4xl mx-auto">
        <div class="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div class="text-3xl font-bold text-primary mb-2">1000+</div>
            <div class="text-gray-600">Χαρούμενοι πελάτες</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-green-500 mb-2">50+</div>
            <div class="text-gray-600">Πιστοποιημένοι ελεγκτές</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-blue-500 mb-2">98%</div>
            <div class="text-gray-600">Ποσοστό ικανοποίησης</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>