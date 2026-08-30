import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

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

      let gscHtml = '<!-- Google Search Console: Set VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION in .env to enable -->';
      if (gscToken && gscToken.trim() !== '' && !gscToken.includes('TOKEN') && !gscToken.includes('PLACEHOLDER')) {
        gscHtml = `<meta name="google-site-verification" content="${gscToken.trim()}" />`;
      }

      let bingHtml = '<!-- Bing Webmaster: Set VITE_BING_WEBMASTER_VERIFICATION in .env to enable -->';
      if (bingToken && bingToken.trim() !== '' && !bingToken.includes('TOKEN') && !bingToken.includes('PLACEHOLDER')) {
        bingHtml = `<meta name="msvalidate.01" content="${bingToken.trim()}" />`;
      }

      let ga4Html = '<!-- GA4: Set VITE_GA4_MEASUREMENT_ID (e.g. G-XXXXXXXXXX) in .env to enable -->';
      if (ga4Id && ga4Id.startsWith('G-') && ga4Id !== 'G-MEASUREMENT_ID') {
        ga4Html = `
    <!-- Google Analytics 4 (GA4) Integration -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${ga4Id.trim()}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${ga4Id.trim()}', {
        send_page_view: false,
        anonymize_ip: true
      });
    </script>`;
      }

      return html
        .replace(/<!-- %VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION% -->|<!-- Google Search Console Verification Placeholder -->\s*<meta name="google-site-verification"[^>]*\/>/g, gscHtml)
        .replace(/<!-- %VITE_BING_WEBMASTER_VERIFICATION% -->|<!-- Bing Webmaster Tools Verification Placeholder -->\s*<meta name="msvalidate\.01"[^>]*\/>/g, bingHtml)
        .replace(/<!-- %VITE_GA4_INJECTION% -->|<!-- Google Analytics \(GA4\) Integration Placeholder -->[\s\S]*?-->/g, ga4Html);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), seoAndAnalyticsPlugin()],
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
              if (
                id.includes('/node_modules/react/') ||
                id.includes('/node_modules/react-dom/') ||
                id.includes('/node_modules/scheduler/')
              ) {
                return 'vendor-react';
              }
              if (
                id.includes('/node_modules/framer-motion/') ||
                id.includes('/node_modules/motion/') ||
                id.includes('/node_modules/motion-dom/') ||
                id.includes('/node_modules/motion-utils/')
              ) {
                return 'vendor-motion';
              }
              if (id.includes('/node_modules/lucide-react/')) {
                return 'vendor-icons';
              }
              if (
                id.includes('/node_modules/firebase/') ||
                id.includes('/node_modules/@firebase/')
              ) {
                return 'vendor-firebase';
              }
              return 'vendor-libs';
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
