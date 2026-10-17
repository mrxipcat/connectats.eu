# Especificació de la web de [NOM DE L'ASSOCIACIÓ]

> **Instruccions per a Claude Code**
> Aquest document descriu la primera versió de la web d'una associació sense ànim de lucre dedicada a la formació i sensibilització en seguretat digital. Genera una web completa i funcional a partir d'aquesta especificació. Quan una decisió no estigui definida aquí, tria l'opció més senzilla de mantenir. Tots els textos visibles han d'estar en **català**. On falti contingut real, utilitza textos de mostra coherents amb el tema i marca'ls amb `[PENDENT]` perquè siguin fàcils de localitzar i substituir.

---

## 1. Context del projecte

L'associació promou l'ús segur, crític i responsable de les tecnologies digitals, amb especial atenció als col·lectius més vulnerables: infants, adolescents, persones grans i persones amb necessitats de suport. Treballa en la prevenció d'estafes en línia, frau, suplantació d'identitat, assetjament digital i desinformació, i ofereix tallers, xerrades, assessorament i materials oberts a particulars, famílies, centres educatius, entitats socials i petites organitzacions.

L'equip actiu és de **dues persones sense perfil tècnic**. Per això la web ha de ser:

- Senzilla: poques pàgines, sense subpàgines innecessàries.
- Fàcil d'actualitzar: publicar una alerta o un article ha de ser possible en pocs minuts i sense tocar codi.
- Exemplar: com que és una entitat de ciberseguretat, la mateixa web ha de demostrar bones pràctiques de seguretat, privadesa i accessibilitat.

---

## 2. Mapa web

```
0. INICI  (/)
   ├── Missatge principal: qui som i què fem (2-3 línies)
   ├── Botó destacat "He patit una estafa"
   ├── Darrera alerta (bloc destacat, automàtic)
   ├── Què oferim (3 blocs: formació · assessorament · recursos)
   ├── Darreres entrades d'Actualitat (3, automàtic)
   └── Contacte ràpid

1. QUI SOM  (/qui-som)
   └── Pàgina única: missió, finalitats, qui hi ha darrere i entitats col·laboradores

2. QUÈ FEM  (/que-fem)
   └── Pàgina única amb tres blocs:
         · Tallers i xerrades
         · Assessorament a persones i entitats
         · Agenda d'activitats
       + botó "Demana una formació" → Contacte

3. RECURSOS  (/recursos)
   └── Pàgina única: llista de guies i materials descarregables

4. ACTUALITAT  (/actualitat)
   ├── Llistat amb filtre per categoria: Alertes · Blog · Notícies
   └── Entrada individual  (/actualitat/[slug])

5. HE PATIT UNA ESTAFA  (/he-patit-una-estafa)
   └── Pàgina única:
         · Què fer ara mateix
         · Alertes recents (automàtic)
         · Estafes més habituals i com reconèixer-les
         · On denunciar
         · Contacta amb nosaltres

6. CONTACTE  (/contacte)
   └── Formulari, correu electrònic i xarxes socials

PEU DE PÀGINA
   ├── Avís legal  (/avis-legal)
   ├── Privadesa i galetes  (/privadesa)
   ├── Accessibilitat  (/accessibilitat)
   └── Transparència  (/transparencia)
```

### Menú principal

Qui som · Què fem · Recursos · Actualitat · Contacte

A la dreta de la capçalera, separat del menú, el botó **"He patit una estafa"** amb color diferenciat (vegeu secció 5).

---

## 3. Contingut de cada pàgina

### 0. Inici

1. **Capçalera principal (hero):** títol curt, subtítol de 2-3 línies explicant la missió i dos botons: "Què fem" i "He patit una estafa".
2. **Darrera alerta:** bloc amb el tractament visual d'alerta (vegeu 5.3). Mostra títol, data, resum i enllaç. **S'amaga automàticament si l'alerta més recent té més de 30 dies.**
3. **Què oferim:** tres targetes amb icona, títol, frase breu i enllaç:
   - Formació → `/que-fem#tallers`
   - Assessorament → `/que-fem#assessorament`
   - Recursos → `/recursos`
4. **Darreres entrades:** les 3 entrades més recents d'Actualitat (qualsevol categoria), en targetes.
5. **Contacte ràpid:** frase breu i botó cap a `/contacte`.

### 1. Qui som

Una sola pàgina amb aquests blocs:

- Missió (paràgraf breu).
- Finalitats: resum en llenguatge planer de les finalitats estatutàries (vegeu annex A).
- Qui som: les persones que hi ha al darrere, amb foto opcional i una línia de presentació.
- Entitats col·laboradores: graella de logotips. Si no n'hi ha, el bloc no es mostra.

### 2. Què fem

Una sola pàgina amb tres blocs, cadascun amb àncora pròpia:

- `#tallers`: **Tallers i xerrades.** Temes que es treballen (estafes en línia, contrasenyes i autenticació, privadesa a les xarxes, protecció de dades, ús segur del mòbil, desinformació, ciberassetjament) i públics als quals s'adrecen (centres educatius, famílies, gent gran, entitats socials, petites organitzacions). Modalitat presencial o en línia.
- `#divulgacio`: **Conscienciació i divulgació.** Alertes, articles, campanyes de sensibilització i materials oberts. L'associació no ofereix servei d'acompanyament ni atén casos particulars.
- `#agenda`: **Agenda.** Llista de properes activitats (data, títol, lloc, modalitat, enllaç d'inscripció opcional). Si no hi ha activitats futures, mostra el missatge: "Ara mateix no hi ha activitats programades. Vols organitzar-ne una? Contacta'ns."

Al final, un botó destacat **"Demana una formació"** que porta a `/contacte?motiu=formacio` amb el motiu ja seleccionat al formulari.

### 3. Recursos

Una sola pàgina amb una graella de recursos. Cada recurs té: títol, descripció breu, públic destinatari, format (PDF, vídeo, enllaç), idioma i botó de descàrrega o d'accés. Els vídeos s'enllacen a una plataforma externa; no s'incrusten per evitar galetes de tercers (vegeu 5.5).

Comença amb 3-4 recursos de mostra marcats com a `[PENDENT]`.

### 4. Actualitat

**Llistat** (`/actualitat`): entrades ordenades per data descendent, amb filtre per categoria (Totes · Alertes · Blog · Notícies). El filtre ha de funcionar també sense JavaScript (per exemple, amb URL pròpies: `/actualitat/alertes`, `/actualitat/blog`, `/actualitat/noticies`). Paginació a partir de 12 entrades.

**Entrada individual** (`/actualitat/[slug]`): títol, data, categoria, imatge opcional, cos del text, botons per compartir (enllaços simples, sense scripts de xarxes socials) i enllaç a entrades relacionades de la mateixa categoria.

Categories:

| Categoria | Ús | Extensió típica |
|---|---|---|
| Alertes | Estafes en circulació, avisos ràpids | 100-300 paraules |
| Blog | Articles divulgatius, consells, bones pràctiques | 500-1.200 paraules |
| Notícies | Activitats fetes, convenis, aparicions als mitjans | 200-500 paraules |

Crea 2 entrades de mostra per categoria, marcades com a `[PENDENT]`.

### 5. He patit una estafa

És la pàgina més important de la web. Ha de ser clara, tranquil·litzadora i fàcil de seguir per a una persona nerviosa o amb poca experiència digital. Frases curtes, llenguatge planer i cap tecnicisme sense explicar.

1. **Què fer ara mateix:** passos numerats i destacats visualment:
   1. Mantén la calma i no esborris res (missatges, correus, captures).
   2. Si has donat dades bancàries o has fet un pagament, truca immediatament al teu banc.
   3. Canvia les contrasenyes dels comptes afectats.
   4. Avisa les persones de contacte si t'han suplantat.
   5. Presenta una denúncia.
2. **Alertes recents:** les 3 darreres entrades de la categoria Alertes (automàtic).
3. **Estafes més habituals:** blocs desplegables amb el nom de cada estafa, com reconèixer-la i què fer. Com a mínim: missatges SMS i correus falsos (smishing i phishing), trucades que es fan passar pel banc, falses botigues en línia, suplantació a WhatsApp ("Hola mama, he canviat de número"), falses inversions, ciberassetjament i sextorsió.
4. **On denunciar:** targetes amb telèfon i enllaç:
   - Mossos d'Esquadra: 112 en cas d'urgència; denúncia a comissaria o per internet.
   - INCIBE, Línia d'ajuda en ciberseguretat: 017 (gratuït i confidencial).
   - El teu banc (telèfon que figura a la targeta o a l'aplicació).
   - Autoritat Catalana de Protecció de Dades (APDCAT), per a vulneracions de dades personals.
   - Verifica i actualitza aquestes dades abans de publicar `[PENDENT]`.
5. **Encara tens dubtes?:** remet a la Línia d'ajuda en ciberseguretat de l'INCIBE (017).

Afegeix un avís: "Aquesta associació es dedica a la formació, la conscienciació i la divulgació. No atenem casos particulars ni substituïm els serveis d'emergència, la policia ni l'assessorament jurídic."

### 6. Contacte

- Formulari amb: nom, correu electrònic, telèfon (opcional), motiu (desplegable: Demanar una formació · Col·laboració · Altres), missatge i casella obligatòria d'acceptació de la política de privadesa.
- El motiu es preselecciona amb el paràmetre `?motiu=` de la URL.
- Avís visible sobre el formulari: **"No ens enviïs mai contrasenyes, codis de verificació ni dades bancàries per aquest formulari ni per cap altre mitjà."**
- Correu electrònic de contacte i enllaços a xarxes socials `[PENDENT]`.
- Protecció antispam sense CAPTCHA de tercers (camp ocult tipus *honeypot*).

### Peu de pàgina

Present a totes les pàgines: nom i logotip de l'associació, enllaços legals (Avís legal · Privadesa i galetes · Accessibilitat · Transparència), xarxes socials i, si n'hi ha, logotips de finançadors.

- **Avís legal, Privadesa i Accessibilitat:** plantilles de text genèriques marcades com a `[PENDENT DE REVISIÓ]`.
- **Transparència:** pàgina mínima amb estatuts (PDF), composició de la junta directiva, comptes anuals i subvencions rebudes, si n'hi ha. Text de mostra `[PENDENT]`.

---

## 4. Model de contingut

Els continguts que s'actualitzen sovint s'han de poder editar sense tocar codi. Cada tipus de contingut és un fitxer independent (per exemple, Markdown amb metadades al principi).

**Entrada d'Actualitat**

| Camp | Tipus | Obligatori |
|---|---|---|
| titol | text | sí |
| data | data | sí |
| categoria | alertes / blog / noticies | sí |
| resum | text curt (màx. 200 caràcters) | sí |
| imatge | imatge + text alternatiu | no |
| cos | text amb format | sí |

**Activitat de l'agenda**

| Camp | Tipus | Obligatori |
|---|---|---|
| titol | text | sí |
| data | data i hora | sí |
| lloc | text | sí |
| modalitat | presencial / en línia | sí |
| enllac_inscripcio | URL | no |

Les activitats passades no es mostren a l'agenda.

**Recurs**

| Camp | Tipus | Obligatori |
|---|---|---|
| titol | text | sí |
| descripcio | text curt | sí |
| public | llista de públics | sí |
| format | PDF / vídeo / enllaç | sí |
| idioma | text | sí |
| fitxer_o_url | fitxer o URL | sí |

---

## 5. Notes de disseny

### 5.1 Principis generals

- To proper, clar i tranquil·litzador. Res d'estètica "hacker" (fons negres, codi verd, figures encaputxades): genera por i allunya el públic principal.
- Disseny net, amb molt d'espai en blanc i tipografia gran i llegible.
- Primer mòbil (*mobile first*): bona part del públic arribarà des del telèfon, sovint després de rebre un missatge sospitós.

### 5.2 Paleta i tipografia

- Color principal: un blau o verd blavós que transmeti confiança.
- Color d'avís: taronja o vermell càlid, reservat **exclusivament** per al botó "He patit una estafa" i les alertes.
- Tipografia sense serifa, amb bona llegibilitat i mida base mínima de 18 px.
- Totes les combinacions de color han de complir el contrast WCAG AA.
- Defineix els colors com a variables CSS i inclou un mode fosc respectant `prefers-color-scheme`.

### 5.3 Botó "He patit una estafa" i alertes

- El botó és sempre visible a la capçalera, també a mòbil (no s'amaga dins el menú hamburguesa).
- Usa el color d'avís, amb icona i text sempre visible.
- Les alertes tenen tractament visual propi: franja o vora amb el color d'avís, icona d'alerta i l'etiqueta "Alerta" ben visible, de manera que es distingeixin a primer cop d'ull de les notícies i els articles.

### 5.4 Accessibilitat (WCAG 2.1 nivell AA com a mínim)

- HTML semàntic, jerarquia correcta de títols i atribut `lang="ca"`.
- Navegació completa amb teclat i focus visible.
- Enllaç "Salta al contingut" al principi de la pàgina.
- Text alternatiu a totes les imatges.
- Mida de lletra ampliable fins al 200 % sense trencar el disseny.
- Àrees de clic grans (mínim 44 × 44 px).
- Textos de la pàgina "He patit una estafa" en lectura fàcil.

### 5.5 Seguretat i privadesa

La web ha de ser un exemple de les bones pràctiques que l'associació difon:

- HTTPS obligatori.
- Sense rastrejadors, píxels de publicitat ni analítica invasiva. Si cal estadística, una solució respectuosa amb la privadesa que no requereixi galetes.
- Sense recursos de tercers que facin seguiment: tipografies allotjades al mateix servidor, sense vídeos incrustats de plataformes externes, sense scripts de xarxes socials.
- Si no s'utilitzen galetes no essencials, no cal bàner de galetes; indica-ho a la pàgina de privadesa.
- Capçaleres de seguretat: Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options, Referrer-Policy i Permissions-Policy.
- Formularis amb consentiment explícit i recollida mínima de dades.

### 5.6 Idiomes

La primera versió és només en català, però l'estructura ha d'estar preparada per afegir el castellà i, més endavant, guies en altres idiomes presents al territori. Evita textos dins d'imatges.

### 5.7 Imatges

- Totes les imatges optimitzades (format WebP o AVIF, amb mides adaptades i càrrega diferida).
- Mentre no hi hagi fotos reals, utilitza marcadors de posició amb una descripció del que hi hauria d'anar, guardats a `/public/imatges/` amb noms descriptius.
- Imatges suggerides:
  - Inici: persones de diferents edats utilitzant el mòbil o l'ordinador amb tranquil·litat.
  - Qui som: fotos de l'equip `[PENDENT]`.
  - Què fem: un taller o xerrada en grup.
  - He patit una estafa: una imatge serena (mans amb un mòbil, ambient calmat), mai una imatge alarmista.

---

## 6. Requisits tècnics

- **Lloc estàtic** generat a partir de fitxers de contingut: és el més segur, ràpid i barat d'allotjar. Opció recomanada: Astro amb col·leccions de contingut en Markdown.
- **Edició sense codi:** integra un gestor de continguts basat en Git (per exemple, Decap CMS o Pages CMS) perquè l'equip pugui publicar alertes, articles, activitats i recursos des d'un panell web.
- **Formulari de contacte:** com que el lloc és estàtic, el formulari necessita un servei d'enviament. Prioritza una opció europea i respectuosa amb la privadesa, i deixa-la configurable amb una variable d'entorn.
- **Allotjament:** compatible amb serveis d'allotjament estàtic amb HTTPS gratuït.
- **Rendiment:** objectiu de puntuació superior a 90 a Lighthouse en rendiment, accessibilitat, bones pràctiques i SEO.
- **SEO bàsic:** títol i descripció per pàgina, `sitemap.xml`, `robots.txt` i metadades Open Graph.
- **Fil RSS** per a la secció d'Actualitat.
- **Pàgina 404** amb enllaços a l'inici i a "He patit una estafa".
- **README** en català amb instruccions pas a pas per a persones no tècniques: com publicar una entrada, com afegir una activitat, com afegir un recurs i com canviar textos.

---

## 7. Fora de l'abast d'aquesta versió

No incloure en aquesta primera versió: àrea de socis, donacions en línia, pagaments, inscripcions amb gestió d'aforament, comentaris a les entrades, cercador intern ni versions en altres idiomes. L'estructura ha de permetre afegir-los més endavant sense redissenyar.

---

## Annex A. Finalitats de l'associació (font per als textos)

- Promoure la formació, la sensibilització i la conscienciació de la ciutadania, especialment dels col·lectius més vulnerables, en l'ús segur, crític i responsable de les eines i tecnologies digitals.
- Contribuir a la prevenció de riscos digitals: estafes en línia, frau, suplantació d'identitat, assetjament digital, desinformació i altres formes d'abús a l'entorn digital.
- Difondre coneixements i bones pràctiques de ciberseguretat, protecció de dades i privadesa entre particulars, famílies, centres educatius, entitats socials i empreses, amb atenció especial a les petites organitzacions sense ànim de lucre.
- Col·laborar amb administracions, centres educatius, cossos de seguretat, universitats i altres entitats en programes, campanyes i materials de conscienciació digital.
- Fomentar la recerca, l'intercanvi de coneixement i la creació de recursos oberts sobre seguretat i alfabetització digital.
- Vetllar per la inclusió digital i la reducció de la bretxa digital, amb atenció a la diversitat lingüística i cultural del territori.
