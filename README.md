# Hunedoara Live

Site static bilingv (RO / EN) — schelet, structură completă. Succesorul proiectului
`o-zi-in-hunedoara`, gândit de la început pentru **tot județul Hunedoara**, nu doar
Valea Jiului. Identitate vizuală "Monocrom" (inspirată de brasovtourism.app): alb +
neutru zinc, UN singur accent (petrol/teal #0E7C86), tipografie DM Sans + Inter.

Live pe **gohd.ro** (deploy manual, `netlify deploy --prod`; nu e încă legat de
push-uri GitHub — vezi „Ce urmează").

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
   pagina (limba EN, recenzii etc.). Intrările șterse din `data.js` își pierd și
   pagina generată.
3. **Blocul SEO** (`<!-- SEO ... -->`) din paginile principale: canonical, Open Graph,
   Twitter card. Textele vin din `js/i18n.js` (`page.title.*`, `page.meta.*`).
4. **`sitemap.xml`** (toate paginile publice + toate intrările) și **`robots.txt`**.

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
<script>window.LISTING_CONFIG = { dataKey: "SITE_NATURE" };</script>
<script src="js/listing.js"></script>
```

iar o pagină de detaliu:

```html
<script>window.DETAIL_CONFIG = { dataKey: "SITE_NATURE", backPage: "/natura.html", backLabelKey: "detail.back.natura" };</script>
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
