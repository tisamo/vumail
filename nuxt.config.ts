// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: [
    '@/assets/scss/styles.scss',
  ],
  modules: [[
      '@pinia/nuxt', {
    autoImports: ['defineStore', 'acceptHMRUpdate']
    }
  ],
    '@nuxt/ui',
    'nuxt-tiptap-editor',
  ],
  tiptap: {
    prefix: "Tiptap",
    lowlight: {
      theme: "github-dark", //default theme
    },//prefix for Tiptap imports, composables not included
  },
  imports: ['store'],
  runtimeConfig: {
    public: {
      gcloudApi: process.env.GCLOUD_API_KEYI,
      api: process.env.API
    }
  },
  pinia: {
    storesDirs: ['./store/**', ],
  },
  googleSignIn: {
    clientId: process.env.CLIENT_API,
  }
})
