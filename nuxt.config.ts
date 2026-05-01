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
            { property: 'og:title', content: 'JM Taller | Accesorios de Piel Premium' },
            { property: 'og:description', content: 'Accesorios artesanales de piel premium hechos a mano en México.' },
            { property: 'og:image', content: 'https://jmtaller.com/og-image.png' },
            { property: 'og:url', content: 'https://jmtaller.com' },
            { property: 'og:type', content: 'website' },
        ],
        script: [
    {
        innerHTML: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1287239663026510');
            fbq('track', 'PageView');
        `,
        type: 'text/javascript'
    }
],
noscript: [
    {
        innerHTML: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1287239663026510&ev=PageView&noscript=1"/>`
    }
]
    }
}

})