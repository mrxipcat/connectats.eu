/**
 * Dades generals de la web.
 * Canviar aquí el correu, les xarxes o les dades de l'entitat es reflecteix a tot el lloc.
 */
export const web = {
  nom: 'Connectats',
  lema: 'Digitalment Segurs',
  nomLlarg: 'Connectats Digitalment Segurs Associació',
  descripcio:
    'Formació, conscienciació i recursos oberts per fer front a les estafes en línia i als riscos digitals, amb atenció especial als col·lectius més vulnerables.',
  correu: 'info@connectats.eu',
  telefon: '', // [PENDENT] opcional
  adreca: '', // [PENDENT] opcional
  nif: 'G-00000000', // [PENDENT]
  registre: 'Registre d\'Associacions de la Generalitat de Catalunya, núm. [PENDENT]', // [PENDENT]
  xarxes: [
    { nom: 'Instagram', url: 'https://www.instagram.com/connectats.eu', etiqueta: 'Instagram (s\'obre en una finestra nova)' },
  ],
} as const;

export const menu = [
  { text: 'Qui som', url: '/qui-som' },
  { text: 'Què fem', url: '/que-fem' },
  { text: 'Recursos', url: '/recursos' },
  { text: 'Actualitat', url: '/actualitat' },
  { text: 'Contacte', url: '/contacte' },
] as const;

export const menuLegal = [
  { text: 'Avís legal', url: '/avis-legal' },
  { text: 'Privadesa i galetes', url: '/privadesa' },
  // Desactivat de moment: { text: 'Accessibilitat', url: '/accessibilitat' },
  // Desactivat de moment: { text: 'Transparència', url: '/transparencia' },
] as const;

export const categories = {
  alertes: { nom: 'Alerta', plural: 'Alertes', url: '/actualitat/alertes' },
  blog: { nom: 'Blog', plural: 'Blog', url: '/actualitat/blog' },
  noticies: { nom: 'Notícia', plural: 'Notícies', url: '/actualitat/noticies' },
} as const;

export const motiusContacte = [
  { valor: 'formacio', text: 'Demanar una formació' },
  { valor: 'collaboracio', text: 'Col·laboració' },
  { valor: 'altres', text: 'Altres' },
] as const;

/** Dies a partir dels quals una alerta deixa de mostrar-se com a destacada a l'inici. */
export const DIES_ALERTA_VIGENT = 30;

/** Nombre d'entrades per pàgina al llistat d'Actualitat. */
export const ENTRADES_PER_PAGINA = 12;

export function formataData(data: Date, opcions: Intl.DateTimeFormatOptions = {}): string {
  return new Intl.DateTimeFormat('ca-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Madrid',
    ...opcions,
  }).format(data);
}

export function formataDataHora(data: Date): string {
  return new Intl.DateTimeFormat('ca-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Madrid',
  }).format(data);
}

/** Imatge per compartir que es fa servir quan una pàgina no en té cap de pròpia (1200×630). */
export const IMATGE_PER_DEFECTE = '/imatges/og-connectats.jpg';

/**
 * URL canònica d'una ruta. Azure Static Web Apps serveix cada pàgina a /ruta/
 * (i redirigeix /ruta cap a /ruta/), així que la canònica sempre acaba en barra,
 * igual que al sitemap.
 */
export function urlCanonica(ruta: string, lloc: URL | undefined): URL {
  const ambBarra = ruta.endsWith('/') ? ruta : `${ruta}/`;
  return new URL(ambBarra, lloc);
}

export function dataISO(data: Date): string {
  return data.toISOString().slice(0, 10);
}
