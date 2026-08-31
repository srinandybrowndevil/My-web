import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

/**
 * Production SEO & Analytics HTML Transform Plugin
 * Dynamically injects Google Search Console, Bing Webmaster, and GA4 scripts
 * only when valid production environment variables are provided.
 * Never exposes dummy placeholders or fabricated tokens in production HTML.
 */
function seoAndAnalyticsPlugin(): Plugin {
  return {
    name: 'muco-seo-analytics-transform',
    transformIndexHtml(html) {
      const gscToken = process.env.VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION;
      const bingToken = process.env.VITE_BING_WEBMASTER_VERIFICATION;
      const ga4Id = process.env.VITE_GA4_MEASUREMENT_ID;

      const extraTags: string[] = [];

      if (gscToken && gscToken.trim() !== '' && !gscToken.includes('TOKEN') && !gscToken.includes('PLACEHOLDER')) {
        extraTags.push(`    <meta name="google-site-verification" content="${gscToken.trim()}" />`);
      }

      if (bingToken && bingToken.trim() !== '' && !bingToken.includes('TOKEN') && !bingToken.includes('PLACEHOLDER')) {
        extraTags.push(`    <meta name="msvalidate.01" content="${bingToken.trim()}" />`);
      }

      if (ga4Id && ga4Id.startsWith('G-') && ga4Id !== 'G-MEASUREMENT_ID') {
        extraTags.push(`    <!-- Google Analytics 4 (GA4) Integration -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${ga4Id.trim()}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${ga4Id.trim()}', {
        send_page_view: false,
        anonymize_ip: true
      });
    </script>`);
      }

      if (extraTags.length > 0) {
        return html.replace('</head>', `${extraTags.join('\n')}\n  </head>`);
      }

      return html;
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(), 
      seoAndAnalyticsPlugin(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'robots.txt', 'sitemap.xml'],
        manifest: {
          name: 'MUCO Labs - Custom Software & AI Engineering',
          short_name: 'MUCO Labs',
          description: 'Enterprise software development, AI solutions, and web engineering in Erode, Tamil Nadu.',
          theme_color: '#080b11',
          background_color: '#080b11',
          display: 'standalone',
          icons: [
            {
              src: '/favicon.svg',
              sizes: '192x192',
              type: 'image/svg+xml'
            },
            {
              src: '/favicon.svg',
              sizes: '512x512',
              type: 'image/svg+xml'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'unsplash-images',
                expiration: {
                  maxEntries: 60,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                }
              }
            }
          ]
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'es2022',
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: 800,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // React ecosystem
              if (
                id.includes('/node_modules/react/') ||
                id.includes('/node_modules/react-dom/') ||
                id.includes('/node_modules/scheduler/')
              ) {
                return 'vendor-react';
              }
              
              // Animation libraries
              if (
                id.includes('/node_modules/framer-motion/') ||
                id.includes('/node_modules/motion/') ||
                id.includes('/node_modules/motion-dom/') ||
                id.includes('/node_modules/motion-utils/')
              ) {
                return 'vendor-motion';
              }
              
              // Icon libraries
              if (id.includes('/node_modules/lucide-react/')) {
                return 'vendor-icons';
              }
              
              // Firebase (separate chunk for lazy loading)
              if (
                id.includes('/node_modules/firebase/') ||
                id.includes('/node_modules/@firebase/')
              ) {
                return 'vendor-firebase';
              }
              
              // Email services
              if (
                id.includes('/node_modules/@emailjs/') ||
                id.includes('/node_modules/resend/')
              ) {
                return 'vendor-email';
              }
              
              // Google AI
              if (
                id.includes('/node_modules/@google/') ||
                id.includes('/node_modules/google-auth-library/')
              ) {
                return 'vendor-google';
              }
              
              // Other libraries
              return 'vendor-libs';
            }
            
            // Split large component files
            if (id.includes('/src/components/')) {
              if (id.includes('/src/components/AdminMessagesInbox') || 
                  id.includes('/src/components/GoogleSheetsHub') ||
                  id.includes('/src/components/PerformanceMonitor')) {
                return 'chunk-admin-features';
              }
              if (id.includes('/src/components/CommandPalette') ||
                  id.includes('/src/components/AuthModal') ||
                  id.includes('/src/components/ScheduleCallModal')) {
                return 'chunk-modal-features';
              }
            }
            
            // Split large page files
            if (id.includes('/src/pages/')) {
              if (id.includes('/src/pages/About') || id.includes('/src/pages/Locations')) {
                return 'chunk-content-pages';
              }
              if (id.includes('/src/pages/GoogleSheetsManager') || id.includes('/src/pages/AppStudio')) {
                return 'chunk-app-features';
              }
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
