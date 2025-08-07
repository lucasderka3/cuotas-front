

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  pages:true,
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@pinia/nuxt'],

  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],
  build: {
    transpile: ['vuetify']
  },
  runtimeConfig: {
    public: {
      baseURL: import.meta.env.BASE_URL || 'http://localhost:8080',
      envName: import.meta.env.ENV_NAME || 'local',
    }
  }

})