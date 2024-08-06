export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt"],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },

  compatibilityDate: "2024-07-16",

  // Ajoutez cette section pour vérifier que les fichiers statiques sont correctement servis
  build: {
    // Assurez-vous que les fichiers de build sont générés correctement
  },

  generate: {
    // Vous pouvez ajouter des configurations spécifiques ici si nécessaire
    // Par exemple, pour exclure certaines routes
    exclude: [],
  },
});
