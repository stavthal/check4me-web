<template>
  <footer class="bg-gray-900 text-white py-16">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <!-- Company Info -->
        <div class="lg:col-span-2">
          <h3 class="text-2xl font-bold text-primary mb-4">Check4Me</h3>
          <p class="text-gray-300 mb-6 max-w-md">
            Η πιο αξιόπιστη πλατφόρμα για τον έλεγχο μεταχειρισμένων οχημάτων στην Ελλάδα. 
            Συνδέουμε αγοραστές με πιστοποιημένους ελεγκτές για ασφαλείς συναλλαγές.
          </p>
          <div class="flex space-x-4">
            <UButton variant="ghost" size="sm" class="text-gray-400 hover:text-white p-2">
              <Icon name="lucide:facebook" class="w-5 h-5" />
            </UButton>
            <UButton variant="ghost" size="sm" class="text-gray-400 hover:text-white p-2">
              <Icon name="lucide:twitter" class="w-5 h-5" />
            </UButton>
            <UButton variant="ghost" size="sm" class="text-gray-400 hover:text-white p-2">
              <Icon name="lucide:instagram" class="w-5 h-5" />
            </UButton>
            <UButton variant="ghost" size="sm" class="text-gray-400 hover:text-white p-2">
              <Icon name="lucide:linkedin" class="w-5 h-5" />
            </UButton>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Γρήγοροι Σύνδεσμοι</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/register" class="text-gray-300 hover:text-white transition-colors">
                Εγγραφή
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/login" class="text-gray-300 hover:text-white transition-colors">
                Σύνδεση
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="text-gray-300 hover:text-white transition-colors">
                Blog
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="#" class="text-gray-300 hover:text-white transition-colors">
                Συχνές Ερωτήσεις
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Υποστήριξη</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="#" class="text-gray-300 hover:text-white transition-colors">
                Επικοινωνία
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="#" class="text-gray-300 hover:text-white transition-colors">
                Όροι Χρήσης
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="#" class="text-gray-300 hover:text-white transition-colors">
                Πολιτική Απορρήτου
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="#" class="text-gray-300 hover:text-white transition-colors">
                Βοήθεια
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
        <div class="text-gray-400 text-sm mb-4 md:mb-0">
          © 2025 Check4Me. Όλα τα δικαιώματα διατηρούνται.
        </div>
        <div class="flex items-center space-x-6 text-gray-400 text-sm">
          <span class="flex items-center">
            <Icon name="lucide:shield-check" class="w-4 h-4 mr-1" />
            Ασφαλής Πλατφόρμα
          </span>
          <span class="flex items-center">
            <Icon name="lucide:lock" class="w-4 h-4 mr-1" />
            SSL Προστασία
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>
