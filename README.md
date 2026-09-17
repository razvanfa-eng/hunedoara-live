# Hunedoara Live

Site static bilingv (RO / EN) — schelet, structură completă. Succesorul proiectului
`o-zi-in-hunedoara`, gândit de la început pentru **tot județul Hunedoara**, nu doar
Valea Jiului, cu identitate vizuală nouă ("Modern minimalist": ivoriu + petrol,
Space Grotesk + Work Sans).

Domeniul **gohd.ro** rămâne pe proiectul vechi până când site-ul de aici e gata de
lansare — abia atunci mutăm domeniul aici (vezi decizia din conversație).

## Secțiuni

**Locuri**, **Activități**, **Istorie**, **Orașe**, **Știri**, **Afaceri**, **Utile**,
**Contact** — ca structură, inspirate din valeajiului.ro. Primele 6 sunt data-driven
(`js/data.js`) și folosesc **același motor generic** de listare/detaliu, ca să nu
existe cod duplicat pentru fiecare secțiune.

## Structură

```
index.html            Prima pagină: hero, statistici, grid de secțiuni, ultimele știri
locuri.html / loc.html?id=          Listare / detaliu — locuri de vizitat
activitati.html / activitate.html?id=  Listare / detaliu — trasee & activități
istorie.html / istorie-detaliu.html?id= Listare / detaliu — istorie & patrimoniu
orase.html / oras.html?id=          Listare / detaliu — orașe
stiri.html / stire.html?id=         Listare / detaliu — știri (sortate după dată)
afaceri.html / afacere.html?id=     Listare / detaliu — afaceri (cu recenzii)
utile.html             Pagină statică — transport, urgențe, linkuri
contact.html           Formular de contact (Netlify Forms, fără backend propriu)
credite.html           Lista automată a fișierelor de imagine (din toate secțiunile)
404.html               Pagină 404

css/style.css          Tot stilul (identitate "Modern minimalist")
js/config.js           SETĂRI: nume site, mod recenzii (local/remote)
js/data.js             CONȚINUTUL — 6 seturi de date, aceeași formă (vezi comentariul din fișier)
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

Toate cele 6 secțiuni de conținut au aceeași formă de înregistrare în `js/data.js`
(id, name, category bilingv, area, coords opțional, images, ro/en cu tagline +
description + facts). O pagină de listare setează doar:

```html
<script>window.LISTING_CONFIG = { dataKey: "SITE_PLACES", detailPage: "loc.html" };</script>
<script src="js/listing.js"></script>
```

iar o pagină de detaliu:

```html
<script>window.DETAIL_CONFIG = { dataKey: "SITE_PLACES", backPage: "locuri.html", backLabelKey: "detail.back.locuri" };</script>
<script src="js/detail.js"></script>
```

Ca să adaugi o secțiune complet nouă mai târziu, e nevoie doar de: un array nou în
`js/data.js`, o pereche de pagini HTML cu markup-ul standard (vezi `loc.html`) și
cele două linii de configurare de mai sus.

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
   6 secțiuni. Le înlocuim treptat cu locuri, orașe, activități, povești istorice,
   știri și afaceri reale — le scriem împreună.
2. **Pozele:** în `images/`, cu numele din `credite.html`.
3. **Recenzii reale:** urmează `SETUP.md` (proiect Supabase propriu, diferit de cel
   de la `o-zi-in-hunedoara`).
4. **Lansare:** când conținutul e gata, creăm un site Netlify nou pentru acest
   repo și abia atunci mutăm domeniul `gohd.ro` de pe proiectul vechi aici.
