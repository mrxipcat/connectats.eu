# Web de Connectats — Digitalment Segurs

Aquesta és la web de l'associació **Connectats**, feta perquè **es pugui actualitzar sense saber programar**.

- Adreça pública: <https://connectats.eu>
- Panell per publicar continguts: <https://app.pagescms.org> (vegeu [Com publicar continguts](#com-publicar-continguts))

> **Si només voleu publicar una alerta, un article, una activitat o un recurs**, aneu directament a la secció [Com publicar continguts](#com-publicar-continguts). No cal llegir la resta.

---

## Índex

1. [Com publicar continguts](#com-publicar-continguts)
   - [Publicar una alerta o un article](#publicar-una-alerta-o-un-article)
   - [Afegir una activitat a l'agenda](#afegir-una-activitat-a-lagenda)
   - [Afegir un recurs descarregable](#afegir-un-recurs-descarregable)
   - [Canviar les persones de l'equip](#canviar-les-persones-de-lequip)
   - [Afegir una entitat col·laboradora](#afegir-una-entitat-collaboradora)
2. [Canviar textos fixos](#canviar-textos-fixos)
3. [Coses pendents abans de publicar la web](#coses-pendents-abans-de-publicar-la-web)
4. [Connectar el formulari de contacte](#connectar-el-formulari-de-contacte)
5. [Com està feta (part tècnica)](#com-està-feta-part-tècnica)
6. [Treballar-hi a l'ordinador](#treballar-hi-a-lordinador)
7. [Decisions de seguretat i privadesa](#decisions-de-seguretat-i-privadesa)

---

## Com publicar continguts

Tot el contingut que canvia sovint són **fitxers de text** dins la carpeta `src/contingut/`.
No cal obrir-los a mà: fem servir **Pages CMS**, un panell web gratuït que els edita per nosaltres.

### Entrar al panell, la primera vegada

1. Aneu a <https://app.pagescms.org>.
2. Cliqueu **Sign in with GitHub** i entreu amb el compte de GitHub de l'associació.
3. Autoritzeu l'accés al repositori `connectats.eu`.
4. Ja hi sou. A l'esquerra veureu: **Actualitat**, **Agenda d'activitats**, **Recursos**, **Equip** i **Entitats col·laboradores**.

Quan deseu un canvi al panell, es publica sol a la web **en 2-3 minuts**. No cal fer res més.

### Publicar una alerta o un article

1. Al panell, cliqueu **Actualitat** → botó **Add an entry**.
2. Ompliu els camps:
   - **Títol** — curt i clar. A les alertes, comenceu per «Alerta:».
   - **Data de publicació** — la data d'avui.
   - **Categoria** — trieu-ne una:
     | Categoria | Per a què serveix | Quant de text |
     |---|---|---|
     | **Alertes** | Estafes que circulen ara, avisos ràpids | 100-300 paraules |
     | **Blog** | Articles divulgatius, consells | 500-1.200 paraules |
     | **Notícies** | Activitats fetes, convenis, mitjans | 200-500 paraules |
   - **Resum** — màxim 200 caràcters. És el que es veu a les targetes i a Google.
   - **Imatge** (opcional) — si en poseu una, **ompliu també «Descripció de la imatge»**: és el text que llegeix qui no la pot veure.
   - **Esborrany** — deixeu-ho desactivat per publicar; activeu-ho si encara hi treballeu.
   - **Text de l'entrada** — el cos de l'article.
3. Cliqueu **Save**.

**Què passa després:** l'entrada apareix automàticament a `/actualitat`, al filtre de la seva categoria, al fil RSS i (si és de les 3 més recents) a la portada.
Si és una **alerta**, també surt destacada a la portada i a la pàgina «He patit una estafa» **durant 30 dies**. Passats els 30 dies desapareix sola de la portada, però continua publicada.

### Afegir una activitat a l'agenda

1. Panell → **Agenda d'activitats** → **Add an entry**.
2. Ompliu títol, **data i hora**, lloc, modalitat (presencial o en línia) i, si n'hi ha, l'enllaç d'inscripció.
3. Deseu.

**Les activitats passades desapareixen soles** de la pàgina «Què fem». No cal esborrar-les.
Si no hi ha cap activitat futura, la web mostra automàticament: *«Ara mateix no hi ha activitats programades. Vols organitzar-ne una? Contacta'ns.»*

### Afegir un recurs descarregable

1. **Primer pugeu el fitxer PDF.** Al panell, Pages CMS us deixa pujar fitxers a la carpeta d'imatges; per als PDF és més còmode fer-ho des de GitHub:
   repositori → carpeta `public/fitxers/` → **Add file** → **Upload files** → arrossegueu-hi el PDF → **Commit changes**.
2. Panell → **Recursos** → **Add an entry**.
3. Ompliu títol, descripció, públic destinatari, format (PDF, vídeo o enllaç), idioma i:
   - Si és un **PDF**: a «Fitxer o adreça» escriviu `/fitxers/el-nom-del-fitxer.pdf`.
   - Si és un **vídeo o un enllaç**: enganxeu-hi l'adreça completa (`https://…`).
4. **Ordre a la llista**: número més baix = surt abans.

### Canviar les persones de l'equip

Panell → **Equip**. Cada persona és una fitxa amb nom, rol, una línia de presentació i una foto opcional.
Si no hi poseu foto, surt una silueta de color.

### Afegir una entitat col·laboradora

Panell → **Entitats col·laboradores** → **Add an entry**. Pugeu el logotip i poseu-hi el nom i l'adreça web.

**Mentre no n'hi hagi cap, el bloc «Entitats col·laboradores» no apareix a la pàgina «Qui som».** S'hi afegeix sol quan en creeu la primera.

---

## Canviar textos fixos

Els textos que no canvien sovint (el lema, la missió, els temes dels tallers, la llista d'estafes habituals…) són dins el codi. Es poden canviar des de GitHub, editant el fitxer i desant-lo:

| Què vull canviar | Fitxer |
|---|---|
| Correu, xarxes socials, NIF, nom de l'entitat | `src/lib/web.ts` |
| Textos de la portada | `src/pages/index.astro` |
| Missió, finalitats | `src/pages/qui-som.astro` |
| Temes dels tallers, públics | `src/pages/que-fem.astro` |
| Passos, estafes habituals, on denunciar | `src/pages/he-patit-una-estafa.astro` |
| Avís legal / Privadesa / Accessibilitat / Transparència | `src/pages/avis-legal.astro`, `privadesa.astro`, `accessibilitat.astro`, `transparencia.astro` |
| Colors i mides | `src/styles/global.css` (a la part de dalt, secció «Variables») |

**Com editar un fitxer des de GitHub:** obriu el fitxer al web de GitHub → icona del llapis (✏️) → canvieu el text **entre les cometes o entre les etiquetes `<p>` i `</p>`** → **Commit changes**.
Si us equivoqueu, GitHub guarda totes les versions i es pot tornar enrere.

> **Consell:** canvieu una sola cosa cada vegada i mireu la web al cap de 3 minuts. Així, si alguna cosa falla, sabeu què ha estat.

---

## Coses pendents abans de publicar la web

Tots els textos provisionals estan marcats amb **`[PENDENT]`** perquè siguin fàcils de trobar.
Per localitzar-los tots: a GitHub, cerqueu `[PENDENT]` dins el repositori.

Llista del que cal resoldre:

- [ ] **Dades de l'entitat**: NIF, adreça, número de registre (`src/lib/web.ts`).
- [ ] **Correu electrònic real** i perfils de xarxes socials (`src/lib/web.ts`).
- [ ] **Fotos i noms de l'equip** (panell → Equip).
- [ ] **Entrades de mostra**: les 6 entrades d'Actualitat són exemples; substituïu-les o esborreu-les.
- [ ] **Activitats de mostra** a l'agenda.
- [ ] **PDF dels recursos**: cal pujar els fitxers reals a `public/fitxers/`.
- [ ] **Estatuts en PDF** a `public/fitxers/estatuts-connectats.pdf` (pàgina de Transparència).
- [ ] **Junta directiva, comptes i subvencions** (`src/pages/transparencia.astro`).
- [ ] **Verificar telèfons i adreces** de la pàgina «He patit una estafa» (112, 017, Mossos, APDCAT).
- [ ] **Revisar l'avís legal i la política de privadesa**, preferiblement amb assessorament jurídic.
- [ ] **Connectar el formulari de contacte** (secció següent).
- [ ] **Substituir les il·lustracions per fotos reals**, si es vol (vegeu `public/imatges/LLEGEIX-ME.md`).

---

## Connectar el formulari de contacte

La web és estàtica, però porta una petita **funció d'Azure** (carpeta `api/`) que rep el formulari a `/api/contacte` i l'envia per correu a través del servidor SMTP de **Gmail**, des del compte `connectats.eu@gmail.com`. (El correu del domini és a Zoho Mail, però el pla gratuït de Zoho no permet SMTP.) No hi ha scripts de tercers ni CAPTCHA: l'antispam el fa un **camp ocult** (*honeypot*).

Quan algú envia el formulari, el correu arriba a la bústia configurada, amb l'adreça de la persona com a «Respon a»: per contestar n'hi ha prou de respondre el correu. La persona veu la pàgina `/contacte/enviat/` (o `/contacte/error/` si alguna cosa falla).

**Mentre no estigui activat**, el formulari surt desactivat amb un avís i l'adreça de correu a la vista. La web funciona igualment.

### Com activar-lo

1. **Contrasenya d'aplicació a Google.** Entreu al compte de Google `connectats.eu@gmail.com` → *Seguretat* → activeu la **verificació en dos passos** (és obligatòria) → **Contrasenyes d'aplicació** (myaccount.google.com/apppasswords) i creeu-ne una (per exemple, «Web Azure»). Google la mostra una sola vegada: són 16 lletres.
2. **Variables a Azure.** Portal d'Azure → la Static Web App → **Variables d'entorn** (*Environment variables*) → producció, i afegiu:

   | Nom | Valor |
   |---|---|
   | `SMTP_USUARI` | `connectats.eu@gmail.com` |
   | `SMTP_CONTRASENYA` | la contrasenya d'aplicació del pas 1 |
   | `CORREU_DESTI` | *(opcional)* la bústia on han d'arribar els missatges; per exemple `formulari@connectats.eu`; si no hi és, arriben al mateix compte de Gmail |
   | `SMTP_SERVIDOR`, `SMTP_PORT` | *(opcionals)* per defecte `smtp.gmail.com` i `465` |

   La contrasenya **no** va mai al repositori.
3. **Activar el formulari.** A GitHub: repositori → **Settings** → **Secrets and variables** → **Actions** → pestanya **Variables** → **New repository variable**:
   - Nom: `PUBLIC_FORM_ENDPOINT`
   - Valor: `/api/contacte`
4. Torneu a desplegar (pestanya **Actions** → *Run workflow*, o qualsevol canvi a `main`). Envieu un missatge de prova i comproveu que arriba.

---

## Com està feta (part tècnica)

| Peça | Tecnologia | Per què |
|---|---|---|
| Generador | [Astro](https://astro.build) 7 | Genera HTML estàtic: el més segur, ràpid i barat d'allotjar |
| Continguts | Markdown amb metadades, a `src/contingut/` | Cada entrada és un fitxer; es versiona a Git |
| Edició sense codi | [Pages CMS](https://pagescms.org) via `.pages.yml` | Panell web gratuït, sense servidor propi ni comptes nous |
| Allotjament | Azure Static Web Apps | HTTPS gratuït, desplegament automàtic des de GitHub |
| Tipografia | Atkinson Hyperlegible Next, allotjada aquí mateix | Dissenyada per a persones amb baixa visió; cap petició a tercers |
| Il·lustracions | SVG originals, a `public/imatges/` | Lleugeres, s'adapten al mode fosc, sense problemes de llicència |

### Estructura de carpetes

```
src/
├── contingut/        ← el contingut editable (Actualitat, Agenda, Recursos, Equip…)
├── pages/            ← una pàgina de la web per fitxer
├── components/       ← trossos reutilitzables (capçalera, peu, targetes…)
├── layouts/          ← estructura comuna de les pàgines
├── lib/              ← dades generals (web.ts) i funcions de contingut
└── styles/global.css ← colors, tipografia i estils comuns
public/               ← fitxers que es publiquen tal qual (imatges, PDF, tipografies)
eines/                ← utilitats de desenvolupament (no es publiquen)
_web-antiga/          ← la web anterior, guardada per si de cas (no es publica)
```

### Paleta de colors

Surt del logotip, enfosquida fins a complir el contrast **WCAG AA**:

| Ús | Color | Variable CSS |
|---|---|---|
| Blau del logotip | `#58B0E8` | `--blau-400` |
| Blau principal (botons, enllaços) | `#0A6B96` | `--principal` |
| Verd del logotip | `#58E858` | `--verd-400` |
| Verd d'accent | `#16682F` | `--accent` |
| Avís (només «He patit una estafa» i alertes) | `#B3310B` | `--avis` |

> El color d'avís **està reservat** al botó «He patit una estafa» i a les alertes. Si es fa servir per a altres coses, deixa de cridar l'atenció quan cal.

---

## Treballar-hi a l'ordinador

Només cal si es vol canviar el disseny o l'estructura. Per publicar contingut no fa falta.

```bash
npm install        # la primera vegada
npm run dev        # obre la web a http://localhost:4321
npm run build      # genera la web final a la carpeta dist/
npm run preview    # mira la web final abans de publicar-la
```

Cal tenir [Node.js](https://nodejs.org) 20 o superior.

Eines auxiliars:

```bash
node eines/og.mjs                                    # regenera la imatge per a xarxes socials
node eines/captura.mjs http://localhost:4321/ p.png 390 900   # captura mòbil i detecta desbordaments
```

### Com es publica

Cada canvi a la branca `main` de GitHub dispara el desplegament automàtic a Azure Static Web Apps (fitxer `.github/workflows/azure-static-web-apps-red-moss-001866610.yml`). Triga 2-3 minuts.

A més, la web **es reconstrueix sola cada nit** (a les 4.15 h). Cal, perquè hi ha contingut que depèn de la data: les activitats passades han de desaparèixer de l'agenda i l'alerta destacada de la portada s'ha d'amagar als 30 dies.
També es pot llançar un desplegament a mà des de GitHub → pestanya **Actions** → *Azure Static Web Apps CI/CD* → **Run workflow**.

---

## Decisions de seguretat i privadesa

La web d'una entitat de ciberseguretat ha de predicar amb l'exemple. Això és el que s'ha fet:

- **Sense galetes ni rastrejadors.** Cap analítica, cap píxel de publicitat. Per això no hi ha bàner de galetes, i s'explica a la pàgina de privadesa.
- **Sense recursos de tercers.** Tipografies, imatges i scripts surten del mateix domini. El navegador de qui visita la web **no fa cap petició a cap altre servidor**.
- **Vídeos enllaçats, mai incrustats**, per no carregar galetes de plataformes externes.
- **Capçaleres de seguretat** configurades a `staticwebapp.config.json`:
  `Content-Security-Policy` (estricta, sense `unsafe-inline`), `Strict-Transport-Security`,
  `X-Content-Type-Options`, `Referrer-Policy: no-referrer`, `Permissions-Policy`,
  `X-Frame-Options` i `Cross-Origin-Opener-Policy`.
- **Formulari amb consentiment explícit**, recollida mínima de dades i protecció antispam amb camp ocult, sense CAPTCHA de tercers.
- **Accessibilitat WCAG 2.1 AA**: text de 18 px mínim, contrastos verificats, navegació amb teclat, enllaç «Salta al contingut», àrees de clic de 44 px i mode fosc automàtic.

### Si s'hi vol afegir estadístiques

Feu servir una solució **sense galetes** i allotjada a la UE (per exemple, una instància pròpia de Plausible o Umami). Caldrà afegir el seu domini a `connect-src` i `script-src` dins la `Content-Security-Policy`, i documentar-ho a la pàgina de privadesa.

### Si s'hi vol afegir el castellà

L'estructura ja hi està preparada: cap text viu dins d'una imatge i les pàgines estan separades del disseny. El camí seria moure les pàgines a `src/pages/ca/` i `src/pages/es/` i afegir un selector d'idioma a la capçalera.
