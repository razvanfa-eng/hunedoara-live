/*
 * HARTA JUDEȚULUI DIN PRIMA PAGINĂ / COUNTY MAP ON THE HOME PAGE
 * =====================================================================
 *   node scripts/build-map.mjs            (folosește conturul salvat în cache)
 *   node scripts/build-map.mjs --refresh  (descarcă din nou conturul din OSM)
 *
 * apoi, ca de obicei:  node scripts/build-pages.mjs   (copiază harta și în /en/)
 *
 * Ce face:
 *  1. ia conturul real al județului Hunedoara din OpenStreetMap — relația
 *     administrativă 2248737 (ISO3166-2 = RO-HD, admin_level 4) — prin Overpass API
 *     (cu mai multe endpoint-uri de rezervă); răspunsul brut se păstrează în
 *     scripts/.cache/ (ignorat de git), ca refacerea hărții să nu depindă de rețea;
 *  2. lipește segmentele (way-urile „outer”) într-un inel închis, îl proiectează
 *     (echirectangular cu corecție cos(lat) la latitudinea medie a județului —
 *     la scara unui județ distorsiunea e neglijabilă) și îl simplifică
 *     (Douglas–Peucker) la câteva sute de puncte;
 *  3. pune pe hartă orașele din js/data.js (SITE_TOWNS, coordonatele din `coords`)
 *     ca linkuri spre /orase/<id>/ și câteva repere emblematice (marcaj diferit);
 *  4. scrie SVG-ul inline în index.html, între markerii HARTA de mai jos.
 *     Fără stiluri inline și fără JS: aspectul e în css/style.css (.hero-map…),
 *     textele traductibile au data-i18n (js/i18n.js), iar scripts/build-pages.mjs
 *     face din index.html și en/index.html (cu linkurile rescrise spre /en/orase/…).
 *
 * Date: © OpenStreetMap contributors, licență ODbL (atribuirea apare sub hartă).
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = path.join(ROOT, "scripts", ".cache", "hunedoara-osm.json");
const RELATION = 2248737;
const ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://maps.mail.ru/osm/tools/overpass/api/interpreter"
];
const USER_AGENT = "hunedoara-live-map-builder/1.0 (https://gohd.ro; static county outline for the home page)";
const START = "<!-- HARTA: generat de scripts/build-map.mjs — nu edita manual -->";
const END = "<!-- /HARTA -->";

const TARGET_POINTS = 360;   // câte puncte păstrăm din contur (aprox.)
const MAP_W = 400;           // lățimea conturului, în unități SVG
const PAD = { top: 10, right: 10, bottom: 10, left: 10 }; // marginea din jurul conturului

/* Repere emblematice: marcaj discret (romb), link spre pagina lor.
 * Coordonatele sunt cele din js/data.js când există, altfel cele de mai jos. */
const LANDMARKS = [
  { key: "SITE_HERITAGE", id: "castelul-corvinilor", label: "Castelul Corvinilor", i18n: "home.map.lm.corvin", coords: [45.7494, 22.8881] },
  { key: "SITE_HERITAGE", id: "sarmizegetusa-regia", label: "Sarmizegetusa Regia" },
  { key: "SITE_NATURE", id: "parcul-national-retezat", label: "Retezat" }
];

/* Poziția etichetelor (în unități SVG, față de punct). Implicit: dreapta.
 * Valea Jiului are cinci orașe la câțiva km unul de altul — acolo etichetele
 * sunt așezate de mână, să nu se suprapună. */
const LABEL_POS = {
  deva: { dx: -9, dy: 4, anchor: "end" },
  hunedoara: { dx: -9, dy: 4, anchor: "end" },
  simeria: { dx: 0, dy: 18, anchor: "middle" },
  orastie: { dx: 9, dy: 4 },
  hateg: { dx: 9, dy: 4 },
  brad: { dx: 9, dy: 4 },
  petrila: { dx: 9, dy: -2 },
  petrosani: { dx: 9, dy: 8 },
  aninoasa: { dx: -2, dy: -10, anchor: "end" },
  vulcan: { dx: -9, dy: 1, anchor: "end" },
  lupeni: { dx: -9, dy: 9, anchor: "end" },
  "castelul-corvinilor": { dx: -8, dy: 15, anchor: "end" },
  "sarmizegetusa-regia": { dx: 0, dy: -9, anchor: "middle" },
  "parcul-national-retezat": { dx: 8, dy: 4 }
};

/* ---------- 1. conturul din OpenStreetMap ---------- */
async function fetchBoundary() {
  const query = `[out:json][timeout:90];relation(${RELATION});out geom;`;
  let lastErr;
  for (let attempt = 0; attempt < 3; attempt++) {
    for (const ep of ENDPOINTS) {
      try {
        const res = await fetch(ep, {
          method: "POST",
          headers: { "User-Agent": USER_AGENT, "Content-Type": "application/x-www-form-urlencoded" },
          body: "data=" + encodeURIComponent(query),
          signal: AbortSignal.timeout(120000)
        });
        const text = await res.text();
        if (!res.ok || !text.trim().startsWith("{")) throw new Error(ep + ": HTTP " + res.status + " " + text.slice(0, 120).replace(/\s+/g, " "));
        const json = JSON.parse(text);
        if (!json.elements || !json.elements.length) throw new Error(ep + ": răspuns gol");
        console.log("  contur descărcat de la " + ep);
        return json;
      } catch (e) {
        lastErr = e;
        console.log("  " + (e.message || e));
      }
    }
    await new Promise((r) => setTimeout(r, 5000 * (attempt + 1)));
  }
  throw new Error("Nu am putut descărca conturul din Overpass: " + (lastErr && lastErr.message));
}

let osm;
if (!process.argv.includes("--refresh") && fs.existsSync(CACHE)) {
  osm = JSON.parse(fs.readFileSync(CACHE, "utf8"));
} else {
  osm = await fetchBoundary();
  fs.mkdirSync(path.dirname(CACHE), { recursive: true });
  fs.writeFileSync(CACHE, JSON.stringify(osm));
}
const rel = osm.elements.find((e) => e.type === "relation" && e.id === RELATION);
if (!rel) throw new Error("Relația " + RELATION + " lipsește din răspuns");

/* ---------- 2. inelul exterior ---------- */
// lipim way-urile „outer” cap la cap (unele trebuie întoarse)
function assembleRings(ways) {
  const key = (p) => p.lat.toFixed(7) + "," + p.lon.toFixed(7);
  const pool = ways.map((w) => w.slice());
  const rings = [];
  while (pool.length) {
    let ring = pool.shift();
    let guard = 0;
    while (key(ring[0]) !== key(ring[ring.length - 1]) && guard++ < 10000) {
      const tail = key(ring[ring.length - 1]);
      const i = pool.findIndex((w) => key(w[0]) === tail || key(w[w.length - 1]) === tail);
      if (i < 0) throw new Error("Contur deschis: nu găsesc continuarea segmentului");
      let next = pool.splice(i, 1)[0];
      if (key(next[0]) !== tail) next = next.reverse();
      ring = ring.concat(next.slice(1));
    }
    rings.push(ring);
  }
  return rings;
}
const outerWays = rel.members.filter((m) => m.type === "way" && m.role === "outer" && m.geometry).map((m) => m.geometry);
const rings = assembleRings(outerWays);
// județul e dintr-o bucată; dacă apar și insule mici, le păstrăm doar pe cea mare
const ringArea = (r) => Math.abs(r.reduce((s, p, i) => { const q = r[(i + 1) % r.length]; return s + p.lon * q.lat - q.lon * p.lat; }, 0) / 2);
rings.sort((a, b) => ringArea(b) - ringArea(a));
const ring = rings[0];

const lats = ring.map((p) => p.lat), lons = ring.map((p) => p.lon);
const bbox = { minLat: Math.min(...lats), maxLat: Math.max(...lats), minLon: Math.min(...lons), maxLon: Math.max(...lons) };
const lat0 = (bbox.minLat + bbox.maxLat) / 2;
const k = Math.cos((lat0 * Math.PI) / 180);
// proiecție echirectangulară cu corecție cos(lat0): x spre est, y spre sud
const projRaw = (lat, lon) => [(lon - bbox.minLon) * k, bbox.maxLat - lat];
const rawW = (bbox.maxLon - bbox.minLon) * k, rawH = bbox.maxLat - bbox.minLat;
const scale = MAP_W / rawW;
const MAP_H = rawH * scale;
const proj = (lat, lon) => { const [x, y] = projRaw(lat, lon); return [PAD.left + x * scale, PAD.top + y * scale]; };
const VB_W = Math.round(PAD.left + MAP_W + PAD.right), VB_H = Math.round(PAD.top + MAP_H + PAD.bottom);

/* ---------- simplificare Douglas–Peucker (pe coordonatele proiectate) ---------- */
function simplify(pts, tol) {
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = pts[a], [bx, by] = pts[b];
    const dx = bx - ax, dy = by - ay, len2 = dx * dx + dy * dy;
    let maxD = -1, idx = -1;
    for (let i = a + 1; i < b; i++) {
      const [px, py] = pts[i];
      let t = len2 ? ((px - ax) * dx + (py - ay) * dy) / len2 : 0;
      t = Math.max(0, Math.min(1, t));
      const ex = ax + t * dx - px, ey = ay + t * dy - py;
      const d = ex * ex + ey * ey;
      if (d > maxD) { maxD = d; idx = i; }
    }
    if (idx > 0 && maxD > tol * tol) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}
const projected = ring.map((p) => proj(p.lat, p.lon));
// inelul e închis (primul punct = ultimul): îl tăiem în două la punctul cel mai îndepărtat
// de start, ca Douglas–Peucker să nu aibă un segment de lungime zero
const open = projected.slice(0, -1);
let far = 0, farD = 0;
open.forEach(([x, y], i) => { const d = (x - open[0][0]) ** 2 + (y - open[0][1]) ** 2; if (d > farD) { farD = d; far = i; } });
const simplifyRing = (tol) => {
  const a = simplify(open.slice(0, far + 1), tol), b = simplify(open.slice(far).concat([open[0]]), tol);
  return a.concat(b.slice(1, -1));
};
let lo = 0.01, hi = 20, simple = simplifyRing(hi);
for (let i = 0; i < 40; i++) {
  const mid = (lo + hi) / 2, s = simplifyRing(mid);
  if (s.length > TARGET_POINTS) lo = mid; else { hi = mid; simple = s; }
}
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const pathD = "M" + simple.map(([x, y]) => f1(x) + " " + f1(y)).join("L") + "Z";

/* ---------- 3. orașele și reperele ---------- */
const ctx = {};
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, "js/data.js"), "utf8"), ctx, { filename: "js/data.js" });
const DIRS = { SITE_TOWNS: "orase", SITE_HERITAGE: "mostenire", SITE_NATURE: "natura" };
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const towns = ctx.SITE_TOWNS.map((t) => {
  if (!t.coords) throw new Error("Orașul " + t.id + " nu are coords în js/data.js");
  return { id: t.id, name: t.name, href: "/" + DIRS.SITE_TOWNS + "/" + t.id + "/", xy: proj(t.coords[0], t.coords[1]) };
});
const landmarks = LANDMARKS.map((lm) => {
  const e = ctx[lm.key].find((x) => x.id === lm.id);
  if (!e) throw new Error("Reperul " + lm.id + " lipsește din " + lm.key);
  const c = e.coords || lm.coords;
  return { ...lm, href: "/" + DIRS[lm.key] + "/" + lm.id + "/", xy: proj(c[0], c[1]) };
});

function label(id, name, [x, y], i18n) {
  const p = LABEL_POS[id] || { dx: 9, dy: 4 };
  const anchor = p.anchor && p.anchor !== "start" ? ' text-anchor="' + p.anchor + '"' : "";
  return '<text x="' + f1(x + p.dx) + '" y="' + f1(y + p.dy) + '"' + anchor + (i18n ? ' data-i18n="' + i18n + '"' : "") + ">" + esc(name) + "</text>";
}

/* ---------- 4. SVG-ul ---------- */
const I = "      ";
const lines = [
  START,
  '<figure class="hero-map">',
  '  <svg class="hero-map__svg" viewBox="0 0 ' + VB_W + " " + VB_H + '" role="group" aria-labelledby="hero-map-title" focusable="false">',
  '    <title id="hero-map-title" data-i18n="home.map.title">Harta județului Hunedoara: orașele și câteva repere din ghid</title>',
  '    <path class="hero-map__county" d="' + pathD + '" aria-hidden="true"></path>',
  '    <g class="hero-map__landmarks">',
  ...landmarks.map((lm) => {
    const [x, y] = lm.xy;
    return I + '<a class="hero-map__lm" href="' + lm.href + '">' +
      '<path class="hero-map__diamond" d="M' + f1(x) + " " + f1(y - 4.5) + "l4.5 4.5l-4.5 4.5l-4.5-4.5Z" + '"></path>' +
      label(lm.id, lm.label, lm.xy, lm.i18n) + "</a>";
  }),
  "    </g>",
  '    <g class="hero-map__towns">',
  ...towns.map((t) => {
    const [x, y] = t.xy;
    return I + '<a class="hero-map__town" href="' + t.href + '">' +
      '<circle class="hero-map__halo" cx="' + f1(x) + '" cy="' + f1(y) + '" r="9"></circle>' +
      '<circle class="hero-map__dot" cx="' + f1(x) + '" cy="' + f1(y) + '" r="4"></circle>' +
      label(t.id, t.name, t.xy) + "</a>";
  }),
  "    </g>",
  "  </svg>",
  '  <figcaption class="hero-map__caption">',
  '    <span class="hero-map__key hero-map__key--town" data-i18n="home.map.legend.towns">Orașe</span>',
  '    <span class="hero-map__key hero-map__key--lm" data-i18n="home.map.legend.landmarks">Repere</span>',
  '    <a class="hero-map__credit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" data-i18n="home.map.credit">Contur: © OpenStreetMap contributors</a>',
  "  </figcaption>",
  "</figure>",
  END
];

const indexFile = path.join(ROOT, "index.html");
const html = fs.readFileSync(indexFile, "utf8").split(String.fromCharCode(13)).join("");
const a = html.indexOf(START), b = html.indexOf(END);
if (a < 0 || b < a) throw new Error("index.html: lipsesc markerii " + START + " … " + END);
const lineStart = html.lastIndexOf("\n", a) + 1;
const indent = html.slice(lineStart, a);
const block = lines.map((l, i) => (i === 0 ? "" : indent) + l).join("\n");
const out = html.slice(0, a) + block + html.slice(b + END.length);
if (out !== html) fs.writeFileSync(indexFile, out);
console.log("Harta: " + ring.length + " puncte în contur -> " + simple.length + " după simplificare; " +
  towns.length + " orașe, " + landmarks.length + " repere; viewBox " + VB_W + "×" + VB_H + (out !== html ? " (index.html actualizat)" : " (neschimbat)"));
