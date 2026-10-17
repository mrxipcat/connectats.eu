import { getCollection, type CollectionEntry } from 'astro:content';
import { DIES_ALERTA_VIGENT } from './web';

export type Entrada = CollectionEntry<'actualitat'>;

/** Totes les entrades d'Actualitat publicades, de la més recent a la més antiga. */
export async function entradesPublicades(): Promise<Entrada[]> {
  const entrades = await getCollection('actualitat', ({ data }) => !data.esborrany);
  return entrades.sort((a, b) => b.data.data.getTime() - a.data.data.getTime());
}

export async function entradesDe(categoria: Entrada['data']['categoria']): Promise<Entrada[]> {
  return (await entradesPublicades()).filter((e) => e.data.categoria === categoria);
}

/** Les N alertes més recents. */
export async function alertesRecents(n = 3): Promise<Entrada[]> {
  return (await entradesDe('alertes')).slice(0, n);
}

/**
 * L'alerta destacada de la portada: només es mostra si té menys de
 * DIES_ALERTA_VIGENT dies d'antiguitat.
 */
export async function alertaVigent(ara = new Date()): Promise<Entrada | null> {
  const [alerta] = await alertesRecents(1);
  if (!alerta) return null;
  const dies = (ara.getTime() - alerta.data.data.getTime()) / 86_400_000;
  return dies <= DIES_ALERTA_VIGENT ? alerta : null;
}

/** Activitats de l'agenda que encara no han passat, de la més pròxima a la més llunyana. */
export async function activitatsFutures(ara = new Date()) {
  const activitats = await getCollection('agenda');
  return activitats
    .filter((a) => a.data.data.getTime() >= ara.getTime())
    .sort((a, b) => a.data.data.getTime() - b.data.data.getTime());
}

export async function recursosOrdenats() {
  const recursos = await getCollection('recursos');
  return recursos.sort((a, b) => a.data.ordre - b.data.ordre || a.data.titol.localeCompare(b.data.titol, 'ca'));
}

export async function equipOrdenat() {
  const equip = await getCollection('equip');
  return equip.sort((a, b) => a.data.ordre - b.data.ordre);
}

export async function collaboradorsOrdenats() {
  const c = await getCollection('collaboradors');
  return c.sort((a, b) => a.data.ordre - b.data.ordre);
}

/** Entrades de la mateixa categoria, excloent-ne una. */
export async function relacionades(entrada: Entrada, n = 3): Promise<Entrada[]> {
  return (await entradesDe(entrada.data.categoria)).filter((e) => e.id !== entrada.id).slice(0, n);
}
