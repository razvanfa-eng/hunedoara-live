/*
 * GENERATOR DE PAGINI STATICE / STATIC PAGE GENERATOR
 * =====================================================================
 * Rulează după ORICE modificare în js/data.js (sau poze noi în images/):
 *
 *   node scripts/build-pages.mjs
 *
 * Ce face:
 *  1. pozele: variante webp 800/1600 + og:image 1200×630 + js/images.js
 *     (scripts/build-images.mjs — doar pentru pozele noi/modificate)
 *  2. câte o pagină statică pentru fiecare intrare din js/data.js, în AMBELE limbi:
 *       RO: /<secțiune>/<id>/index.html     (ex. /orase/deva/)
 *       EN: /en/<secțiune>/<id>/index.html  (ex. /en/orase/deva/)
 *     pornind de la șablonul secțiunii (oras.html etc.), cu <title>, meta
 *     description, Open Graph, canonical, JSON-LD și conținutul deja în HTML în
 *     limba paginii (Facebook și Google îl văd fără JavaScript; js/detail.js
 *     preia pagina în browser, ex. pentru recenzii)
 *  3. paginile principale: blocul SEO (canonical + hreflang + Open Graph +
 *     Twitter) din fișierele RO scrise de mână (index.html, natura.html,
 *     utile.html…) și versiunile lor EN generate în /en/ (en/index.html = /en/,
 *     en/natura.html…), cu textele din js/i18n.js deja traduse în HTML
 *  4. sitemap.xml (RO + EN, cu xhtml:link hreflang pentru fiecare pereche) și robots.txt
 *
 * Fiecare pereche RO <-> EN e legată prin <link rel="alternate" hreflang="ro|en|x-default">
 * (x-default = RO), iar comutatorul de limbă (#lang-toggle) devine un link spre
 * pagina pereche; <html data-page-lang> fixează limba paginii (vezi js/i18n.js).
 *
 * Fișierele generate se comit în git (Netlify publică folderul așa cum e).
 * Nu edita manual paginile din /<secțiune>/<id>/ și /en/ — se suprascriu.
 * Paginile (RO și EN) ale intrărilor șterse din data.js se șterg automat.
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";
import { buildImages, OG_W, OG_H } from "./build-images.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://gohd.ro";
const SITE_NAME = "Hunedoara Live";
const DEFAULT_IMAGE = "images/hunedoara-corvin-castle.jpg";
const GEN_MARK = "<!-- GENERAT de scripts/build-pages.mjs";
const SEO_START = "<!-- SEO: generat de scripts/build-pages.mjs -->";
const SEO_END = "<!-- /SEO -->";
const CR = String.fromCharCode(13);
const LANGS = ["ro", "en"];
const EN_DIR = "en";

const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8").split(CR).join("");
function write(f, text) {
  const p = path.join(ROOT, f);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  const prev = fs.existsSync(p) ? fs.readFileSync(p, "utf8").split(CR).join("") : null;
  if (prev !== text) fs.writeFileSync(p, text);
  return prev !== text;
}

/* ---------- 1. pozele ---------- */
await buildImages({ quiet: true });

/* ---------- încărcăm scripturile site-ului într-un „browser” minimal ---------- */
const ctx = { console, document: { addEventListener() {} } };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of ["js/data.js", "js/config.js", "js/i18n.js", "js/images.js", "js/common.js", "js/detail.js", "js/itinerarii-data.js"]) {
  vm.runInContext(read(f), ctx, { filename: f });
}
const { RL, I18N, RL_DETAIL } = ctx;
const t = (k, lang = "ro") => I18N.t(k, lang);

/* ---------- limbi ---------- */
const other = (lang) => (lang === "ro" ? "en" : "ro");
const OG_LOCALE = { ro: "ro_RO", en: "en_GB" };
// calea RO a unei pagini ("/", "/natura.html", "/natura/x/") -> calea în limba dată
const langPath = (roPath, lang) => (lang === "en" ? "/" + EN_DIR + roPath : roPath);

/* ---------- utilitare ---------- */
const esc = RL.esc;
function clip(s, max = 160) {
  s = String(s || "").replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  return cut.slice(0, Math.max(cut.lastIndexOf(" "), 80)).replace(/[\s,;:.—–-]+$/, "") + "…";
}
function ogImage(src) {
  const info = src && RL.imgInfo(src);
  const base = info ? info.base : RL.imgInfo(DEFAULT_IMAGE).base;
  return SITE + "/images/og/" + base + ".jpg";
}
/* alternates: { ro: url, en: url } -> <link rel="alternate" hreflang> (x-default = RO) */
function seoBlock({ lang = "ro", title, desc, url, image, imageAlt, type = "website", noindex = false, withDesc = true, extra = "", ld = null, alternates = null }) {
  const L = [SEO_START];
  if (withDesc && desc) L.push(`<meta name="description" content="${esc(desc)}">`);
  if (noindex) L.push(`<meta name="robots" content="noindex">`);
  if (url) L.push(`<link rel="canonical" href="${esc(url)}">`);
  if (alternates) {
    L.push(
      `<link rel="alternate" hreflang="ro" href="${esc(alternates.ro)}">`,
      `<link rel="alternate" hreflang="en" href="${esc(alternates.en)}">`,
      `<link rel="alternate" hreflang="x-default" href="${esc(alternates.ro)}">`
    );
  }
  L.push(
    `<meta property="og:site_name" content="${SITE_NAME}">`,
    `<meta property="og:locale" content="${OG_LOCALE[lang]}">`
  );
  if (alternates) L.push(`<meta property="og:locale:alternate" content="${OG_LOCALE[other(lang)]}">`);
  L.push(
    `<meta property="og:type" content="${type}">`,
    `<meta property="og:title" content="${esc(title)}">`
  );
  if (desc) L.push(`<meta property="og:description" content="${esc(desc)}">`);
  if (url) L.push(`<meta property="og:url" content="${esc(url)}">`);
  L.push(
    `<meta property="og:image" content="${esc(image)}">`,
    `<meta property="og:image:width" content="${OG_W}">`,
    `<meta property="og:image:height" content="${OG_H}">`,
    `<meta property="og:image:alt" content="${esc(imageAlt || title)}">`
  );
  if (extra) L.push(extra);
  L.push(
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(title)}">`
  );
  if (desc) L.push(`<meta name="twitter:description" content="${esc(desc)}">`);
  L.push(`<meta name="twitter:image" content="${esc(image)}">`);
  if (ld) L.push(ldScript(ld));
  L.push(SEO_END);
  return L.map((l) => "  " + l).join("\n");
}

/* ---------- date structurate (schema.org, JSON-LD) ----------
 * Google le citește ca să înțeleagă ce e pagina (hotel, restaurant, obiectiv
 * turistic, eveniment, articol) și poate afișa detalii în plus în căutare.
 * Totul e derivat din js/data.js — nu inventăm câmpuri care nu există acolo.
 * Textele (descriere, breadcrumb, WebPage.inLanguage) sunt în limba paginii;
 * adresa/contactul se extrag din faptele RO (etichetele sunt căutate în română). */
const ORG = { "@type": "Organization", name: SITE_NAME, url: SITE + "/", logo: SITE + "/icons/icon-512.png", email: "hunedoaragohd@gmail.com" };
const REGION_NAME = { ro: "Județul Hunedoara", en: "Hunedoara County" };
const region = (lang) => ({ "@type": "AdministrativeArea", name: REGION_NAME[lang] });
const HOME_NAME = { ro: "Acasă", en: "Home" };
function ldScript(data) {
  // „<” escapat, ca un text din data.js să nu poată închide tag-ul <script>
  return '<script type="application/ld+json">' + JSON.stringify(data).replace(/</g, "\\u003c") + "</script>";
}
const factOf = (l, re) => ((l.facts || []).find((f) => re.test(f.label)) || {}).value || "";
const PHONE_RE = /(?:\+40|0)\s?[237]\d{1,2}[\s.]?\d{3}[\s.]?\d{3,4}/;
const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;
const WEB_RE = /(?<![@\w.-])(?:https?:\/\/)?((?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:ro|com|eu|net|org))\b/i;
// platformele de rezervări nu sunt site-ul afacerii
const NOT_OWN_SITE = /(^|\.)(booking|agoda|tripadvisor|trip|airbnb|facebook|instagram|google|travelminit|tichete-de-vacanta)\.[a-z]+$/i;
const TOWN_NAMES = new Set((ctx.SITE_TOWNS || []).map((e) => e.name));

function ldAddress(entry, l) {
  const street = factOf(l, /^(Adresă|Locație|Loc|Localizare|Amplasare)$/);
  const a = { "@type": "PostalAddress", addressRegion: "Hunedoara", addressCountry: "RO" };
  if (street) a.streetAddress = street;
  if (TOWN_NAMES.has(entry.area)) a.addressLocality = entry.area;
  return a;
}
function ldPlaceBits(entry, l, img) {
  const o = {};
  if (img) o.image = img;
  o.address = ldAddress(entry, l);
  if (entry.coords) o.geo = { "@type": "GeoCoordinates", latitude: entry.coords[0], longitude: entry.coords[1] };
  return o;
}
const EVENT_CATS = /^(Concert|Festival|Spectacol)$/;
function ldEntity(key, entry, l, url, desc, img, lang) {
  const cat = (entry.category && entry.category.ro) || "";
  const base = { "@id": url + "#main", name: RL.entryName(entry, lang), description: desc, url };
  if (key === "SITE_BUSINESSES") {
    const type = cat === "Restaurant" ? "Restaurant" : cat === "Hotel & restaurant" ? "Hotel" : "LodgingBusiness";
    const o = { "@type": type, ...base, ...ldPlaceBits(entry, l, img) };
    const contact = factOf(l, /^(Contact|Rezervări)$/);
    const phone = contact.match(PHONE_RE);
    if (phone) o.telephone = phone[0].replace(/\s+/g, " ");
    const email = contact.match(EMAIL_RE);
    if (email) o.email = email[0];
    const web = contact.replace(EMAIL_RE, " ").match(WEB_RE);
    if (web && !NOT_OWN_SITE.test(web[1])) o.sameAs = "https://" + web[1].toLowerCase();
    return o;
  }
  if (key === "SITE_TOWNS") {
    const o = { "@type": "City", ...base, containedInPlace: region(lang) };
    if (img) o.image = img;
    if (entry.coords) o.geo = { "@type": "GeoCoordinates", latitude: entry.coords[0], longitude: entry.coords[1] };
    return o;
  }
  if (key === "SITE_NEWS") {
    const where = factOf(l, /^(Loc|Locație)$/);
    if (EVENT_CATS.test(cat) && entry.date && where) {
      const o = {
        "@type": cat === "Festival" ? "Festival" : "Event", ...base, inLanguage: lang, startDate: entry.date,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: { "@type": "Place", name: where.split(",")[0].trim(), address: ldAddress(entry, { facts: [{ label: "Adresă", value: where }] }) }
      };
      if (img) o.image = img;
      return o;
    }
    const o = { "@type": "NewsArticle", ...base, inLanguage: lang, headline: clip(RL.entryName(entry, lang), 110), author: ORG, publisher: ORG, mainEntityOfPage: url };
    if (entry.date) o.datePublished = entry.date;
    if (img) o.image = img;
    return o;
  }
  // destinații, natură, turism activ, moștenire culturală
  const type = key === "SITE_HERITAGE" && /^(Muzeu|Casă memorială)$/.test(cat) ? "Museum" : "TouristAttraction";
  return { "@type": type, ...base, ...ldPlaceBits(entry, l, img) };
}
function ldWebPage(url, name, lang, about) {
  const o = { "@type": "WebPage", "@id": url, url, name, inLanguage: lang, isPartOf: { "@id": SITE + "/#website" } };
  if (about) o.about = { "@id": about };
  return o;
}
function ldForEntry(key, entry, url, desc, img, lang, docTitle) {
  const sec = SECTIONS[key];
  return {
    "@context": "https://schema.org",
    "@graph": [
      ldEntity(key, entry, RL.loc(entry, "ro"), url, desc, img, lang),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: HOME_NAME[lang], item: SITE + langPath("/", lang) },
          { "@type": "ListItem", position: 2, name: t("nav." + SECTION_META[key].key, lang), item: SITE + langPath("/" + sec.listing, lang) },
          { "@type": "ListItem", position: 3, name: RL.entryName(entry, lang), item: url }
        ]
      },
      ldWebPage(url, docTitle, lang, url + "#main")
    ]
  };
}
function ldHome(lang, url, title) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": SITE + "/#website", name: SITE_NAME, url: SITE + "/", inLanguage: ["ro", "en"], publisher: { "@id": SITE + "/#org" } },
      { ...ORG, "@id": SITE + "/#org", areaServed: region(lang) },
      ldWebPage(url, title, lang)
    ]
  };
}
// pune/înlocuiește blocul SEO în <head> (după meta description sau după <title>)
function withoutSeo(html) {
  const a = html.indexOf("  " + SEO_START), b = html.indexOf(SEO_END);
  return a < 0 || b < 0 ? html : html.slice(0, a) + html.slice(b + SEO_END.length + 1);
}
function setSeo(html, block) {
  const a = html.indexOf("  " + SEO_START), b = html.indexOf(SEO_END);
  if (a >= 0 && b > a) return html.slice(0, a) + block + html.slice(b + SEO_END.length);
  const anchor = html.match(/  <meta name="description"[^>]*>\n/) || html.match(/  <title[^>]*>[^<]*<\/title>\n/);
  if (!anchor) throw new Error("Nu găsesc <title> pentru blocul SEO");
  const i = html.indexOf(anchor[0]) + anchor[0].length;
  return html.slice(0, i) + block + "\n" + html.slice(i);
}

/* ---------- traducerea unei pagini în engleză ---------- */
// textele marcate cu data-i18n / data-i18n-attr -> din js/i18n.js, direct în HTML
function translateStatic(html, lang) {
  const tr = (k) => { const v = t(k, lang); return v === k ? null : v; };
  html = html.replace(/(<(\w+)\b[^>]*\sdata-i18n="([^"]+)"[^>]*>)([^<]*)(<\/\2>)/g,
    (m, open, tag, key, inner, close) => { const v = tr(key); return v === null ? m : open + esc(v) + close; });
  return html.replace(/<\w+\b[^>]*\sdata-i18n-attr="([^"]+)"[^>]*>/g, (tag, spec) => {
    for (const pair of spec.split(",")) {
      const [attr, key] = pair.split(":").map((s) => s && s.trim());
      const v = attr && key && tr(key);
      if (!v) continue;
      const re = new RegExp('(\\s' + attr + '=")[^"]*(")');
      tag = re.test(tag) ? tag.replace(re, (mm, a, b) => a + esc(v) + b) : tag.replace(/>$/, " " + attr + '="' + esc(v) + '">');
    }
    return tag;
  });
}
// linkurile interne (deja absolute) spre paginile cu pereche -> versiunea /en/
let PAIRED_FILES = new Set();  // completat mai jos, din TOP_PAGES
let SECTION_DIRS = [];
function rewriteLinksEn(html) {
  const dirRe = new RegExp("^/(" + SECTION_DIRS.join("|") + ")/[^/]+/$");
  return html.replace(/\b(href|action)="(\/[^"#?]*)([^"]*)"/g, (m, attr, p, rest) => {
    let to = null;
    if (p === "/" || p === "/index.html") to = "/" + EN_DIR + "/";
    else if (PAIRED_FILES.has(p.slice(1)) || dirRe.test(p)) to = "/" + EN_DIR + p;
    return to ? attr + '="' + to + rest + '"' : m;
  });
}
/* pagină cu pereche: <html lang data-page-lang> + comutatorul ca link spre pagina pereche */
function markPaired(html, lang, pairPath) {
  const o = other(lang);
  const htmlRe = /<html lang="[a-z]+"(?: data-page-lang="[a-z]+")?>/;
  if (!htmlRe.test(html)) throw new Error("Nu găsesc <html lang>");
  html = html.replace(htmlRe, '<html lang="' + lang + '" data-page-lang="' + lang + '">');
  const toggleRe = /<(button|a) id="lang-toggle"[^>]*>[^<]*<\/(?:button|a)>/;
  if (!toggleRe.test(html)) throw new Error("Nu găsesc #lang-toggle");
  return html.replace(toggleRe, '<a id="lang-toggle" class="lang-toggle" href="' + esc(pairPath) + '" hreflang="' + o + '" lang="' + o +
    '" data-i18n="lang.switch" data-i18n-attr="aria-label:lang.switch.aria" aria-label="' + esc(t("lang.switch.aria", lang)) + '">' +
    esc(t("lang.switch", lang)) + "</a>");
}
function toEnglish(html, roPath) {
  return markPaired(rewriteLinksEn(translateStatic(html, "en")), "en", roPath);
}

/* ---------- secțiunile ---------- */
const SECTIONS = RL.SECTIONS; // aceeași sursă ca în browser (js/common.js)
SECTION_DIRS = Object.values(SECTIONS).map((s) => s.dir);
const SECTION_META = {
  SITE_DESTINATIONS: { key: "destinatii", image: "images/cetatile-dacice-ansamblu.jpg" },
  SITE_TOWNS: { key: "orase", image: "images/hunedoara-corvin-castle.jpg" },
  SITE_NATURE: { key: "natura", image: "images/retezat-bucura.jpg" },
  SITE_ACTIVITIES: { key: "turismActiv", image: "images/partii-parang.jpg" },
  SITE_HERITAGE: { key: "mostenire", image: "images/prislop-manastire.jpg" },
  SITE_NEWS: { key: "stiri", image: "images/home-tile-stiri.jpg" },
  SITE_BUSINESSES: { key: "afaceri", image: "images/pensiunea-retezat.jpg" }
};

/* ---------- 3. paginile principale ----------
 * pair: are versiune EN în /en/ (comutatorul duce acolo); canonical: are URL canonic
 * (+ hreflang, dacă are și pereche); sitemap: prioritatea în sitemap.xml. */
/* zone generate în interiorul paginilor scrise de mână: <!-- GEN:nume --> ... <!-- /GEN:nume --> */
function fillGen(html, name, inner) {
  const re = new RegExp("(<!-- GEN:" + name + " -->\\n)[\\s\\S]*?(<!-- /GEN:" + name + " -->)");
  if (!re.test(html)) throw new Error("Lipsește zona GEN:" + name);
  return html.replace(re, (m, a, z) => a + inner + z);
}
// <optgroup> cu toate obiectivele (fără știri) pentru formularul „Trimite o poză”; valoarea e mereu în română
function photoTargets(html, lang) {
  const out = Object.keys(SECTIONS).filter((k) => k !== "SITE_NEWS").map((k) => {
    const opts = RL.dataArray(k).map((e) => '          <option value="' + esc(SECTIONS[k].dir + "/" + e.id + " — " + e.name) + '">' + esc(RL.entryName(e, lang)) + "</option>").join("\n");
    return '        <optgroup label="' + esc(t("nav." + SECTION_META[k].key, lang)) + '">\n' + opts + "\n        </optgroup>\n";
  }).join("");
  return fillGen(html, "targets", out);
}
/* ---------- 2b. itinerarii (js/itinerarii-data.js) ---------- */
const ITIN = ctx.SITE_ITINERARIES || [];
const ITIN_DIR = "itinerarii";
const itinUrl = (it, lang) => SITE + langPath("/" + ITIN_DIR + "/" + it.id + "/", lang);
const fillN = (s, n) => s.replace("{n}", n);
function itinStop(stop, lang) {
  const entry = RL.entryById(stop.k, stop.id);
  if (!entry) throw new Error("Itinerariu: " + stop.k + "/" + stop.id + " nu există în js/data.js");
  const ro = RL.loc(entry, "ro"), l = RL.loc(entry, lang);
  // durata / lungimea vine din faptele intrării (RO și EN sunt aliniate pe poziție), nu e scrisă aici
  let i = (ro.facts || []).findIndex((f) => /^Durată/.test(f.label));
  if (i < 0) i = (ro.facts || []).findIndex((f) => /^Lungime/.test(f.label));
  return { stop, entry, l, name: RL.entryName(entry, lang), url: RL.entryUrl(stop.k, entry.id, lang), fact: i >= 0 && l.facts ? l.facts[i] : null };
}
const itinStopCount = (it) => it.days.reduce((n, d) => n + d.stops.length, 0);
function itinMeta(it, lang) {
  const days = it.days.length === 1 ? t("itin.count.one", lang) : fillN(t("itin.count.many", lang), it.days.length);
  return days + " · " + fillN(t("itin.stops", lang), itinStopCount(it));
}
function itinFirstPhoto(it) {
  for (const d of it.days) for (const s of d.stops) {
    const e = RL.entryById(s.k, s.id);
    if (e && e.images && e.images[0] && RL.imgInfo(e.images[0])) return e.images[0];
  }
  return null;
}
function itinCard(it, lang) {
  const l = it[lang];
  const img = itinFirstPhoto(it);
  return '      <a class="card" href="' + esc(langPath("/" + ITIN_DIR + "/" + it.id + "/", lang)) + '">\n' +
    '        <div class="card__media">' + RL.imgHtml(img, { sizes: "card", alt: it.name[lang] }) + "</div>\n" +
    '        <div class="card__body">\n          <span class="card__cat">' + esc(itinMeta(it, lang)) + "</span>\n" +
    '          <h2 class="card__title">' + esc(it.name[lang]) + "</h2>\n" +
    '          <p class="card__tagline">' + esc(l.tagline) + "</p>\n        </div>\n      </a>\n";
}
function fillItinList(html, lang) {
  return fillGen(html, "itinlist", ITIN.map((it) => itinCard(it, lang)).join(""));
}
function itinBody(it, lang) {
  const l = it[lang], tt = (k) => t(k, lang);
  const days = it.days.map((d) => {
    const stops = d.stops.map((s) => {
      const x = itinStop(s, lang);
      return '        <li class="itin-stop"><a class="itin-stop__name" href="' + esc(x.url) + '">' + esc(x.name) + "</a>" +
        (s.optional ? ' <span class="badge">' + esc(tt("itin.optional")) + "</span>" : "") +
        ' <span class="itin-stop__cat">' + esc(RL.categoryLabel(x.entry, lang) + (x.entry.area ? " · " + RL.areaLabel(x.entry.area, lang) : "")) + "</span>" +
        "<p>" + esc(x.l.tagline || "") + "</p>" +
        (s.note ? '<p class="itin-stop__note">' + esc(s.note[lang]) + "</p>" : "") +
        (x.fact ? '<p class="itin-stop__fact"><strong>' + esc(x.fact.label) + ":</strong> " + esc(x.fact.value) + "</p>" : "") +
        "</li>";
    }).join("\n");
    return '    <section class="itin-day">\n      <h2>' + esc(d.title[lang]) + '</h2>\n      <ol class="itin-stops">\n' + stops + "\n      </ol>\n    </section>\n";
  }).join("");
  const eat = (it.eat || []).map((id) => {
    const e = RL.entryById("SITE_BUSINESSES", id);
    if (!e) throw new Error("Itinerariu: afacerea " + id + " nu există în js/data.js");
    return '<li><a href="' + esc(RL.entryUrl("SITE_BUSINESSES", id, lang)) + '">' + esc(RL.entryName(e, lang)) + "</a> <span class=\"itin-stop__cat\">" + esc(RL.categoryLabel(e, lang) + " · " + RL.areaLabel(e.area, lang)) + "</span></li>";
  }).join("");
  const others = ITIN.filter((o) => o.id !== it.id).map((o) => '<li><a href="' + esc(langPath("/" + ITIN_DIR + "/" + o.id + "/", lang)) + '">' + esc(o.name[lang]) + "</a></li>").join("");
  return '    <article class="itin" data-itinerary="' + esc(it.id) + '">\n' +
    "    <h1>" + esc(it.name[lang]) + "</h1>\n" +
    '    <p class="detail-tagline">' + esc(l.tagline) + "</p>\n" +
    '    <p class="itin-meta">' + esc(itinMeta(it, lang)) + "</p>\n" +
    l.intro.map((p) => "    <p>" + esc(p) + "</p>\n").join("") +
    days +
    (eat ? '    <section class="itin-day">\n      <h2>' + esc(tt("itin.eat")) + "</h2>\n      <ul>" + eat + "</ul>\n    </section>\n" : "") +
    (it.mountain ? '    <p class="itin-warn">' + esc(tt("itin.mountain")) + "</p>\n" : "") +
    '    <p class="muted itin-note">' + esc(tt("itin.disclaimer")) + "</p>\n" +
    '    <section class="itin-day">\n      <h2>' + esc(tt("itin.related")) + "</h2>\n      <ul>" + others + "</ul>\n    </section>\n    </article>";
}
function ldItinerary(it, lang, url, desc) {
  const stops = it.days.flatMap((d) => d.stops.map((s) => itinStop(s, lang)));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip", "@id": url + "#main", name: it.name[lang], description: desc, url, inLanguage: lang,
        itinerary: {
          "@type": "ItemList",
          itemListElement: stops.map((x, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "TouristAttraction", name: x.name, url: SITE + x.url } }))
        }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: HOME_NAME[lang], item: SITE + langPath("/", lang) },
          { "@type": "ListItem", position: 2, name: t("nav.itinerarii", lang), item: SITE + langPath("/itinerarii.html", lang) },
          { "@type": "ListItem", position: 3, name: it.name[lang], item: url }
        ]
      },
      ldWebPage(url, it.name[lang] + " — " + SITE_NAME, lang, url + "#main")
    ]
  };
}
function ldItinList(lang, url, title) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList", "@id": url + "#list", name: t("nav.itinerarii", lang),
        itemListElement: ITIN.map((it, i) => ({ "@type": "ListItem", position: i + 1, url: itinUrl(it, lang), name: it.name[lang] }))
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: HOME_NAME[lang], item: SITE + langPath("/", lang) },
          { "@type": "ListItem", position: 2, name: t("nav.itinerarii", lang), item: url }
        ]
      },
      ldWebPage(url, title, lang, url + "#list")
    ]
  };
}
/* ---------- harta (harta.html): filtre + lista statică a locurilor cu coordonate ---------- */
const MAP_GROUPS = [
  ["SITE_TOWNS", "orase", "#0E7C86"], ["SITE_HERITAGE", "mostenire", "#B45309"], ["SITE_NATURE", "natura", "#15803D"],
  ["SITE_ACTIVITIES", "turismActiv", "#1D4ED8"], ["SITE_BUSINESSES", "afaceri", "#BE185D"], ["SITE_DESTINATIONS", "destinatii", "#52525B"]
];
function fillMap(html, lang) {
  const groups = MAP_GROUPS.map(([k, nav, color]) => ({ k, nav, color, items: RL.dataArray(k).filter((e) => e.coords && e.coords.length === 2) })).filter((g) => g.items.length);
  const filters = groups.map((g) => '      <label class="map-chip"><input type="checkbox" checked data-map-group="' + g.k + '"><span class="map-dot" style="background:' + g.color + '"></span> ' +
    esc(t("nav." + g.nav, lang)) + " (" + g.items.length + ")</label>\n").join("");
  const list = groups.map((g) => '    <section class="map-list" data-map-list="' + g.k + '">\n      <h3>' + esc(t("nav." + g.nav, lang)) + " (" + g.items.length + ")</h3>\n      <ul>\n" +
    g.items.map((e) => '        <li><a href="' + esc(RL.entryUrl(g.k, e.id, lang)) + '">' + esc(RL.entryName(e, lang)) + "</a>" + (e.area ? ' <span class="muted">· ' + esc(RL.areaLabel(e.area, lang)) + "</span>" : "") + "</li>\n").join("") +
    "      </ul>\n    </section>\n").join("");
  return fillGen(fillGen(html, "mapfilters", filters), "maplist", list);
}
const hasOwnDesc = (html) => /<meta name="description"/.test(withoutSeo(html));
const TOP_PAGES = [
  { file: "index.html", title: (l) => t("page.title.home", l), desc: (l) => t("page.meta.home", l), image: DEFAULT_IMAGE, sitemap: "1.0", pair: true, canonical: true },
  ...Object.keys(SECTIONS).map((k) => ({
    file: SECTIONS[k].listing,
    title: (l) => t("page.title." + SECTION_META[k].key, l), desc: (l) => t("page.meta." + SECTION_META[k].key, l),
    image: SECTION_META[k].image, sitemap: "0.8", pair: true, canonical: true
  })),
  { file: "utile.html", title: (l) => t("page.title.utile", l), desc: (l) => t("page.meta.utile", l), sitemap: "0.5", pair: true, canonical: true },
  { file: "contact.html", title: (l) => t("page.title.contact", l), desc: (l) => t("page.meta.contact", l), sitemap: "0.4", pair: true, canonical: true },
  { file: "credite.html", title: (l) => t("page.title.credite", l), desc: (l) => t("page.meta.credite", l), sitemap: "0.2", pair: true, canonical: true },
  // are deja noindex; versiunea EN e pagina de după formularul de pe /en/contact.html
  { file: "multumim.html", title: (l) => t("page.title.thanks", l), pair: true,
    desc: (l) => (l === "en" ? "Your message has been sent to the Hunedoara Live team. Thank you!" : "Mesajul tău a fost trimis către echipa Hunedoara Live. Îți mulțumim!") },
  { file: "trimite-poza.html", title: (l) => t("page.title.foto", l), desc: (l) => t("page.meta.foto", l), sitemap: "0.4", pair: true, canonical: true, fill: photoTargets },
  { file: "multumim-poza.html", title: (l) => t("page.title.thanksPhoto", l), pair: true,
    desc: (l) => (l === "en" ? "Your photo has been sent to the Hunedoara Live team. Thank you!" : "Poza ta a fost trimisă echipei Hunedoara Live. Îți mulțumim!") },
  { file: "itinerarii.html", title: (l) => t("page.title.itinerarii", l), desc: (l) => t("page.meta.itinerarii", l), sitemap: "0.7", pair: true, canonical: true, fill: fillItinList, ld: ldItinList },
  { file: "itinerariu.html", title: (l) => t("page.title.itinerarii", l), desc: (l) => t("page.meta.itinerarii", l), noindex: true },
  { file: "harta.html", title: (l) => t("page.title.harta", l), desc: (l) => t("page.meta.harta", l), sitemap: "0.6", pair: true, canonical: true, fill: fillMap },
  { file: "404.html", title: () => "Pagina nu există — " + SITE_NAME, desc: () => "Pagina căutată nu există pe Hunedoara Live.", noindex: true },
  // șabloanele de detaliu: folosite doar cu ?id= (fallback) — nu se indexează, fără pereche
  ...Object.keys(SECTIONS).map((k) => ({
    file: SECTIONS[k].template, title: (l) => t("page.title." + SECTION_META[k].key, l), desc: (l) => t("sec." + SECTION_META[k].key + ".desc", l),
    image: SECTION_META[k].image, noindex: true
  }))
];
PAIRED_FILES = new Set(TOP_PAGES.filter((p) => p.pair).map((p) => p.file));

const sitemapUrls = [];
let changed = 0, enPages = 0;

for (const p of TOP_PAGES) {
  const roPath = p.file === "index.html" ? "/" : "/" + p.file;
  const urls = { ro: SITE + roPath, en: SITE + langPath(roPath, "en") };
  const alternates = p.pair && p.canonical ? urls : null;
  const image = ogImage(p.image || DEFAULT_IMAGE);
  const seo = (lang, withDesc) => seoBlock({
    lang, title: p.title(lang), desc: p.desc(lang), url: p.canonical ? urls[lang] : null, image,
    noindex: p.noindex, withDesc, alternates,
    ld: p.file === "index.html" ? ldHome(lang, urls[lang], p.title(lang)) : p.ld ? p.ld(lang, urls[lang], p.title(lang)) : null
  });

  let html = read(p.file);
  if (p.fill) html = p.fill(html, "ro");
  html = setSeo(html, seo("ro", !hasOwnDesc(html)));
  if (p.pair) html = markPaired(html, "ro", langPath(roPath, "en"));
  if (write(p.file, html)) changed++;
  if (p.sitemap) sitemapUrls.push({ loc: urls.ro, priority: p.sitemap, alt: alternates });

  if (!p.pair) continue;
  // versiunea EN: aceeași pagină, cu căile absolute, textele traduse și linkurile spre /en/
  let en = absolutize(withoutSeo(html)).replace(/  <meta name="description"[^>]*>\n/, "");
  en = en.replace("<!DOCTYPE html>\n", "<!DOCTYPE html>\n" + GEN_MARK + " din " + p.file + " (versiunea EN) — nu edita manual -->\n");
  en = toEnglish(en, roPath);
  if (p.fill) en = p.fill(en, "en");
  en = setSeo(en, seo("en", true));
  if (write(EN_DIR + "/" + p.file, en)) changed++;
  enPages++;
  if (p.sitemap) sitemapUrls.push({ loc: urls.en, priority: p.sitemap, alt: alternates });
}

/* ---------- 2. paginile intrărilor (RO + EN) ---------- */
function fillEmpty(html, id, inner) {
  const re = new RegExp('(<(\\w+)\\b[^>]*\\bid="' + id + '"[^>]*>)(</\\2>)');
  if (!re.test(html)) throw new Error("Șablonul nu are #" + id + " gol");
  return html.replace(re, (m, open, tag, close) => open + inner + close);
}
function absolutize(html) {
  return html.replace(/\b(href|src)="([^"]*)"/g, (m, attr, v) => {
    if (!v || /^(\/|#|[a-z]+:)/i.test(v)) return m;
    return attr + '="' + (v === "index.html" ? "/" : "/" + v) + '"';
  });
}

const generatedDirs = new Set();
let pages = 0;

for (const key of Object.keys(SECTIONS)) {
  const sec = SECTIONS[key];
  const template = absolutize(read(sec.template));
  // configurația paginii e un bloc JSON (nu cod inline -> CSP fără 'unsafe-inline')
  const cfgRe = /<script type="application\/json" id="detail-config">([^<]*)<\/script>/;
  const cfgMatch = template.match(cfgRe);
  if (!cfgMatch) throw new Error(sec.template + ': lipsește <script type="application/json" id="detail-config">');
  const cfg = JSON.parse(cfgMatch[1]);
  const cfgTag = (id) => '<script type="application/json" id="detail-config">' +
    JSON.stringify(Object.assign({ id }, cfg)).replace(/</g, "\\u003c") + "</script>";

  for (const entry of RL.dataArray(key)) {
    const roPath = RL.entryUrl(key, entry.id, "ro");
    const alternates = { ro: SITE + roPath, en: SITE + langPath(roPath, "en") };
    const img = entry.images && entry.images[0];
    const hasPhoto = !!(img && RL.imgInfo(img));

    for (const lang of LANGS) {
      const out = RL_DETAIL.build(cfg, entry, lang);
      const l = RL.loc(entry, lang);
      const url = alternates[lang];
      let desc = l.tagline || "";
      // taglinele scurte le completăm cu prima frază a descrierii (dacă încape)
      if (desc.length < 110 && l.description && l.description[0]) {
        const first = (l.description[0].match(/^.+?[.!?](?=\s|$)/) || [l.description[0]])[0];
        if ((desc + " " + first).length <= 160) desc += " " + first;
      }
      desc = clip(desc);

      let html = template;
      html = html.replace("<!DOCTYPE html>\n", "<!DOCTYPE html>\n" + GEN_MARK + " din " + sec.template + " + js/data.js" + (lang === "en" ? " (versiunea EN)" : "") + " — nu edita manual -->\n");
      html = html.replace(/<title[^>]*>[^<]*<\/title>/, "<title>" + esc(out.docTitle) + "</title>");
      html = setSeo(html, seoBlock({
        lang, title: out.docTitle, desc, url, alternates,
        image: ogImage(hasPhoto ? img : null), imageAlt: hasPhoto ? RL.entryName(entry, lang) : SITE_NAME,
        type: key === "SITE_NEWS" ? "article" : "website",
        extra: key === "SITE_NEWS" && entry.date ? `<meta property="article:published_time" content="${esc(entry.date)}">` : "",
        ld: ldForEntry(key, entry, url, desc, hasPhoto ? SITE + "/" + img : null, lang, out.docTitle)
      }));
      html = html.replace('<div id="detail-root">', '<div id="detail-root" data-prerendered="' + lang + '">');
      html = html.replace(/<a id="detail-back" class="detail-back" href="[^"]*">[^<]*<\/a>/,
        '<a id="detail-back" class="detail-back" href="' + esc(out.backHref) + '">' + esc(out.backLabel) + "</a>");
      html = fillEmpty(html, "detail-badge", out.badge);
      html = fillEmpty(html, "detail-title", esc(out.title));
      html = fillEmpty(html, "detail-tagline", esc(out.tagline));
      html = fillEmpty(html, "detail-gallery", out.gallery);
      html = fillEmpty(html, "detail-description", out.description);
      html = fillEmpty(html, "detail-facts", out.facts);
      html = fillEmpty(html, "detail-map", out.map);
      if (out.related) {
        html = html.replace('<section id="detail-related" class="section" hidden></section>',
          '<section id="detail-related" class="section">' + out.related + "</section>");
      }
      html = html.replace(cfgRe, () => cfgTag(entry.id));
      html = lang === "en" ? toEnglish(html, roPath) : markPaired(html, "ro", langPath(roPath, "en"));

      const dir = (lang === "en" ? EN_DIR + "/" : "") + sec.dir + "/" + entry.id;
      if (write(dir + "/index.html", html)) changed++;
      generatedDirs.add(dir);
      sitemapUrls.push({ loc: url, priority: key === "SITE_NEWS" ? "0.5" : "0.6", lastmod: entry.date, alt: alternates });
      pages++;
      if (lang === "en") enPages++;
    }
  }

  // intrări șterse din data.js -> ștergem și paginile RO + EN (doar folderele generate de noi)
  for (const base of ["", EN_DIR + "/"]) {
    const secRel = base + sec.dir;
    const secDir = path.join(ROOT, secRel);
    for (const d of fs.existsSync(secDir) ? fs.readdirSync(secDir) : []) {
      const idx = path.join(secDir, d, "index.html");
      if (generatedDirs.has(secRel + "/" + d) || !fs.existsSync(idx)) continue;
      if (fs.readFileSync(idx, "utf8").includes(GEN_MARK)) {
        fs.rmSync(path.join(secDir, d), { recursive: true });
        console.log("  șters (intrare dispărută): /" + secRel + "/" + d + "/");
        changed++;
      }
    }
  }
}

/* ---------- 2b. paginile itinerariilor (RO + EN) ---------- */
{
  const template = absolutize(read("itinerariu.html"));
  const genDirs = new Set();
  for (const it of ITIN) {
    const roPath = "/" + ITIN_DIR + "/" + it.id + "/";
    const alternates = { ro: SITE + roPath, en: SITE + langPath(roPath, "en") };
    const firstPhoto = itinFirstPhoto(it);
    for (const lang of LANGS) {
      const url = alternates[lang];
      const docTitle = it.name[lang] + " — " + SITE_NAME;
      const desc = clip(it[lang].tagline);
      let html = template;
      html = html.replace("<!DOCTYPE html>\n", "<!DOCTYPE html>\n" + GEN_MARK + " din itinerariu.html + js/itinerarii-data.js" + (lang === "en" ? " (versiunea EN)" : "") + " — nu edita manual -->\n");
      html = html.replace(/<title[^>]*>[^<]*<\/title>/, "<title>" + esc(docTitle) + "</title>");
      html = setSeo(html, seoBlock({
        lang, title: docTitle, desc, url, alternates, image: ogImage(firstPhoto), imageAlt: it.name[lang], ld: ldItinerary(it, lang, url, desc)
      }));
      html = fillGen(html, "itin", itinBody(it, lang) + "\n");
      html = lang === "en" ? toEnglish(html, roPath) : markPaired(html, "ro", langPath(roPath, "en"));
      const dir = (lang === "en" ? EN_DIR + "/" : "") + ITIN_DIR + "/" + it.id;
      if (write(dir + "/index.html", html)) changed++;
      genDirs.add(dir);
      sitemapUrls.push({ loc: url, priority: "0.6", alt: alternates, src: ["js/itinerarii-data.js", "js/data.js"] });
      pages++;
      if (lang === "en") enPages++;
    }
  }
  // itinerarii șterse din js/itinerarii-data.js -> ștergem și paginile generate
  for (const base of ["", EN_DIR + "/"]) {
    const root = path.join(ROOT, base + ITIN_DIR);
    for (const d of fs.existsSync(root) ? fs.readdirSync(root) : []) {
      const idx = path.join(root, d, "index.html");
      if (genDirs.has(base + ITIN_DIR + "/" + d) || !fs.existsSync(idx)) continue;
      if (fs.readFileSync(idx, "utf8").includes(GEN_MARK)) { fs.rmSync(path.join(root, d), { recursive: true }); changed++; }
    }
  }
}

/* ---------- 4. sitemap.xml + robots.txt ---------- */
const xmlEsc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const xhtmlLinks = (alt) => !alt ? "" : [["ro", alt.ro], ["en", alt.en], ["x-default", alt.ro]]
  .map(([hl, href]) => '\n    <xhtml:link rel="alternate" hreflang="' + hl + '" href="' + xmlEsc(href) + '"/>').join("");
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
  sitemapUrls.map((u) => "  <url>\n    <loc>" + xmlEsc(u.loc) + "</loc>" +
    (u.lastmod ? "\n    <lastmod>" + xmlEsc(u.lastmod) + "</lastmod>" : "") +
    "\n    <priority>" + u.priority + "</priority>" + xhtmlLinks(u.alt) + "\n  </url>").join("\n") +
  "\n</urlset>\n";
if (write("sitemap.xml", sitemap)) changed++;
const robots = "User-agent: *\nAllow: /\n\nSitemap: " + SITE + "/sitemap.xml\n";
if (write("robots.txt", robots)) changed++;

console.log(pages + " pagini de intrări (RO + EN), " + enPages + " pagini EN în total, " + sitemapUrls.length + " URL-uri în sitemap.xml, " + changed + " fișiere modificate.");
