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
destinatii.html / destinatie.html?id=       Listare / detaliu — zone/regiuni turistice
orase.html / oras.html?id=                  Listare / detaliu — orașe
natura.html / natura-loc.html?id=           Listare / detaliu — natură (cascade, peșteri, vârfuri)
turism-activ.html / activitate.html?id=     Listare / detaliu — trasee & activități
mostenire.html / mostenire-articol.html?id= Listare / detaliu — istorie & patrimoniu
stiri.html / stire.html?id=                 Listare / detaliu — știri (sortate după dată)
afaceri.html / afacere.html?id=             Listare / detaliu — afaceri (cu recenzii)
utile.html                 Pagină statică — transport, urgențe, linkuri (doar în footer)
contact.html                Formular de contact (Netlify Forms, fără backend propriu)
credite.html                Lista automată a fișierelor de imagine (din toate secțiunile)
404.html                    Pagină 404

css/style.css          Tot stilul (identitate "Monocrom")
js/config.js           SETĂRI: nume site, mod recenzii (local/remote)
js/data.js             CONȚINUTUL — 7 seturi de date, aceeași formă (vezi comentariul din fișier)
js/i18n.js             Texte RO/EN + comutator de limbă
js/common.js           Funcții comune (Waze/Maps, stele, fallback imagini, query string)
js/listing.js          Motor GENERIC de listare (căutare + filtre categorie/zonă)
js/detail.js           Motor GENERIC de pagină de detaliu (galerie, descriere, fapte, hartă, recenzii)
js/reviews.js          Modulul de recenzii (provider local sau Supabase+Netlify)
js/home.js             Logica primei pagini (statistici reale, grid, ultimele știri)
js/credits.js          Logica paginii de credite

netlify/functions/submit-review.mjs  Primește recenziile (captcha + moderare)
netlify.toml                         Config Netlify
supabase/schema.sql                  Tabelul de recenzii + reguli

images/            Pozele — vezi images/README.md
SETUP.md           Cum activezi recenziile reale (Supabase + Turnstile + Netlify)
```

## Cum funcționează motorul generic

Toate cele 7 secțiuni de conținut au aceeași formă de înregistrare în `js/data.js`
(id, name, category bilingv, area, coords opțional, images, ro/en cu tagline +
description + facts). O pagină de listare setează doar:

```html
<script>window.LISTING_CONFIG = { dataKey: "SITE_NATURE", detailPage: "natura-loc.html" };</script>
<script src="js/listing.js"></script>
```

iar o pagină de detaliu:

```html
<script>window.DETAIL_CONFIG = { dataKey: "SITE_NATURE", backPage: "natura.html", backLabelKey: "detail.back.natura" };</script>
<script src="js/detail.js"></script>
```

Ca să adaugi o secțiune complet nouă mai târziu, e nevoie doar de: un array nou în
`js/data.js`, o pereche de pagini HTML cu markup-ul standard (vezi `natura-loc.html`)
și cele două linii de configurare de mai sus.

## Rulare locală

```bash
npm i
node serve.js        # http://localhost:5175
```

Recenziile pornesc în modul **local** (se salvează doar în browserul tău). Pentru
recenzii reale ai nevoie de Netlify CLI:

```bash
npm i -g netlify-cli
netlify dev
```

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
