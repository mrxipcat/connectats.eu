import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Col·leccions de contingut.
 * Cada entrada és un fitxer Markdown dins de src/contingut/…
 * Es poden editar amb el gestor de continguts (Pages CMS) sense tocar codi.
 */

const actualitat = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/contingut/actualitat' }),
  schema: z.object({
    titol: z.string(),
    data: z.coerce.date(),
    categoria: z.enum(['alertes', 'blog', 'noticies']),
    resum: z.string().max(200),
    imatge: z.string().optional(),
    imatge_alt: z.string().optional(),
    esborrany: z.boolean().default(false),
  }),
});

const agenda = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/contingut/agenda' }),
  schema: z.object({
    titol: z.string(),
    data: z.coerce.date(),
    // Si és true, la data només serveix per ordenar l'agenda i es mostra «Data per confirmar».
    data_per_confirmar: z.boolean().default(false),
    lloc: z.string().optional(),
    modalitat: z.enum(['presencial', 'en línia']).optional(),
    enllac_inscripcio: z.string().url().optional(),
    descripcio: z.string().optional(),
  }),
});

const recursos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/contingut/recursos' }),
  schema: z.object({
    titol: z.string(),
    descripcio: z.string(),
    public: z.array(z.string()).nonempty(),
    format: z.enum(['PDF', 'vídeo', 'enllaç']),
    idioma: z.string().default('Català'),
    fitxer_o_url: z.string(),
    ordre: z.number().default(100),
  }),
});

const equip = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/contingut/equip' }),
  schema: z.object({
    nom: z.string(),
    rol: z.string(),
    presentacio: z.string(),
    foto: z.string().optional(),
    ordre: z.number().default(100),
  }),
});

const collaboradors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/contingut/collaboradors' }),
  schema: z.object({
    nom: z.string(),
    logo: z.string(),
    url: z.string().url().optional(),
    ordre: z.number().default(100),
  }),
});

export const collections = { actualitat, agenda, recursos, equip, collaboradors };
