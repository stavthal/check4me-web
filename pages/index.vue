<template>
  <div>
    <!-- Header -->
    <LayoutHeader />

    <!-- Main Landing Page Content -->
    <main>
      <!-- Hero Section -->
      <LandingHero />

      <!-- About Section -->
      <LandingAbout />

      <!-- How It Works Section -->
      <LandingHowItWorks />



      <!-- Final CTA Section -->
      <LandingCTA />
    </main>

    <!-- Footer -->
    <LandingFooter />

    <!-- Dev Links for development -->
    <DevLinks />
  </div>
</template>

<script setup lang="ts">
// SEO Meta
useHead({
  title: "Check4Me - Αξιόπιστος έλεγχος μεταχειρισμένων οχημάτων",
  meta: [
    {
      name: "description",
      content:
        "Συνδέουμε αγοραστές με εξειδικευμένους ελεγκτές για την ασφαλή αγορά μεταχειρισμένων αυτοκινήτων και μοτοσικλετών σε όλη την Ελλάδα. Αξιόπιστη πλατφόρμα με πιστοποιημένους επαγγελματίες.",
    },
    {
      name: "keywords",
      content:
        "έλεγχος αυτοκινήτου, μεταχειρισμένα οχήματα, έλεγχος οχήματος, ελεγκτής αυτοκινήτων, αγορά αυτοκινήτου, τεχνικός έλεγχος",
    },
    {
      property: "og:title",
      content: "Check4Me - Αξιόπιστος έλεγχος μεταχειρισμένων οχημάτων",
    },
    {
      property: "og:description",
      content:
        "Η πιο αξιόπιστη πλατφόρμα για τον έλεγχο μεταχειρισμένων οχημάτων στην Ελλάδα",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
  ],
});
</script>
