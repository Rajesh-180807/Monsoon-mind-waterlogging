// Modified by Rajesh (2026)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Monsoon Mind – Waterlogging alerts & safe routes',
        short_name: 'Monsoon Mind',
        description: 'Report flooded roads with a photo, see live waterlogging, and get a route that avoids it.',
        theme_color: '#0b3b5c',
        background_color: '#f4f1ea',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        navigateFallbackDenylist: [/^\/api/],
        runtimeCaching: [
          {
            // map tiles: keep a cache so the map still shows on a weak connection
            urlPattern: /^https:\/\/[abc]?\.?tile\.openstreetmap\.org\/.*/,
            handler: 'CacheFirst',
            options: { cacheName: 'osm-tiles', expiration: { maxEntries: 600, maxAgeSeconds: 7 * 24 * 3600 } }
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/reports/active'),
            handler: 'NetworkFirst',
            options: { cacheName: 'live-reports', networkTimeoutSeconds: 5 }
          }
        ]
      }
    })
  ],
  server: {
    port: 5173,
    // Lets friends open the app through a VS Code forwarded link (dev only)
    allowedHosts: true,
    proxy: { '/api': 'http://localhost:8080' }
  }
})
