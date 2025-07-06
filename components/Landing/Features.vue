<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Γιατί να επιλέξεις το Check4Me;
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Προσφέρουμε έναν αξιόπιστο και διαφανή τρόπο για την ασφαλή αγορά
          μεταχειρισμένων οχημάτων
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Feature 1 -->
        <div
          class="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-primary-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div
            class="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
          >
            <Icon name="lucide:shield-check" class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-4">
            Πιστοποιημένοι Ελεγκτές
          </h3>
          <p class="text-gray-600 leading-relaxed">
            Όλοι οι ελεγκτές μας είναι πιστοποιημένοι επαγγελματίες με εμπειρία
            στον έλεγχο οχημάτων
          </p>
        </div>

        <!-- Feature 2 -->
        <div
          class="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div
            class="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
          >
            <Icon name="lucide:camera" class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-4">
            Αναλυτική Φωτογράφιση
          </h3>
          <p class="text-gray-600 leading-relaxed">
            Λαμβάνεις λεπτομερείς φωτογραφίες από κάθε γωνία του οχήματος με
            αναλυτικά σχόλια
          </p>
        </div>

        <!-- Feature 3 -->
        <div
          class="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div
            class="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
          >
            <Icon name="lucide:clock" class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-4">
            Γρήγορη Εξυπηρέτηση
          </h3>
          <p class="text-gray-600 leading-relaxed">
            Ολοκλήρωση ελέγχου εντός 24-48 ωρών από την ημερομηνία κράτησης
          </p>
        </div>

        <!-- Feature 4 -->
        <div
          class="group p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div
            class="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
          >
            <Icon name="lucide:file-text" class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-4">
            Αναλυτική Αναφορά
          </h3>
          <p class="text-gray-600 leading-relaxed">
            Λαμβάνεις λεπτομερή αναφορά με όλα τα ευρήματα και τις συστάσεις μας
          </p>
        </div>

        <!-- Feature 5 -->
        <div
          class="group p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div
            class="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
          >
            <Icon name="lucide:map-pin" class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-4">
            Παντού στην Ελλάδα
          </h3>
          <p class="text-gray-600 leading-relaxed">
            Δίκτυο ελεγκτών σε όλη την επικράτεια για να σε εξυπηρετήσουμε όπου
            κι αν βρίσκεσαι
          </p>
        </div>

        <!-- Feature 6 -->
        <div
          class="group p-8 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div
            class="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
          >
            <Icon name="lucide:euro" class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-4">Προσιτές Τιμές</h3>
          <p class="text-gray-600 leading-relaxed">
            Διαφανής τιμολόγηση χωρίς κρυφές χρεώσεις. Πλήρωσε μόνο όταν είσαι
            ικανοποιημένος
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
