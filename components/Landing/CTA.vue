<template>
  <section class="py-20 bg-gradient-to-br from-gray-900 via-primary to-blue-800 text-white relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 bg-grid-pattern opacity-10" />
    <div class="absolute top-0 left-0 w-96 h-96 bg-blue-500 opacity-20 rounded-full transform -translate-x-48 -translate-y-48" />
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 opacity-20 rounded-full transform translate-x-48 translate-y-48" />
    
    <div class="container mx-auto px-4 relative">
      <div class="text-center max-w-4xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Ξεκίνα την ασφαλή αγορά του 
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
            επόμενου οχήματός σου
          </span>
          σήμερα!
        </h2>
        
        <p class="text-xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Μη ρισκάρεις με αβέβαιες αγορές. Εμπιστεύσου τους ειδικούς μας για έναν ολοκληρωμένο έλεγχο 
          που θα σε προστατεύσει από κρυφά προβλήματα και απρόβλεπτες δαπάνες.
        </p>

        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <UButton 
            size="xl" 
            color="primary" 
            class="px-12 py-4 text-lg font-semibold bg-white text-primary hover:bg-gray-100 shadow-2xl transform hover:scale-105 transition-all duration-200"
            to="/register"
          >
            <Icon name="lucide:rocket" class="mr-3 w-6 h-6" />
            Ξεκίνα Τώρα - Δωρεάν Εγγραφή
          </UButton>
          
          <div class="flex items-center text-sm opacity-80">
            <Icon name="lucide:check" class="w-5 h-5 mr-2 text-green-400" />
            Δεν απαιτείται πιστωτική κάρτα
          </div>
        </div>

        <!-- Features highlight -->
        <div class="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div class="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Icon name="lucide:zap" class="w-6 h-6 mr-3 text-yellow-400" />
            <span class="font-medium">Γρήγορη Ενεργοποίηση</span>
          </div>
          
          <div class="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Icon name="lucide:shield-check" class="w-6 h-6 mr-3 text-green-400" />
            <span class="font-medium">100% Ασφαλές</span>
          </div>
          
          <div class="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Icon name="lucide:headphones" class="w-6 h-6 mr-3 text-blue-400" />
            <span class="font-medium">24/7 Υποστήριξη</span>
          </div>
        </div>

        <!-- Urgency element -->
        <div class="mt-12 inline-flex items-center bg-red-500/20 border border-red-400/30 rounded-full px-6 py-3">
          <Icon name="lucide:clock" class="w-5 h-5 mr-2 text-red-400" />
          <span class="text-sm font-medium">
            Ειδική προσφορά: Πρώτος έλεγχος με 20% έκπτωση για νέους χρήστες!
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}
</style>
