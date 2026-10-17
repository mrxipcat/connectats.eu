// Rep el formulari de contacte (POST /api/contacte) i l'envia per correu.
// Funciona sense JavaScript al navegador: el formulari s'envia de manera
// clàssica i la funció respon amb una redirecció a la pàgina d'agraïment
// o a la d'error.
//
// Configuració (Azure → Static Web App → Variables d'entorn):
//   SMTP_USUARI     compte de Gmail que envia, per exemple connectats.eu@gmail.com
//   SMTP_CONTRASENYA contrasenya d'aplicació d'aquest compte
//   SMTP_SERVIDOR   (opcional) per defecte smtp.gmail.com
//   SMTP_PORT       (opcional) per defecte 465
//   CORREU_DESTI    (opcional) on arriben els missatges; per defecte SMTP_USUARI

import { app } from '@azure/functions';
import nodemailer from 'nodemailer';

const MOTIUS = {
  formacio: 'Demanar una formació',
  collaboracio: 'Col·laboració',
  altres: 'Altres',
};

const PAGINA_ENVIAT = '/contacte/enviat/';
const PAGINA_ERROR = '/contacte/error/';

const redirigeix = (desti) => ({ status: 303, headers: { Location: desti } });

// La causa viatja a l'adreça de la pàgina d'error (?causa=...) per poder
// diagnosticar sense haver de consultar els registres d'Azure.
const error = (causa) => redirigeix(`${PAGINA_ERROR}?causa=${causa}`);

/** Treu espais dels extrems i salts de línia, i talla a una llargada màxima. */
const net = (valor, maxim) =>
  String(valor ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, maxim);

const correuValid = (correu) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correu);

/** Comprova els camps. Retorna les dades netes o null si no són vàlides. */
export function validaFormulari(dades) {
  // Camp trampa: només el omplen els robots.
  if (net(dades.get('lloc-web'), 200) !== '') return { robot: true };

  const nom = net(dades.get('nom'), 120);
  const correu = net(dades.get('correu'), 200);
  const telefon = net(dades.get('telefon'), 40);
  const motiu = net(dades.get('motiu'), 40);
  const missatge = String(dades.get('missatge') ?? '').trim().slice(0, 5000);
  const privadesa = dades.get('privadesa') === 'si';

  if (!nom || !correuValid(correu) || !MOTIUS[motiu] || !missatge || !privadesa) return null;
  return { nom, correu, telefon, motiu, missatge };
}

let transport;
function obteTransport() {
  transport ??= nodemailer.createTransport({
    host: process.env.SMTP_SERVIDOR || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    // Google mostra la contrasenya d'aplicació amb espais; els traiem per si s'han copiat.
    auth: { user: process.env.SMTP_USUARI?.trim(), pass: process.env.SMTP_CONTRASENYA?.replace(/\s+/g, '') },
  });
  return transport;
}

export async function contacte(request, context) {
  let dades;
  try {
    dades = await request.formData();
  } catch {
    return error('dades');
  }

  const camps = validaFormulari(dades);
  if (camps?.robot) return redirigeix(PAGINA_ENVIAT);
  if (!camps) return error('dades');

  const remitent = process.env.SMTP_USUARI?.trim();
  if (!remitent || !process.env.SMTP_CONTRASENYA) {
    context.error('Falten les variables SMTP_USUARI o SMTP_CONTRASENYA.');
    return error('configuracio');
  }

  const motiu = MOTIUS[camps.motiu];
  try {
    await obteTransport().sendMail({
      from: { name: 'Formulari web Connectats', address: remitent },
      to: process.env.CORREU_DESTI || remitent,
      replyTo: { name: camps.nom, address: camps.correu },
      subject: `[Web] ${motiu}: ${camps.nom}`,
      text: [
        `Nom: ${camps.nom}`,
        `Correu: ${camps.correu}`,
        `Telèfon: ${camps.telefon || '(no indicat)'}`,
        `Motiu: ${motiu}`,
        '',
        camps.missatge,
        '',
        '--',
        'Enviat des del formulari de contacte de connectats.eu.',
        'Per respondre, contesta aquest correu directament.',
      ].join('\n'),
    });
  } catch (err) {
    context.error("No s'ha pogut enviar el correu:", err?.message);
    // EAUTH: el servidor ha rebutjat l'usuari o la contrasenya.
    return error(err?.code === 'EAUTH' ? 'autenticacio' : 'enviament');
  }

  return redirigeix(PAGINA_ENVIAT);
}

app.http('contacte', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: contacte,
});
