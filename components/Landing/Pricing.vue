<template>
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Διαφανής Τιμολόγηση
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Επέλεξε το πακέτο που ταιριάζει στις ανάγκες σου. Χωρίς κρυφές
          χρεώσεις, χωρίς δεσμεύσεις.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- Basic Plan -->
        <div
          class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
        >
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">
              Βασικός Έλεγχος
            </h3>
            <div class="text-4xl font-bold text-primary mb-2">€89</div>
            <div class="text-gray-500">Ιδανικό για νεότερα οχήματα</div>
          </div>

          <ul class="space-y-4 mb-8">
            <li class="flex items-center">
              <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
              <span>Οπτικός έλεγχος εξωτερικού</span>
            </li>
            <li class="flex items-center">
              <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
              <span>Έλεγχος εσωτερικού χώρου</span>
            </li>
            <li class="flex items-center">
              <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
              <span>20+ φωτογραφίες υψηλής ανάλυσης</span>
            </li>
            <li class="flex items-center">
              <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
              <span>Βασική αναφορά PDF</span>
            </li>
            <li class="flex items-center">
              <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
              <span>Παράδοση σε 24 ώρες</span>
            </li>
          </ul>

          <UButton color="primary" size="lg" block> Επιλογή Πακέτου </UButton>
        </div>

        <!-- Premium Plan - Most Popular -->
        <div
          class="bg-white rounded-2xl shadow-2xl p-8 border-2 border-primary relative hover:shadow-3xl transition-shadow duration-300 transform lg:scale-105"
        >
          <!-- Popular badge -->
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div
              class="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold"
            >
              Πιο Δημοφιλές
            </div>
          </div>

          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">
              Ολοκληρωμένος Έλεγχος
            </h3>
            <div class="text-4xl font-bold text-primary mb-2">€149</div>
            <div class="text-gray-500">
              Προτείνεται για τα περισσότερα οχήματα
            </div>
          </div>

          <ul class="space-y-4 mb-8">
            <li class="flex items-center">
              <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
              <span class="font-medium">Όλα από το βασικό πακέτο</span>
            </li>
            <li class="flex items-center">
              <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
              <span>Μηχανολογικός έλεγχος</span>
            </li>
            <li class="flex items-center">
              <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
              <span>Έλεγχος ηλεκτρικού συστήματος</span>
            </li>
            <li class="flex items-center">
              <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
              <span>50+ φωτογραφίες & video</span>
            </li>
            <li class="flex items-center">
              <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
              <span>Αναλυτική αναφορά με βαθμολογία</span>
            </li>
            <li class="flex items-center">
              <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
              <span>Τηλεφωνική συμβουλευτική</span>
            </li>
          </ul>

          <UButton color="primary" size="lg" block> Επιλογή Πακέτου </UButton>
        </div>

        <!-- Professional Plan -->
        <div
          class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
        >
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">
              Επαγγελματικός Έλεγχος
            </h3>
            <div class="text-4xl font-bold text-primary mb-2">€249</div>
            <div class="text-gray-500">Για luxury & classic οχήματα</div>
          </div>

          <ul class="space-y-4 mb-8">
            <li class="flex items-center">
              <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
              <span class="font-medium">Όλα από τον ολοκληρωμένο έλεγχο</span>
            </li>
            <li class="flex items-center">
              <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
              <span>Διαγνωστικός έλεγχος OBD</span>
            </li>
            <li class="flex items-center">
              <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
              <span>Εκτίμηση αξίας οχήματος</span>
            </li>
            <li class="flex items-center">
              <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
              <span>100+ φωτογραφίες HD & 4K video</span>
            </li>
            <li class="flex items-center">
              <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
              <span>Προσωπική συνάντηση με ελεγκτή</span>
            </li>
            <li class="flex items-center">
              <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
              <span>Εγγύηση επανελέγχου 30 ημερών</span>
            </li>
          </ul>

          <UButton color="primary" size="lg" block> Επιλογή Πακέτου </UButton>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-16 text-center">
        <div class="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">
            Γιατί να εμπιστευτείς τις τιμές μας;
          </h3>

          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center">
              <Icon
                name="lucide:shield-check"
                class="w-12 h-12 text-green-500 mx-auto mb-4"
              />
              <h4 class="font-semibold text-gray-900 mb-2">
                Εγγύηση Ποιότητας
              </h4>
              <p class="text-gray-600 text-sm">
                100% εγγύηση ικανοποίησης ή επιστροφή χρημάτων
              </p>
            </div>

            <div class="text-center">
              <Icon
                name="lucide:clock"
                class="w-12 h-12 text-blue-500 mx-auto mb-4"
              />
              <h4 class="font-semibold text-gray-900 mb-2">
                Γρήγορη Εξυπηρέτηση
              </h4>
              <p class="text-gray-600 text-sm">
                Παράδοση αναφοράς εντός 24-48 ωρών
              </p>
            </div>

            <div class="text-center">
              <Icon
                name="lucide:star"
                class="w-12 h-12 text-yellow-500 mx-auto mb-4"
              />
              <h4 class="font-semibold text-gray-900 mb-2">
                Κορυφαία Αξιολόγηση
              </h4>
              <p class="text-gray-600 text-sm">
                4.9/5 αστέρια από χιλιάδες πελάτες
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
