import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        lang: 'ja',
        name: 'QR Reader',
        short_name: 'QR',
        background_color: '#fff',
        theme_color: '#3cb371',
        display: 'standalone',
        scope: '/qr-reader/',
        start_url: '/qr-reader/',
        icons: [
          {
            src: 'app-icons/72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: 'app-icons/96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: 'app-icons/128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'app-icons/144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: 'app-icons/152x152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: 'app-icons/192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'app-icons/384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'app-icons/512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
