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
        name: 'QR Reader',
        short_name: 'QR',
        background_color: '#fff',
        theme_color: '#3cb371',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
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
