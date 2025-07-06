<template>
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Πώς λειτουργεί;
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Απλά βήματα για έναν ολοκληρωμένο έλεγχο του οχήματός σου
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-16 mb-16">
        <!-- Client Process -->
        <div>
          <h3 class="text-2xl font-bold text-primary mb-8 text-center">
            <Icon name="lucide:user" class="inline-block mr-2 w-8 h-8" />
            Για Αγοραστές
          </h3>
          <div class="space-y-8">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Δημιούργησε Αίτημα</h4>
                <p class="text-gray-600">Συμπλήρωσε τα στοιχεία του οχήματος που θέλεις να ελεγχθεί και επέλεξε την περιοχή</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Επιλογή Ελεγκτή</h4>
                <p class="text-gray-600">Βρίσκουμε τον κατάλληλο πιστοποιημένο ελεγκτή στην περιοχή σου</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                3
              </div>
              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Λήψη Αναφοράς</h4>
                <p class="text-gray-600">Παραλαμβάνεις λεπτομερή αναφορά με φωτογραφίες και συστάσεις</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                ✓
              </div>
              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Ασφαλής Αγορά</h4>
                <p class="text-gray-600">Αγοράζεις με σιγουριά βασισμένος στην εξειδικευμένη γνώμη</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Checker Process -->
        <div>
          <h3 class="text-2xl font-bold text-green-600 mb-8 text-center">
            <Icon name="lucide:shield-check" class="inline-block mr-2 w-8 h-8" />
            Για Ελεγκτές
          </h3>
          <div class="space-y-8">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Εγγραφή & Πιστοποίηση</h4>
                <p class="text-gray-600">Δημιούργησε το προφίλ σου και επιβεβαίωσε τα διαπιστευτήριά σου</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Λήψη Αιτημάτων</h4>
                <p class="text-gray-600">Παραλαμβάνεις αιτήματα ελέγχου στην περιοχή σου</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                3
              </div>
              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Έλεγχος & Αναφορά</h4>
                <p class="text-gray-600">Διεξάγεις τον έλεγχο και ανεβάζεις φωτογραφίες με σχόλια</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                €
              </div>
              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Λήψη Πληρωμής</h4>
                <p class="text-gray-600">Παραλαμβάνεις την αμοιβή σου αμέσως μετά την ολοκλήρωση</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center">
        <div class="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Έτοιμος να ξεκινήσεις;</h3>
          <p class="text-gray-600 mb-6">Εγγραφείτε σήμερα και αρχίστε να χρησιμοποιείτε την πλατφόρμα μας</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UButton 
              size="lg" 
              color="primary" 
              class="px-8"
              to="/register"
            >
              <Icon name="lucide:user-plus" class="mr-2" />
              Εγγραφή ως Αγοραστής
            </UButton>
            <UButton 
              size="lg" 
              variant="outline" 
              color="success"
              class="px-8"
              to="/register"
            >
              <Icon name="lucide:shield-plus" class="mr-2" />
              Εγγραφή ως Ελεγκτής
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
