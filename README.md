# Hunedoara Live

Site static bilingv (RO / EN) — schelet, structură completă. Succesorul proiectului
`o-zi-in-hunedoara`, gândit de la început pentru **tot județul Hunedoara**, nu doar
Valea Jiului. Identitate vizuală "Monocrom" (inspirată de brasovtourism.app): alb +
neutru zinc, UN singur accent (petrol/teal #0E7C86), tipografie DM Sans + Inter.

Live pe **gohd.ro** (deploy manual, `netlify deploy --prod`; nu e încă legat de
push-uri GitHub — vezi „Ce urmează").

## Trimite o poză (formular cu încărcare de fișier)

`trimite-poza.html` (+ `/en/trimite-poza.html`, mulțumirea `multumim-poza.html`) este un formular **Netlify Forms**
cu `enctype="multipart/form-data"`: obiectiv (lista e generată de `build-pages.mjs` din `js/data.js`), fișier JPG/PNG
(min. ~1600 px lățime, max. 8 MB — avertizare în `js/photo-form.js`), autor, e-mail, licență
(permisiune de publicare cu credit / CC BY 4.0 / CC BY-SA 4.0) și bifa OBLIGATORIE „Sunt autorul pozei…”. Anti-spam: câmp
honeypot `bot-field`. Linkuri spre formular: footer (toate paginile), pagina Credite și pagina fiecărei intrări **fără poză**
(`?obiectiv=<secțiune>/<id>` preselectează obiectivul).

**De făcut în Netlify (o singură dată, după primul deploy):** Site configuration → Forms → vezi formularul
`trimite-poza` (apare după deploy; `ignore_html_forms` e false) → *Form notifications* → *Add notification* → *Email notification*
→ alegi formularul `trimite-poza` și adresa `hunedoaragohd@gmail.com`. Pozele încărcate se descarcă din Forms → Submissions
(link în e-mail și în dashboard). Limita Netlify: 8 MB per trimitere pe planul gratuit; spam-ul marcat se vede în tab-ul *Spam*.
Poza acceptată se pune în `images/`, se adaugă `photoCredit` pe intrare (autor, licență, sursă) și se rulează `node scripts/build-pages.mjs`.

## Itinerarii

`js/itinerarii-data.js` (`window.SITE_ITINERARIES`) definește itinerariile (zile + opriri). Opririle sunt doar **referințe** (secțiune + id)
la intrări din `js/data.js`; numele, descrierea, categoria, durata/lungimea (faptele „Durată”/„Lungime”) și linkul vin din intrare.
`build-pages.mjs` generează `itinerarii.html` (listarea, zona `GEN:itinlist`), `/itinerarii/<id>/` și `/en/itinerarii/<id>/`
(șablonul `itinerariu.html`), JSON-LD `TouristTrip` + `ItemList` și intrările din sitemap; build-ul se oprește dacă un id nu există.
Distanțele între opriri nu sunt trecute (nu există în date). Linkuri: footer-ul tuturor paginilor.

## Harta (harta.html, + EN)

Pagină separată (NU pe prima pagină): toate intrările din `js/data.js` care au `coords`, cu filtre pe secțiune și popup spre pagina
intrării (`js/map.js`). **Leaflet 1.9.4 e self-hosted** în `vendor/leaflet/` (BSD-2, licența inclusă), fără script extern; singura
resursă externă este tile-urile `https://tile.openstreetmap.org`, adăugate în CSP la `img-src` (atribuire „© OpenStreetMap contributors”
în hartă și sub ea; respectă politica de utilizare a tile-urilor OSM — trafic mic, referer trimis). Lista locurilor de sub hartă e
generată static de `build-pages.mjs` (zona `GEN:maplist`) și funcționează și fără JavaScript. Coordonate noi se adaugă doar din
surse verificabile (Wikidata/OSM/Commons) direct pe intrare, în `js/data.js`, apoi se rulează `node scripts/build-pages.mjs`.

## Calendar de evenimente (`calendar.html`) și Vreme și pârtii (`vreme.html`)

**Calendar.** „Evenimente anunțate” = știrile din `js/data.js` cu categoria Concert / Festival / Spectacol / Târg și `date`;
perioada se citește din faptul „Perioadă” / „Dată” (build-ul se oprește dacă nu se potrivește cu `date`). `js/calendar.js`
ascunde în browser evenimentele încheiate. „Evenimente care revin” vin din `js/evenimente-data.js`: doar ediții **confirmate de o
sursă oficială** (ultima ediție + sursa); nu estimăm date pentru anul următor. `evenimente.ics` (zile întregi, UID stabil) e
generat de `build-pages.mjs` din aceleași evenimente. Pentru un eveniment nou: adaugă o știre în `data.js` (cu fapt „Perioadă”/„Dată” și „Loc”).

**Vreme.** `js/weather.js` cere prognoza pe 4 zile direct de la Open-Meteo (fără cheie, fără cookie-uri, `credentials: "omit"`,
`referrerPolicy: "no-referrer"`). CSP: `connect-src` + `https://api.open-meteo.com` (nimic altceva). Locurile (Deva, Petroșani, Straja,
Hațeg, Retezat) sunt în blocul JSON `#weather-config` și folosesc coordonatele intrărilor din `data.js`. Starea pârtiilor NU e afișată
(nu există o sursă oficială utilizabilă); paginile trimit la ANM, skistraja.ro, Salvamont. Atribuire Open-Meteo (CC BY 4.0) în pagină.
Coordonatele Strajei (`statiunea-straja`) provin din Wikidata Q3036382.

## Secțiuni

Structură **hibridă**: **Destinații**, **Orașe**, **Natură**, **Turism activ**,
**Moștenire culturală**, **Afaceri**, **Știri**, **Contact** (+ **Utile**, doar în
footer) — inspirată de brasovtourism.app (navigare geografică/tematică), păstrând
Orașe/Afaceri/Știri/Contact din structura inițială (inspirată de valeajiului.ro).
Primele 7 sunt data-driven (`js/data.js`) și folosesc **același motor generic** de
listare/detaliu, ca să nu existe cod duplicat pentru fiecare secțiune.

## Structură

```
index.html                Prima pagină: hero, badge-uri app, statistici, grid de secțiuni, ultimele știri
destinatii.html   /destinatii/<id>/     Listare / detaliu — zone/regiuni turistice
orase.html        /orase/<id>/          Listare / detaliu — orașe
natura.html       /natura/<id>/         Listare / detaliu — natură (cascade, peșteri, vârfuri)
turism-activ.html /turism-activ/<id>/   Listare / detaliu — trasee & activități
mostenire.html    /mostenire/<id>/      Listare / detaliu — istorie & patrimoniu
stiri.html        /stiri/<id>/          Listare / detaliu — știri (sortate după dată)
afaceri.html      /afaceri/<id>/        Listare / detaliu — afaceri (cu recenzii)
  (paginile /<secțiune>/<id>/index.html sunt GENERATE — vezi mai jos)
destinatie.html, oras.html, natura-loc.html, activitate.html, mostenire-articol.html,
stire.html, afacere.html    Șabloanele paginilor de detaliu (merg și direct cu ?id=)
utile.html                 Pagină statică — transport, urgențe, linkuri (doar în footer)
contact.html                Formular de contact (Netlify Forms, fără backend propriu)
credite.html                Lista automată a fișierelor de imagine (din toate secțiunile)
404.html                    Pagină 404

css/style.css          Tot stilul (identitate "Monocrom")
js/config.js           SETĂRI: nume site, mod recenzii (local/remote)
js/data.js             CONȚINUTUL — 7 seturi de date, aceeași formă (vezi comentariul din fișier)
js/i18n.js             Texte RO/EN + comutator de limbă
js/common.js           Funcții comune (Waze/Maps, stele, URL-uri de intrări, <img> cu srcset, fallback imagini)
js/images.js           GENERAT — dimensiunile pozelor (pentru srcset/width/height)
js/listing.js          Motor GENERIC de listare (căutare + filtre categorie/zonă)
js/detail.js           Motor GENERIC de pagină de detaliu (galerie, descriere, fapte, hartă, recenzii)
js/reviews.js          Modulul de recenzii (provider local sau Supabase+Netlify)
js/home.js             Logica primei pagini (statistici reale, grid, ultimele știri)
js/credits.js          Logica paginii de credite

netlify/functions/submit-review.mjs  Primește recenziile (captcha + moderare)
netlify.toml                         Config Netlify (+ redirecturile 301 de la URL-urile vechi ?id=)
scripts/build-pages.mjs              Generatorul paginilor statice + SEO + sitemap (vezi mai jos)
scripts/build-images.mjs             Variantele optimizate ale pozelor (apelat de build-pages)
sitemap.xml, robots.txt              GENERATE
supabase/schema.sql                  Tabelul de recenzii + reguli

images/            Pozele — vezi images/README.md
SETUP.md           Cum activezi recenziile reale (Supabase + Turnstile + Netlify)
```

## După ce modifici `js/data.js` sau adaugi poze: `node scripts/build-pages.mjs`

Site-ul nu are pas de build pe Netlify — se publică folderul așa cum e — deci
paginile generate se comit în git. După ORICE modificare în `js/data.js` (intrare
nouă, text schimbat, poză nouă în `images/`):

```bash
npm i                              # o singură dată (sharp, pentru poze; jsdom, pentru teste)
node scripts/build-pages.mjs       # regenerează tot ce ține de conținut
node test/run.mjs                  # verificare
git add -A && git commit -m "..."  # comite și fișierele generate
```

Scriptul face, în ordine:

1. **Poze** (`scripts/build-images.mjs`, doar pentru pozele noi/modificate): pentru
   fiecare `images/<nume>.jpg` creează `images/800/<nume>.webp`,
   `images/1600/<nume>.webp` (dacă originalul are peste 800 px) și
   `images/og/<nume>.jpg` (1200×630, pentru previzualizarea pe Facebook), plus
   manifestul `js/images.js`. Originalele .jpg rămân neatinse (fallback).
   Paginile folosesc `<img srcset>` cu WebP, `width`/`height` și `loading="lazy"`
   (în afară de prima poză), prin `RL.imgHtml()` din `js/common.js`.
2. **O pagină statică pentru fiecare intrare**, la `/<secțiune>/<id>/` (ex.
   `/orase/deva/`), construită din șablonul secțiunii (`oras.html` etc.): titlu,
   meta description, Open Graph (`og:image` = `images/og/...`; intrările fără poză
   primesc Castelul Corvinilor), canonical și conținutul în română direct în HTML
   — Facebook și Google îl văd fără JavaScript. În browser, `js/detail.js` preia
   pagina (recenzii etc.). Fiecare intrare are și **versiunea în engleză** la
   `/en/<secțiune>/<id>/` (ex. `/en/orase/deva/`), cu textele `en` din `data.js`.
   Intrările șterse din `data.js` își pierd ambele pagini generate.
   Fiecare pagină are și **date structurate** (JSON-LD, schema.org), derivate
   din `data.js`: `Hotel` / `Restaurant` / `LodgingBusiness` (afaceri — adresa din
   faptul „Adresă”/„Locație”, telefonul și site-ul din „Contact”), `City` (orașe),
   `Museum` / `TouristAttraction` (restul), `Event` / `Festival` (știrile din
   categoria Concert/Festival/Spectacol cu `date` = data începerii și un fapt „Loc”)
   sau `NewsArticle`, plus `BreadcrumbList`. `index.html` are `WebSite` + `Organization`.
   Verificare: https://search.google.com/test/rich-results
3. **Blocul SEO** (`<!-- SEO ... -->`) din paginile principale: canonical, Open Graph,
   Twitter card. Textele vin din `js/i18n.js` (`page.title.*`, `page.meta.*`).
   Paginile principale (home, cele 7 listări, utile, contact, credite, multumim) au
   copii EN generate în `en/` (`en/index.html` = `/en/`, `en/natura.html`…), cu
   textele `data-i18n` deja traduse în HTML și linkurile interne spre `/en/`.
   Nu edita fișierele din `en/` — editează pagina RO și rulează scriptul.
4. **`sitemap.xml`** (toate paginile publice + toate intrările, RO și EN, cu
   `xhtml:link` hreflang pentru fiecare pereche) și **`robots.txt`**.

**Limbile.** Fiecare pereche RO ↔ EN e legată prin `<link rel="alternate" hreflang="ro|en|x-default">`
(x-default = RO). Pe paginile cu pereche limba e dată de URL (`<html data-page-lang>`),
iar comutatorul RO/EN e un link spre pagina pereche (preferința din localStorage se
actualizează la limba paginii). Paginile fără pereche (șabloanele cu `?id=`, 404) păstrează
vechiul comportament: comutatorul schimbă textul pe loc, după preferința salvată.

**URL-urile vechi** (`oras.html?id=deva`, inclusiv cu `&fbclid=...` de la Facebook)
redirecționează 301 spre `/orase/deva/` — regulile sunt în `netlify.toml`. Orice altă
combinație de parametri deschide șablonul, care afișează intrarea tot din `?id=`.

Nu edita manual `/<secțiune>/<id>/index.html`, `js/images.js`, `sitemap.xml` —
se suprascriu. Pentru a schimba structura paginii de detaliu, editează șablonul
(ex. `oras.html`) și rulează din nou scriptul. După publicare, pentru o pagină deja
distribuită pe Facebook, forțează o re-citire în
[Sharing Debugger](https://developers.facebook.com/tools/debug/) („Scrape Again”).

## Cum funcționează motorul generic

Toate cele 7 secțiuni de conținut au aceeași formă de înregistrare în `js/data.js`
(id, name, category bilingv, area, coords opțional, images, ro/en cu tagline +
description + facts). O pagină de listare setează doar:

```html
<script type="application/json" id="listing-config">{"dataKey":"SITE_NATURE"}</script>
<script src="js/listing.js"></script>
```

iar o pagină de detaliu:

```html
<script type="application/json" id="detail-config">{"dataKey":"SITE_NATURE","backPage":"/natura.html","backLabelKey":"detail.back.natura"}</script>
<script src="js/detail.js"></script>
```

Ca să adaugi o secțiune complet nouă mai târziu, e nevoie doar de: un array nou în
`js/data.js`, o pereche de pagini HTML cu markup-ul standard (vezi `natura-loc.html`),
cele două linii de configurare de mai sus și o linie nouă în `SECTIONS` din
`js/common.js` (folderul URL-ului + listarea + șablonul) și în `scripts/build-pages.mjs`
(`SECTION_META`), plus regulile de redirect din `netlify.toml`.

## Rulare locală

```bash
npm i
node serve.js        # http://localhost:5175 (servește și /orase/deva/ -> index.html)
```

Recenziile pornesc în modul **local** (se salvează doar în browserul tău). Pentru
recenzii reale ai nevoie de Netlify CLI:

```bash
npm i -g netlify-cli
netlify dev
```

## Aplicație instalabilă (PWA)

- `manifest.webmanifest` + `icons/` (generate cu sharp: monograma „HL” pe teal #0E7C86).
- `sw.js`: paginile HTML și `js/data.js` vin întâi din rețea (conținutul nou apare imediat), CSS/JS/imaginile din cache cu reîmprospătare în fundal; fără rețea se deschid paginile deja vizitate sau `offline.html`. Nu interceptează POST-urile (Netlify Forms), `/.netlify/...` și alte domenii.
- Înregistrarea și butonul „Instalează aplicația” (index.html) sunt în `js/common.js`; textele în `js/i18n.js` (`pwa.*`).
- Când schimbi lista de fișiere precache-uite sau strategia din `sw.js`, crește `VERSION` din `sw.js`.

## Ce urmează

1. **Conținutul:** `js/data.js` are doar exemple (`example: true`) în toate cele
   7 secțiuni. Le înlocuim treptat cu destinații, orașe, locuri din natură,
   activități, povești de patrimoniu, știri și afaceri reale — le scriem împreună.
2. **Pozele:** în `images/`, cu numele din `credite.html`.
3. **Recenzii reale:** urmează `SETUP.md` (proiect Supabase propriu, diferit de cel
   de la `o-zi-in-hunedoara`).
4. **Deploy automat:** momentan publicarea e manuală (`netlify deploy --prod`).
   Pentru deploy automat la fiecare push pe `main`, site-ul Netlify trebuie legat
   de repo-ul GitHub (Site settings → Build & deploy → Link repository).
5. **Funcții aspiraționale:** butoanele „Întreabă-ne" și insignele App Store/Google
   Play sunt doar vizuale deocamdată — niciun asistent AI sau aplicație mobilă nu
   există încă.
