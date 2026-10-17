// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// El domini es pot canviar amb la variable d'entorn SITE_URL.
const site = process.env.SITE_URL ?? 'https://connectats.eu';

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  // Cap full d'estil incrustat: així la política de seguretat (CSP) pot ser estricta.
  build: { format: 'directory', inlineStylesheets: 'never' },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'ca', locales: { ca: 'ca-ES' } },
    }),
  ],
  image: {
    // Només imatges locals: cap domini remot autoritzat (privadesa).
    domains: [],
  },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  vite: {
    // Res incrustat a l'HTML: així la CSP pot ser 'self' sense 'unsafe-inline'.
    build: { assetsInlineLimit: 0 },
  },
});
