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
 *  2. câte o pagină statică pentru fiecare intrare din js/data.js, la
 *     /<secțiune>/<id>/index.html (ex. /orase/deva/), pornind de la șablonul
 *     secțiunii (oras.html etc.), cu <title>, meta description, Open Graph,
 *     canonical și conținutul în română deja în HTML (Facebook și Google îl
 *     văd fără JavaScript; js/detail.js preia pagina în browser, ex. pentru EN)
 *  3. blocul SEO (canonical + Open Graph + Twitter) din paginile principale
 *  4. sitemap.xml și robots.txt
 *
 * Fișierele generate se comit în git (Netlify publică folderul așa cum e).
 * Nu edita manual paginile din /<secțiune>/<id>/ — se suprascriu.
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
for (const f of ["js/data.js", "js/config.js", "js/i18n.js", "js/images.js", "js/common.js", "js/detail.js"]) {
  vm.runInContext(read(f), ctx, { filename: f });
}
const { RL, I18N, RL_DETAIL } = ctx;
const t = (k) => I18N.t(k, "ro");

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
function seoBlock({ title, desc, url, image, imageAlt, type = "website", noindex = false, withDesc = true, extra = "", ld = null }) {
  const L = [SEO_START];
  if (withDesc && desc) L.push(`<meta name="description" content="${esc(desc)}">`);
  if (noindex) L.push(`<meta name="robots" content="noindex">`);
  if (url) L.push(`<link rel="canonical" href="${esc(url)}">`);
  L.push(
    `<meta property="og:site_name" content="${SITE_NAME}">`,
    `<meta property="og:locale" content="ro_RO">`,
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
 * Totul e derivat din js/data.js — nu inventăm câmpuri care nu există acolo. */
const ORG = { "@type": "Organization", name: SITE_NAME, url: SITE + "/", logo: SITE + "/icons/icon-512.png", email: "hunedoaragohd@gmail.com" };
const REGION = { "@type": "AdministrativeArea", name: "Județul Hunedoara" };
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
function ldEntity(key, entry, l, url, desc, img) {
  const cat = (entry.category && entry.category.ro) || "";
  const base = { "@id": url + "#main", name: entry.name, description: desc, url };
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
    const o = { "@type": "City", ...base, containedInPlace: REGION };
    if (img) o.image = img;
    if (entry.coords) o.geo = { "@type": "GeoCoordinates", latitude: entry.coords[0], longitude: entry.coords[1] };
    return o;
  }
  if (key === "SITE_NEWS") {
    const where = factOf(l, /^(Loc|Locație)$/);
    if (EVENT_CATS.test(cat) && entry.date && where) {
      const o = {
        "@type": cat === "Festival" ? "Festival" : "Event", ...base, startDate: entry.date,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: { "@type": "Place", name: where.split(",")[0].trim(), address: ldAddress(entry, { facts: [{ label: "Adresă", value: where }] }) }
      };
      if (img) o.image = img;
      return o;
    }
    const o = { "@type": "NewsArticle", ...base, headline: clip(entry.name, 110), author: ORG, publisher: ORG, mainEntityOfPage: url };
    if (entry.date) o.datePublished = entry.date;
    if (img) o.image = img;
    return o;
  }
  // destinații, natură, turism activ, moștenire culturală
  const type = key === "SITE_HERITAGE" && /^(Muzeu|Casă memorială)$/.test(cat) ? "Museum" : "TouristAttraction";
  return { "@type": type, ...base, ...ldPlaceBits(entry, l, img) };
}
function ldForEntry(key, entry, l, url, desc, img) {
  const sec = SECTIONS[key];
  return {
    "@context": "https://schema.org",
    "@graph": [
      ldEntity(key, entry, l, url, desc, img),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Acasă", item: SITE + "/" },
          { "@type": "ListItem", position: 2, name: t("nav." + SECTION_META[key].key), item: SITE + "/" + sec.listing },
          { "@type": "ListItem", position: 3, name: entry.name, item: url }
        ]
      }
    ]
  };
}
const LD_HOME = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": SITE + "/#website", name: SITE_NAME, url: SITE + "/", inLanguage: ["ro", "en"], publisher: { "@id": SITE + "/#org" } },
    { ...ORG, "@id": SITE + "/#org", areaServed: REGION }
  ]
};
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

/* ---------- secțiunile ---------- */
const SECTIONS = RL.SECTIONS; // aceeași sursă ca în browser (js/common.js)
const SECTION_META = {
  SITE_DESTINATIONS: { key: "destinatii", image: "images/cetatile-dacice-ansamblu.jpg" },
  SITE_TOWNS: { key: "orase", image: "images/hunedoara-corvin-castle.jpg" },
  SITE_NATURE: { key: "natura", image: "images/retezat-bucura.jpg" },
  SITE_ACTIVITIES: { key: "turismActiv", image: "images/partii-parang.jpg" },
  SITE_HERITAGE: { key: "mostenire", image: "images/prislop-manastire.jpg" },
  SITE_NEWS: { key: "stiri", image: "images/home-tile-stiri.jpg" },
  SITE_BUSINESSES: { key: "afaceri", image: "images/pensiunea-retezat.jpg" }
};

/* ---------- 3. paginile principale ---------- */
const hasOwnDesc = (html) => /<meta name="description"/.test(withoutSeo(html));
const TOP_PAGES = [
  { file: "index.html", url: SITE + "/", title: SITE_NAME + " — ghidul digital al județului Hunedoara", desc: t("page.meta.home"), image: DEFAULT_IMAGE, sitemap: "1.0" },
  ...Object.keys(SECTIONS).map((k) => ({
    file: SECTIONS[k].listing, url: SITE + "/" + SECTIONS[k].listing,
    title: t("page.title." + SECTION_META[k].key), desc: t("page.meta." + SECTION_META[k].key),
    image: SECTION_META[k].image, sitemap: "0.8"
  })),
  { file: "utile.html", url: SITE + "/utile.html", title: t("page.title.utile"), desc: t("page.meta.utile"), sitemap: "0.5" },
  { file: "contact.html", url: SITE + "/contact.html", title: t("page.title.contact"), desc: t("page.meta.contact"), sitemap: "0.4" },
  { file: "credite.html", url: SITE + "/credite.html", title: t("page.title.credite"), desc: t("page.meta.credite"), sitemap: "0.2" },
  { file: "multumim.html", title: t("page.title.thanks"), desc: "Mesajul tău a fost trimis către echipa Hunedoara Live. Îți mulțumim!" }, // are deja noindex
  { file: "404.html", title: "Pagina nu există — " + SITE_NAME, desc: "Pagina căutată nu există pe Hunedoara Live.", noindex: true },
  // șabloanele de detaliu: folosite doar cu ?id= (fallback) — nu se indexează
  ...Object.keys(SECTIONS).map((k) => ({
    file: SECTIONS[k].template, title: t("page.title." + SECTION_META[k].key), desc: t("sec." + SECTION_META[k].key + ".desc"),
    image: SECTION_META[k].image, noindex: true
  }))
];

let changed = 0;
for (const p of TOP_PAGES) {
  let html = read(p.file);
  const block = seoBlock({
    title: p.title, desc: p.desc, url: p.url, image: ogImage(p.image || DEFAULT_IMAGE),
    noindex: p.noindex, withDesc: !hasOwnDesc(html), ld: p.file === "index.html" ? LD_HOME : null
  });
  html = setSeo(html, block);
  if (write(p.file, html)) changed++;
}

/* ---------- 2. paginile intrărilor ---------- */
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

const sitemapUrls = TOP_PAGES.filter((p) => p.sitemap).map((p) => ({ loc: p.url, priority: p.sitemap }));
const generatedDirs = new Set();
let pages = 0;

for (const key of Object.keys(SECTIONS)) {
  const sec = SECTIONS[key];
  const template = absolutize(read(sec.template));
  const cfgMatch = template.match(/window\.DETAIL_CONFIG = (\{[^}]*\});/);
  if (!cfgMatch) throw new Error(sec.template + ": lipsește window.DETAIL_CONFIG");
  const cfg = vm.runInNewContext("(" + cfgMatch[1] + ")");

  for (const entry of RL.dataArray(key)) {
    const out = RL_DETAIL.build(cfg, entry, "ro");
    const l = RL.loc(entry, "ro");
    const url = SITE + RL.entryUrl(key, entry.id);
    let desc = l.tagline || "";
    // taglinele scurte le completăm cu prima frază a descrierii (dacă încape)
    if (desc.length < 110 && l.description && l.description[0]) {
      const first = (l.description[0].match(/^.+?[.!?](?=\s|$)/) || [l.description[0]])[0];
      if ((desc + " " + first).length <= 160) desc += " " + first;
    }
    desc = clip(desc);
    const img = entry.images && entry.images[0];
    const hasPhoto = !!(img && RL.imgInfo(img));

    let html = template;
    html = html.replace("<!DOCTYPE html>\n", "<!DOCTYPE html>\n" + GEN_MARK + " din " + sec.template + " + js/data.js — nu edita manual -->\n");
    html = html.replace(/<title[^>]*>[^<]*<\/title>/, "<title>" + esc(out.docTitle) + "</title>");
    html = setSeo(html, seoBlock({
      title: out.docTitle, desc, url,
      image: ogImage(hasPhoto ? img : null), imageAlt: hasPhoto ? entry.name : SITE_NAME,
      type: key === "SITE_NEWS" ? "article" : "website",
      extra: key === "SITE_NEWS" && entry.date ? `<meta property="article:published_time" content="${esc(entry.date)}">` : "",
      ld: ldForEntry(key, entry, l, url, desc, hasPhoto ? SITE + "/" + img : null)
    }));
    html = html.replace('<div id="detail-root">', '<div id="detail-root" data-prerendered="ro">');
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
    html = html.replace("window.DETAIL_CONFIG = { ", "window.DETAIL_CONFIG = { id: " + JSON.stringify(entry.id) + ", ");

    const rel = sec.dir + "/" + entry.id + "/index.html";
    if (write(rel, html)) changed++;
    generatedDirs.add(sec.dir + "/" + entry.id);
    sitemapUrls.push({ loc: url, priority: key === "SITE_NEWS" ? "0.5" : "0.6", lastmod: entry.date });
    pages++;
  }

  // intrări șterse din data.js -> ștergem și pagina (doar folderele generate de noi)
  const secDir = path.join(ROOT, sec.dir);
  for (const d of fs.existsSync(secDir) ? fs.readdirSync(secDir) : []) {
    const idx = path.join(secDir, d, "index.html");
    if (generatedDirs.has(sec.dir + "/" + d) || !fs.existsSync(idx)) continue;
    if (fs.readFileSync(idx, "utf8").includes(GEN_MARK)) {
      fs.rmSync(path.join(secDir, d), { recursive: true });
      console.log("  șters (intrare dispărută): /" + sec.dir + "/" + d + "/");
      changed++;
    }
  }
}

/* ---------- 4. sitemap.xml + robots.txt ---------- */
const xmlEsc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  sitemapUrls.map((u) => "  <url><loc>" + xmlEsc(u.loc) + "</loc>" +
    (u.lastmod ? "<lastmod>" + xmlEsc(u.lastmod) + "</lastmod>" : "") +
    "<priority>" + u.priority + "</priority></url>").join("\n") +
  "\n</urlset>\n";
if (write("sitemap.xml", sitemap)) changed++;
const robots = "User-agent: *\nAllow: /\n\nSitemap: " + SITE + "/sitemap.xml\n";
if (write("robots.txt", robots)) changed++;

console.log(pages + " pagini de intrări, " + sitemapUrls.length + " URL-uri în sitemap.xml, " + changed + " fișiere modificate.");
