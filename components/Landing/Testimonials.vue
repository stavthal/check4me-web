<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Τι λένε οι πελάτες μας
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Χιλιάδες ικανοποιημένοι πελάτες έχουν εμπιστευτεί την πλατφόρμα μας
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Testimonial 1 -->
        <div
          class="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400">
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
            </div>
          </div>
          <p class="text-gray-700 mb-6 leading-relaxed">
            "Εξαιρετική εξυπηρέτηση! Ο ελεγκτής ήταν πολύ επαγγελματίας και μου
            έδωσε μια πολύ λεπτομερή αναφορά. Με βοήθησε να αποφύγω μια κακή
            αγορά."
          </p>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4"
            >
              ΜΚ
            </div>
            <div>
              <div class="font-semibold text-gray-900">Μαρία Κων/νου</div>
              <div class="text-sm text-gray-500">Αθήνα</div>
            </div>
          </div>
        </div>

        <!-- Testimonial 2 -->
        <div
          class="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400">
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
            </div>
          </div>
          <p class="text-gray-700 mb-6 leading-relaxed">
            "Ως ελεγκτής, η πλατφόρμα με βοηθάει να βρίσκω τακτικά πελάτες. Η
            διαδικασία είναι απλή και οι πληρωμές γίνονται έγκαιρα."
          </p>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4"
            >
              ΝΠ
            </div>
            <div>
              <div class="font-semibold text-gray-900">Νίκος Παπ/λου</div>
              <div class="text-sm text-gray-500">Θεσσαλονίκη</div>
            </div>
          </div>
        </div>

        <!-- Testimonial 3 -->
        <div
          class="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400">
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
            </div>
          </div>
          <p class="text-gray-700 mb-6 leading-relaxed">
            "Γρήγορη και αξιόπιστη υπηρεσία. Η αναφορά που έλαβα ήταν πολύ
            λεπτομερής με εξαιρετικές φωτογραφίες. Τη συνιστώ ανεπιφύλακτα!"
          </p>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4"
            >
              ΑΓ
            </div>
            <div>
              <div class="font-semibold text-gray-900">Άννα Γεωργίου</div>
              <div class="text-sm text-gray-500">Πάτρα</div>
            </div>
          </div>
        </div>

        <!-- Testimonial 4 -->
        <div
          class="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400">
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
            </div>
          </div>
          <p class="text-gray-700 mb-6 leading-relaxed">
            "Εξοικονόμησα χρήματα και χρόνο. Ο έλεγχος έγινε την επόμενη μέρα
            και είχα πλήρη εικόνα για την κατάσταση του αυτοκινήτου."
          </p>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-4"
            >
              ΔΜ
            </div>
            <div>
              <div class="font-semibold text-gray-900">Δημήτρης Μιχ/λης</div>
              <div class="text-sm text-gray-500">Ηράκλειο</div>
            </div>
          </div>
        </div>

        <!-- Testimonial 5 -->
        <div
          class="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400">
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
            </div>
          </div>
          <p class="text-gray-700 mb-6 leading-relaxed">
            "Πρώτη φορά που χρησιμοποίησα τέτοια υπηρεσία. Μου έδωσε μεγάλη
            ασφάλεια για την αγορά μου. Σίγουρα θα τη χρησιμοποιήσω ξανά."
          </p>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold mr-4"
            >
              ΕΚ
            </div>
            <div>
              <div class="font-semibold text-gray-900">Ελένη Καρ/κη</div>
              <div class="text-sm text-gray-500">Λάρισα</div>
            </div>
          </div>
        </div>

        <!-- Testimonial 6 -->
        <div
          class="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400">
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
              <Icon name="lucide:star" class="w-5 h-5 fill-current" />
            </div>
          </div>
          <p class="text-gray-700 mb-6 leading-relaxed">
            "Μου άρεσε πολύ η διαφάνεια της διαδικασίας. Μπορούσα να παρακολουθώ
            την πρόοδο και να επικοινωνώ άμεσα με τον ελεγκτή."
          </p>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-4"
            >
              ΓΣ
            </div>
            <div>
              <div class="font-semibold text-gray-900">Γιάννης Στεφ/νου</div>
              <div class="text-sm text-gray-500">Βόλος</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
