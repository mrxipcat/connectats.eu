// Genera la imatge per a xarxes socials (Open Graph) a partir del logotip.
import sharp from 'sharp';

const W = 1200, H = 630;
const fons = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#EDF6FC"/>
  </linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect y="${H - 16}" width="${W}" height="16" fill="#0A6B96"/>
  <rect y="${H - 16}" width="${W / 2}" height="16" fill="#22A349"/>
</svg>`);

// Logotip complet generat per eines/logo.mjs a partir de Connectats_v4.svg
const logo = await sharp('public/imatges/logo-connectats.svg', { density: 300 }).resize({ width: 880 }).png().toBuffer();
const { height: lh } = await sharp(logo).metadata();

await sharp(fons)
  .composite([{ input: logo, left: Math.round((W - 880) / 2), top: Math.round((H - lh) / 2) - 10}])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile('public/imatges/og-connectats.jpg');

console.log('og-connectats.jpg generada');
