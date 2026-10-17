// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// El domini es pot canviar amb la variable d'entorn SITE_URL.
const site = process.env.SITE_URL ?? 'https://connectats.eu';

/**
 * Data de cada entrada d'Actualitat publicada (camp «data» del Markdown), per
 * informar els cercadors de quan ha canviat cada pàgina al sitemap.
 */
function datesActualitat() {
  const carpeta = './src/contingut/actualitat';
  const dates = new Map();
  const perCategoria = new Map();
  for (const fitxer of readdirSync(carpeta).filter((f) => f.endsWith('.md'))) {
    const capcalera = readFileSync(`${carpeta}/${fitxer}`, 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
    const data = capcalera.match(/^data:\s*["']?([0-9-]{10})/m)?.[1];
    const esborrany = /^esborrany:\s*true/m.test(capcalera);
    const categoria = capcalera.match(/^categoria:\s*["']?(\w+)/m)?.[1];
    if (!data || esborrany) continue;
    const d = new Date(data);
    dates.set(fitxer.replace(/\.md$/, ''), d);
    if (categoria && !(perCategoria.get(categoria) > d)) perCategoria.set(categoria, d);
  }
  const darrera = [...dates.values()].sort((a, b) => b.getTime() - a.getTime())[0];
  return { dates, perCategoria, darrera };
}
const { dates, perCategoria, darrera } = datesActualitat();

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  // Cap full d'estil incrustat: així la política de seguretat (CSP) pot ser estricta.
  build: { format: 'directory', inlineStylesheets: 'never' },
  integrations: [
    sitemap({
      // Les pàgines de resposta del formulari i les de paginació (noindex) no han de sortir als cercadors.
      filter: (pagina) =>
        !pagina.includes('/contacte/enviat') && !pagina.includes('/contacte/error') && !pagina.includes('/pagina/'),
      i18n: { defaultLocale: 'ca', locales: { ca: 'ca-ES' } },
      serialize(element) {
        const ruta = new URL(element.url).pathname;
        const slug = ruta.match(/^\/actualitat\/([^/]+)\/$/)?.[1];
        // Entrada: la seva data. Llistat d'una categoria: la darrera entrada d'aquesta categoria.
        // Portada i Actualitat: la darrera entrada publicada.
        const data = slug ? (dates.get(slug) ?? perCategoria.get(slug)) : ['/', '/actualitat/'].includes(ruta) ? darrera : undefined;
        if (data) element.lastmod = data.toISOString();
        return element;
      },
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
