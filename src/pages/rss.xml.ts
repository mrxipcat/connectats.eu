import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { entradesPublicades } from '../lib/contingut';
import { categories, web } from '../lib/web';

export async function GET(context: APIContext) {
  const entrades = await entradesPublicades();
  return rss({
    title: `Actualitat — ${web.nomLlarg}`,
    description: 'Alertes sobre estafes en circulació, articles divulgatius i notícies de l\'associació.',
    site: context.site!,
    trailingSlash: false,
    customData: '<language>ca</language>',
    items: entrades.map((e) => {
      const nom = categories[e.data.categoria].nom;
      // No s'hi afegeix el prefix si el títol ja comença per la categoria.
      const titol = e.data.titol.toLowerCase().startsWith(nom.toLowerCase())
        ? e.data.titol
        : `${nom}: ${e.data.titol}`;
      return {
      title: titol,
      description: e.data.resum,
      pubDate: e.data.data,
      link: `/actualitat/${e.id}`,
      categories: [categories[e.data.categoria].plural],
      };
    }),
  });
}
