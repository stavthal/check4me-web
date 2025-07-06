<template>
  <section
    class="py-20 bg-gradient-to-r from-primary to-blue-600 text-white stats-section"
  >
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Τα νούμερα μιλούν από μόνα τους
        </h2>
        <p class="text-xl opacity-90 max-w-2xl mx-auto">
          Εμπιστεύτηκε τη μεγαλύτερη κοινότητα ελέγχου οχημάτων στην Ελλάδα
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center">
          <div
            class="text-4xl md:text-5xl font-bold mb-2"
            :class="{ 'animate-pulse': isVisible }"
          >
            {{ animatedStats.inspections }}+
          </div>
          <div class="text-lg opacity-90">Ολοκληρωμένοι Έλεγχοι</div>
        </div>

        <div class="text-center">
          <div
            class="text-4xl md:text-5xl font-bold mb-2"
            :class="{ 'animate-pulse': isVisible }"
          >
            {{ animatedStats.checkers }}+
          </div>
          <div class="text-lg opacity-90">Πιστοποιημένοι Ελεγκτές</div>
        </div>

        <div class="text-center">
          <div
            class="text-4xl md:text-5xl font-bold mb-2"
            :class="{ 'animate-pulse': isVisible }"
          >
            {{ animatedStats.satisfaction }}%
          </div>
          <div class="text-lg opacity-90">Ικανοποίηση Πελατών</div>
        </div>

        <div class="text-center">
          <div
            class="text-4xl md:text-5xl font-bold mb-2"
            :class="{ 'animate-pulse': isVisible }"
          >
            {{ animatedStats.cities }}+
          </div>
          <div class="text-lg opacity-90">Πόλεις Κάλυψης</div>
        </div>
      </div>

      <div class="mt-16 grid md:grid-cols-3 gap-8 text-center">
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <Icon name="lucide:clock" class="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h3 class="text-xl font-semibold mb-2">Γρήγορη Εξυπηρέτηση</h3>
          <p class="opacity-80">Μέσος χρόνος ολοκλήρωσης: 24-48 ώρες</p>
        </div>

        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <Icon name="lucide:award" class="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h3 class="text-xl font-semibold mb-2">Υψηλή Ποιότητα</h3>
          <p class="opacity-80">Αναλυτικές αναφορές με 50+ σημεία ελέγχου</p>
        </div>

        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <Icon
            name="lucide:shield"
            class="w-12 h-12 mx-auto mb-4 opacity-90"
          />
          <h3 class="text-xl font-semibold mb-2">Πλήρης Ασφάλεια</h3>
          <p class="opacity-80">
            Κρυπτογραφημένες συναλλαγές και προστασία δεδομένων
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const isVisible = ref(false);

const stats = {
  inspections: 2500,
  checkers: 150,
  satisfaction: 98,
  cities: 45,
};

const animatedStats = reactive({
  inspections: 0,
  checkers: 0,
  satisfaction: 0,
  cities: 0,
});

const animateNumbers = () => {
  const duration = 2000; // 2 seconds
  const steps = 60;
  const interval = duration / steps;

  Object.keys(stats).forEach((key) => {
    const target = stats[key as keyof typeof stats];
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        animatedStats[key as keyof typeof animatedStats] = target;
        clearInterval(timer);
      } else {
        animatedStats[key as keyof typeof animatedStats] = Math.floor(current);
      }
    }, interval);
  });
};

onMounted(() => {
  // Use Intersection Observer to trigger animation when component is visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible.value) {
          isVisible.value = true;
          animateNumbers();
        }
      });
    },
    { threshold: 0.5 }
  );

  const element = document.querySelector(".stats-section");
  if (element) {
    observer.observe(element);
  }
});
</script>

<style scoped>
/* Styles handled by Tailwind CSS */
</style>
