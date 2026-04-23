export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/image'],
  css: ['~/assets/css/main.css'],
  ui: { colorMode: false, fonts: false },
  image: {
    provider: 'none',
    ipx: { baseURL: '/_ipx' }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  },
  app: {
    head: {
        link: [
            { rel: 'icon', type: 'image/png', href: '/favicon.ico' }
        ],
        meta: [
            { property: 'og:title', content: 'Piel Artesanal | Accesorios de Piel Premium' },
            { property: 'og:description', content: 'Accesorios artesanales de piel premium hechos a mano en México.' },
            { property: 'og:image', content: 'https://jmtaller.com/og-image.png' },
            { property: 'og:url', content: 'https://jmtaller.com' },
            { property: 'og:type', content: 'website' },
        ]
    }
}

})