// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ["./domains/users", "./domains/posts"],
  modules: ["@nuxtjs/tailwindcss"],
});