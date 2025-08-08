<template>
  <section class="py-20 bg-gradient-to-br from-blue-50 via-white to-primary-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Τι είναι το Check4Me
        </h2>
      </div>

      <!-- Main content -->
      <div class="max-w-4xl mx-auto space-y-16">
        <!-- What is Check4Me -->
        <div class="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            Το Check4Me είναι η πλατφόρμα που σου δίνει την δυνατότητα να στείλεις έναν χρήστη της εφαρμογής να δεί από κοντά το όχημα που σε ενδιαφέρει.
          </p>
          <p class="text-lg text-gray-700 leading-relaxed">
            Είτε πρόκειται για αυτοκίνητο είτε για μοτοσυκλέτα, αν δεν μπορείς να το επισκεφτείς εσύ ο ίδιος λόγω απόστασης ή χρόνου, το Check4Me σου προσφέρει μια έξυπνη και οικονομική λύση. Ο ελεγκτής πηγαίνει στη διεύθυνση του οχήματος, το βλέπει από κοντά και σου στέλνει φωτογραφίες, βίντεο και πληροφορίες, ώστε να έχεις μια πιο ξεκάθαρη εικόνα πριν πάρεις την απόφασή σου.
          </p>
        </div>

        <!-- What Check4Me is NOT -->
        <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-lg p-8 md:p-12 border-l-4 border-amber-400">
          <div class="flex items-start gap-4 mb-6">
            <div class="flex-shrink-0 w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center">
              <Icon name="lucide:alert-triangle" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">
                Τι δεν είναι το Check4Me
              </h3>
            </div>
          </div>
          <p class="text-lg text-gray-700 leading-relaxed">
            Το Check4Me δεν υποκαθιστά τεχνικό έλεγχο σε συνεργείο ούτε παρέχει εγγυήσεις για την κατάσταση του οχήματος. Ο έλεγχος είναι οπτικός και πληροφοριακός, σαν να έστελνες έναν φίλο σου να το δει για σένα.
          </p>
        </div>

        <!-- What Check4Me offers -->
        <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-lg p-8 md:p-12">
          <div class="flex items-start gap-4 mb-8">
            <div class="flex-shrink-0 w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
              <Icon name="lucide:gift" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-900 mb-6">
                Τι σου προσφέρει το Check4Me
              </h3>
            </div>
          </div>
          
          <div class="grid md:grid-cols-3 gap-6 mb-8">
            <div class="flex items-start gap-3">
              <Icon name="lucide:clock" class="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <span class="text-gray-700">Εξοικονομεί χρόνο & έξοδα μετακίνησης</span>
            </div>
            <div class="flex items-start gap-3">
              <Icon name="lucide:eye" class="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <span class="text-gray-700">Σου δίνει οπτική επαφή με το όχημα χωρίς να είσαι εκεί</span>
            </div>
            <div class="flex items-start gap-3">
              <Icon name="lucide:shield-check" class="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <span class="text-gray-700">Σε βοηθά να αποφύγεις δυσάρεστες εκπλήξεις</span>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-6 border-l-4 border-green-400">
            <p class="text-lg text-gray-700 leading-relaxed font-medium">
              Μέσα από το Check4Me, έχεις τη σιγουριά ότι θα πάρεις τις πληροφορίες που χρειάζεσαι για να αποφασίσεις πιο εύκολα αν αξίζει να κάνεις το επόμενο βήμα ή να συνεχίσεις την αναζήτησή σου.
            </p>
          </div>
        </div>

        <!-- Visual representation -->
        <div class="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 class="text-2xl font-bold text-gray-900 mb-6">
                Πώς λειτουργεί απλά
              </h3>
              <div class="space-y-4">
                <div class="flex items-center gap-4">
                  <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <span class="text-gray-700">Βρίσκεις ενδιαφέρον όχημα</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <span class="text-gray-700">Στέλνεις έναν "φίλο" από την πλατφόρμα</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <span class="text-gray-700">Παραλαμβάνεις φωτογραφίες & πληροφορίες</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span class="text-gray-700">Αποφασίζεις με σιγουριά</span>
                </div>
              </div>
            </div>
            
            <div class="relative">
              <div class="bg-gradient-to-br from-primary-100 to-blue-100 rounded-2xl p-6">
                <div class="flex items-center justify-center aspect-square bg-white rounded-xl shadow-lg">
                  <div class="text-center">
                    <Icon name="lucide:users" class="w-16 h-16 text-primary mx-auto mb-4" />
                    <div class="text-sm text-gray-600 font-medium">Χρήστες Check4Me</div>
                  </div>
                </div>
              </div>
              
              <!-- Floating icons -->
              <div class="absolute -top-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Icon name="lucide:camera" class="w-6 h-6 text-white" />
              </div>
              <div class="absolute -bottom-2 -left-2 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Icon name="lucide:map-pin" class="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>