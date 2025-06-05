// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  // colorMode: {
  //   preference: "light",
  //   fallback: "light",
  //   classSuffix: "",
  //   storageKey: "nuxt-color-mode",
  //   detectSystemColorScheme: false, // Force light mode, disable system detection
  // },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      include: undefined,
      exclude: ["/register", "/"],
      saveRedirectToCookie: false,
    },
  },
  ui: {
    colorMode: false, // disable UI color mode for now
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@nuxtjs/supabase",
  ],
});
