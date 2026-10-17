// Genera tots els recursos de marca a partir del logotip original (Connectats_v4.svg).
// Així el logo, l'onada i el favicon fan servir exactament les mateixes corbes i colors.
// Execució: node eines/logo.mjs
import fs from 'node:fs';
import sharp from 'sharp';
import { optimize } from 'svgo';

// Colors originals del logotip (Connectats_v4.svg)
const BLAU = '#5BB3F0';
const VERD = '#5BF05B';
const TEXT = '#1D1D1B';
const TEXT_FOSC = '#E8EFF3'; // lletres del logo en mode fosc

const original = fs.readFileSync('Connectats_v4.svg', 'utf8');

const peces = (classe, etiqueta = 'path|circle') =>
  [...original.matchAll(new RegExp(`<(?:${etiqueta}) class="${classe}"[^>]*/>`, 'g'))].map((m) => m[0]);

// Onada: corbes verda (st1) i blava (st2) amb els dos punts finals
const verd = peces('st1').map((p) => p.replace('class="st1"', 'class="v"'));
const blau = peces('st2').map((p) => p.replace('class="st2"', 'class="b"'));
const onada = [...verd, ...blau].join('');
// Lletres «Connectats» i «DIGITALMENT SEGURS»
const lletres = peces('st0', 'path').map((p) => p.replace(' class="st0"', '')).join('');

// Caixes mesurades sobre el logo original (unitats del viewBox 900×380)
const ONADA = { x: 193.1, y: 71.2, w: 520.2, h: 88.8 };
const MARGE = 4;
const caixa = (h) => `${ONADA.x - MARGE} ${ONADA.y - MARGE} ${ONADA.w + MARGE * 2} ${h + MARGE * 2}`;

const neteja = (svg) =>
  optimize(svg, {
    multipass: true,
    floatPrecision: 2,
    plugins: [{ name: 'preset-default', params: { overrides: { inlineStyles: false, minifyStyles: false } } }],
  }).data;

const escriu = (fitxer, svg) => {
  fs.writeFileSync(fitxer, neteja(svg) + '\n');
  console.log('·', fitxer);
};

const estilOnada = `.b{fill:${BLAU}}.v{fill:${VERD}}`;

// 1. Logotip complet (onada + lletres), amb lletres clares en mode fosc
escriu(
  'public/imatges/logo-connectats.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${caixa(228.7)}">
  <style>${estilOnada}.t{fill:${TEXT}}@media (prefers-color-scheme:dark){.t{fill:${TEXT_FOSC}}}</style>
  ${onada}<g class="t">${lletres}</g></svg>`,
);

// 2. Només l'onada (capçalera, peu, separadors)
escriu(
  'public/imatges/marca-connectats.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${caixa(ONADA.h)}" aria-hidden="true"><style>${estilOnada}</style>${onada}</svg>`,
);

// 3. Favicon: el tram final de l'onada (darrers arcs i els dos punts), sobre blanc
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#FFFFFF"/>
  <svg x="4" y="4" width="56" height="56" viewBox="548 92 168 72" preserveAspectRatio="xMidYMid meet">${onada}</svg>
  <style>${estilOnada}</style></svg>`;
escriu('public/favicon.svg', favicon);
await sharp(Buffer.from(favicon), { density: 300 }).resize(180, 180).png().toFile('public/apple-touch-icon.png');
console.log('· public/apple-touch-icon.png');

// 4. Onada dins de les il·lustracions: { fitxer: [x, y, amplada] } en unitats de cada il·lustració
const illustracions = {
  'inici-persones-connectades': [22, 24, 760],
  'que-fem-taller': [70, 8, 660],
  'recursos-materials': [40, 4, 640],
};
const MARCA = /(<!-- onada-logo:[^>]*-->)[\s\S]*?(<!-- \/onada-logo -->)/;
for (const [nom, [x, y, w]] of Object.entries(illustracions)) {
  const fitxer = `public/imatges/${nom}.svg`;
  const s = fs.readFileSync(fitxer, 'utf8');
  if (!MARCA.test(s)) throw new Error(`Falten les marques <!-- onada-logo --> a ${fitxer}`);
  const k = w / ONADA.w;
  const g = `<g transform="translate(${(x - ONADA.x * k).toFixed(2)} ${(y - ONADA.y * k).toFixed(2)}) scale(${k.toFixed(4)})">${onada
    .replaceAll('class="b"', 'class="onada-blau"')
    .replaceAll('class="v"', 'class="onada-verd"')}</g>`;
  fs.writeFileSync(fitxer, s.replace(MARCA, `$1\n  ${g}\n  $2`));
  console.log('·', fitxer);
}
