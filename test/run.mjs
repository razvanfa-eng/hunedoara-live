/* Test headless (jsdom): randare, motor generic de listare/detaliu, recenzii (mod local). */
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import vm from "vm";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(DIR, "..");
let pass = 0, fail = 0;
const ok = (c, m) => { (c ? pass++ : fail++); console.log((c ? "  ok  " : " FAIL ") + m); };

/* Valorile așteptate se calculează din js/data.js (nu sunt scrise de mână), ca testele
   să nu se strice de fiecare dată când adăugăm sau scoatem conținut. */
const DATA = (() => {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, "js/data.js"), "utf8"), ctx);
  return ctx.window;
})();
const SECTION_KEYS = ["SITE_DESTINATIONS", "SITE_NATURE", "SITE_ACTIVITIES", "SITE_HERITAGE", "SITE_TOWNS", "SITE_NEWS", "SITE_BUSINESSES"];
const RELATED_KEYS = ["SITE_NATURE", "SITE_ACTIVITIES", "SITE_HERITAGE", "SITE_BUSINESSES"];
const uniq = (a) => [...new Set(a.filter(Boolean))];
const dataKeyOf = (file) => (fs.readFileSync(path.join(ROOT, file), "utf8").match(/dataKey:\s*"([A-Z_]+)"/) || [])[1];
const byId = (key, id) => DATA[key].find((e) => e.id === id);

/* -------- data.js: integritate -------- */
for (const k of SECTION_KEYS) ok(Array.isArray(DATA[k]) && DATA[k].length > 0, "data.js: " + k + " are intrări (" + (DATA[k] || []).length + ")");
{
  const ids = SECTION_KEYS.flatMap((k) => DATA[k].map((e) => k + "/" + e.id));
  ok(ids.length === new Set(ids).size, "data.js: id-uri unice în fiecare secțiune");
  const bad = SECTION_KEYS.flatMap((k) => DATA[k].filter((e) => !e.ro || !e.en || !e.ro.tagline || !e.en.tagline ||
    (e.ro.description || []).length !== (e.en.description || []).length ||
    (e.ro.facts || []).length !== (e.en.facts || []).length).map((e) => e.id));
  ok(bad.length === 0, "data.js: toate intrările sunt bilingve (RO/EN aliniate)" + (bad.length ? " — " + bad.join(", ") : ""));
  const missingImg = SECTION_KEYS.flatMap((k) => DATA[k].flatMap((e) => (e.images || []).filter((i) => !fs.existsSync(path.join(ROOT, i)))));
  ok(missingImg.length === 0, "data.js: toate imaginile referite există" + (missingImg.length ? " — lipsesc " + missingImg.join(", ") : ""));
  const badCredit = SECTION_KEYS.flatMap((k) => DATA[k].filter((e) => e.photoCredit &&
    !(e.photoCredit.author && e.photoCredit.license && e.photoCredit.source)).map((e) => e.id));
  ok(badCredit.length === 0, "data.js: creditele foto sunt complete (autor, licență, sursă)" + (badCredit.length ? " — " + badCredit.join(", ") : ""));
}

function prep(html) {
  html = html.replace(/<head>/, `<head><script>window.addEventListener("error",e=>{window.__err=(window.__err||"")+String(e.message||e.error)+" | ";});</script>`);
  html = html.replace(/<link[^>]+href="https?:\/\/[^"]*"[^>]*>/g, "");
  html = html.replace(/<script[^>]+src="https?:\/\/[^"]*"[^>]*><\/script>/g, "");
  html = html.replace(/<script src="\/?(js\/[^"]+)"><\/script>/g, (_, src) =>
    "<script>\n" + fs.readFileSync(path.join(ROOT, src), "utf8") + "\n</script>");
  return html;
}
function load(file, query = "", urlPath = file) {
  const dom = new JSDOM(prep(fs.readFileSync(path.join(ROOT, file), "utf8")), {
    runScripts: "dangerously", pretendToBeVisual: true,
    url: "http://localhost:5175/" + urlPath + query
  });
  return new Promise((res) => {
    const w = dom.window;
    const done = () => setTimeout(() => res(w), 40);
    if (w.document.readyState === "complete") done();
    else w.addEventListener("load", done);
  });
}

/* -------- index.html -------- */
{
  const w = await load("index.html");
  const d = w.document;
  ok(!w.__err, "index: fără erori JS" + (w.__err ? " — " + w.__err : ""));
  ok(d.querySelectorAll("#home-stats .stat").length === 4, "index: 4 statistici randate");
  ok(d.querySelectorAll("#explore-grid .tile").length === 8, "index: 8 module în grid-ul de explorare (structura hibridă)");
  ok([...d.querySelectorAll("#explore-grid .tile")].every((a) => /\.html$/.test(a.getAttribute("href"))), "index: toate tile-urile leagă spre o pagină");
  const expNews = Math.min(3, DATA.SITE_NEWS.length);
  ok(d.querySelectorAll("#home-news .news-item").length === expNews, "index: " + expNews + " știri randate (cele mai recente)");
  const newest = DATA.SITE_NEWS.slice().sort((a, b) => (b.date || "").localeCompare(a.date || ""))[0];
  ok(d.querySelector("#home-news .news-item .news-item__title")?.textContent === newest.name, "index: prima știre e cea mai recentă");
  const before = d.querySelector(".hero h1").textContent;
  d.querySelector("#lang-toggle").dispatchEvent(new w.Event("click"));
  ok(d.querySelector(".hero h1").textContent === before, "index: numele site-ului nu se traduce (Hunedoara Live rămâne la fel)");
  ok(d.documentElement.getAttribute("data-lang") === "en", "index: comutatorul de limbă schimbă data-lang");
}

/* -------- destinatii.html + destinatie.html (secțiune nouă) -------- */
{
  const w1 = await load("destinatii.html");
  const d1 = w1.document;
  ok(!w1.__err, "destinatii: fără erori JS" + (w1.__err ? " — " + w1.__err : ""));
  const nDest = DATA[dataKeyOf("destinatii.html")].length;
  ok(d1.querySelectorAll("#grid .card").length === nDest, "destinatii: " + nDest + " carduri (câte sunt în data.js)");
  ok([...d1.querySelectorAll("#grid .card")].every((a) => /^\/destinatii\/[a-z0-9-]+\/$/.test(a.getAttribute("href"))), "destinatii: href-uri carduri valide");

  const w2 = await load("destinatie.html", "?id=valea-jiului");
  const d2 = w2.document;
  ok(!w2.__err, "destinatie: fără erori JS" + (w2.__err ? " — " + w2.__err : ""));
  ok(/Valea Jiului/.test(d2.querySelector("#detail-title")?.textContent || ""), "destinatie: titlu randat");
}

/* -------- natura.html (fost locuri) + recenzii (mod local) -------- */
{
  const w1 = await load("natura.html");
  const d1 = w1.document;
  ok(!w1.__err, "natura: fără erori JS" + (w1.__err ? " — " + w1.__err : ""));
  const nat = DATA[dataKeyOf("natura.html")];
  ok(d1.querySelectorAll("#grid .card").length === nat.length, "natura: " + nat.length + " carduri (câte sunt în data.js)");
  const nAreas = uniq(nat.map((e) => e.area)).length;
  ok(d1.querySelectorAll("#f-area option").length === 1 + nAreas, "natura: filtru zonă = " + nAreas + " + Toate");
  const firstArea = nat[0].area;
  const sel = d1.getElementById("f-area");
  sel.value = firstArea; sel.dispatchEvent(new w1.Event("change"));
  const expArea = nat.filter((e) => e.area === firstArea).length;
  ok(d1.querySelectorAll("#grid .card").length === expArea, "natura: filtrul de zonă „" + firstArea + "” lasă " + expArea + " carduri");

  const w = await load("natura-loc.html", "?id=pestera-bolii");
  const d = w.document;
  ok(!w.__err, "natura-loc: fără erori JS" + (w.__err ? " — " + w.__err : ""));
  ok(/Bolii/.test(d.querySelector("#detail-title")?.textContent || ""), "natura-loc: titlu randat");
  ok(!!d.querySelector("#detail-map a"), "natura-loc: linkuri hartă prezente pentru coordonate");
  ok(!!d.querySelector("#reviews .review-form"), "recenzii: formularul e randat");
  ok(/Nicio recenzie/.test(d.querySelector("#reviews").textContent), "recenzii: mesaj 'nicio recenzie' inițial");

  const form = d.querySelector("#reviews .review-form");
  form.querySelector('input[name="name"]').value = "Ion Test";
  form.querySelector('input[name="rating"][value="4"]').checked = true;
  form.querySelector('textarea[name="body"]').value = "Foarte frumos, merită.";
  form.dispatchEvent(new w.Event("submit", { cancelable: true, bubbles: true }));
  await new Promise((r) => setTimeout(r, 60));
  const txt = d.querySelector("#reviews").textContent;
  ok(/Ion Test/.test(txt) && /Foarte frumos/.test(txt), "recenzii: recenzia trimisă apare în listă (mod local)");
  ok(d.querySelector("#reviews .reviews-avg")?.textContent === "4.0", "recenzii: media notelor = 4.0");
}

/* -------- natura-loc.html id invalid -------- */
{
  const w = await load("natura-loc.html", "?id=nope");
  const d = w.document;
  ok(!w.__err, "natura-loc invalid: fără erori JS");
  ok(d.getElementById("detail-root").hidden === true, "natura-loc invalid: conținutul e ascuns");
  ok(d.getElementById("detail-notfound").hidden === false, "natura-loc invalid: mesajul 'nu există' e vizibil");
}

/* -------- afaceri.html + afacere.html (recenzii, altă secțiune) -------- */
{
  const biz = DATA[dataKeyOf("afaceri.html")];
  const w1 = await load("afaceri.html");
  ok(w1.document.querySelectorAll("#grid .card").length === biz.length, "afaceri: " + biz.length + " carduri (câte sunt în data.js)");

  // o afacere reală, cu recenzii activate
  const b = biz.find((e) => e.hasReviews);
  ok(!!b, "afaceri: există cel puțin o afacere cu recenzii");
  const w2 = await load("afacere.html", "?id=" + encodeURIComponent(b.id));
  const d2 = w2.document;
  ok(!w2.__err, "afacere: fără erori JS" + (w2.__err ? " — " + w2.__err : ""));
  ok((d2.querySelector("#detail-title")?.textContent || "") === b.name, "afacere: titlu randat (" + b.name + ")");
  ok(!!d2.querySelector("#reviews .review-form"), "afacere: motorul de recenzii funcționează și aici (reutilizat)");
}

/* -------- restul secțiunilor: randare fără erori + numărul corect de carduri -------- */
{
  const pairs = ["turism-activ.html", "mostenire.html", "orase.html", "stiri.html"]
    .map((f) => [f, DATA[dataKeyOf(f)].length]);
  for (const [file, count] of pairs) {
    const w = await load(file);
    ok(!w.__err, file + ": fără erori JS" + (w.__err ? " — " + w.__err : ""));
    ok(w.document.querySelectorAll("#grid .card").length === count, file + ": " + count + " card(uri) randate");
  }
  // pentru fiecare pagină de detaliu: prima intrare din secțiunea ei (știrile se schimbă des)
  const details = ["activitate.html", "mostenire-articol.html", "oras.html", "stire.html"]
    .map((f) => [f, DATA[dataKeyOf(f)][0]]);
  for (const [file, entry] of details) {
    const w = await load(file, "?id=" + encodeURIComponent(entry.id));
    ok(!w.__err, file + ": fără erori JS" + (w.__err ? " — " + w.__err : ""));
    ok((w.document.querySelector("#detail-title")?.textContent || "") === entry.name, file + ": titlu randat corect (" + entry.id + ")");
  }
}

/* -------- oras.html?id=petrosani: secțiunea "Obiective din zonă" (relatedAreas) -------- */
{
  const w = await load("oras.html", "?id=petrosani");
  ok(!w.__err, "oras petrosani: fără erori JS" + (w.__err ? " — " + w.__err : ""));
  const rel = w.document.querySelector("#detail-related");
  ok(!!rel && !rel.hidden, "oras petrosani: #detail-related vizibil");
  const areas = byId("SITE_TOWNS", "petrosani").relatedAreas || [];
  const relItems = RELATED_KEYS.flatMap((k) => DATA[k].filter((e) => !e.example && areas.includes(e.area)));
  const relSeasons = uniq(relItems.map((e) => e.season || "tot-anul"));
  ok(relItems.length > 0 && rel.querySelectorAll(".card").length === relItems.length, "oras petrosani: " + relItems.length + " obiective din zonă");
  ok(rel.querySelectorAll(".related-group__title").length === relSeasons.length && relSeasons.length >= 2, "oras petrosani: grupate pe " + relSeasons.length + " sezoane");
}

/* -------- pagini statice -------- */
{
  for (const file of ["utile.html", "contact.html", "multumim.html", "404.html", "credite.html"]) {
    const w = await load(file);
    ok(!w.__err, file + ": fără erori JS" + (w.__err ? " — " + w.__err : ""));
  }
  const w = await load("credite.html");
  const counts = SECTION_KEYS.map((k) => DATA[k].length);
  const total = counts.reduce((a, b) => a + b, 0);
  ok(w.document.querySelectorAll(".credit-card").length === total, "credite: " + total + " intrări (" + counts.join("+") + ", toate secțiunile)");
}

/* -------- pagini statice generate: /<secțiune>/<id>/ (scripts/build-pages.mjs) -------- */
{
  const vm = await import("vm");
  const ctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, "js/data.js"), "utf8"), ctx);
  const DIRS = { SITE_DESTINATIONS: "destinatii", SITE_TOWNS: "orase", SITE_NATURE: "natura", SITE_ACTIVITIES: "turism-activ",
    SITE_HERITAGE: "mostenire", SITE_NEWS: "stiri", SITE_BUSINESSES: "afaceri" };
  const all = Object.entries(DIRS).flatMap(([k, dir]) => ctx.window[k].map((e) => ({ e, dir, file: dir + "/" + e.id + "/index.html" })));
  const missing = all.filter((x) => !fs.existsSync(path.join(ROOT, x.file)));
  ok(missing.length === 0, "generate: câte o pagină pentru fiecare din cele " + all.length + " intrări" + (missing.length ? " — lipsesc: " + missing.map((x) => x.file).join(", ") + " (rulează node scripts/build-pages.mjs)" : ""));
  const badHead = all.filter((x) => {
    if (!fs.existsSync(path.join(ROOT, x.file))) return false;
    const h = fs.readFileSync(path.join(ROOT, x.file), "utf8");
    const url = "https://gohd.ro/" + x.dir + "/" + x.e.id + "/";
    return !(h.includes('<link rel="canonical" href="' + url + '">') && h.includes('<meta property="og:url" content="' + url + '">') &&
      /<meta property="og:image" content="https:\/\/gohd\.ro\/images\/og\/[a-z0-9-]+\.jpg">/.test(h) &&
      /<meta name="description" content="[^"]{20,}">/.test(h) && !/noindex/.test(h) && h.includes('id: "' + x.e.id + '"'));
  });
  ok(badHead.length === 0, "generate: canonical + og:url/og:image + description + id în config pe toate" + (badHead.length ? " — greșite: " + badHead.map((x) => x.file).join(", ") : ""));
  const badImg = all.filter((x) => {
    const h = fs.existsSync(path.join(ROOT, x.file)) ? fs.readFileSync(path.join(ROOT, x.file), "utf8") : "";
    return [...h.matchAll(/(?:src|href)="(\/[^"]*\.(?:css|js|jpg|webp|svg))"/g)].some((m) => !fs.existsSync(path.join(ROOT, m[1])));
  });
  ok(badImg.length === 0, "generate: toate fișierele css/js/imagini referite există" + (badImg.length ? " — " + badImg.map((x) => x.file).join(", ") : ""));

  // randare în „browser”: pagina Petroșani (cu obiective din zonă) și una fără poză
  const w = await load("orase/petrosani/index.html", "", "orase/petrosani/");
  const d = w.document;
  ok(!w.__err, "generat /orase/petrosani/: fără erori JS" + (w.__err ? " — " + w.__err : ""));
  ok(/Petroșani/.test(d.querySelector("#detail-title").textContent) && d.title.startsWith("Petroșani"), "generat /orase/petrosani/: titlu + <title> corecte");
  const pAreas = byId("SITE_TOWNS", "petrosani").relatedAreas || [];
  const pRel = RELATED_KEYS.flatMap((k) => DATA[k].filter((e) => !e.example && pAreas.includes(e.area))).length;
  ok(pRel > 0 && d.querySelectorAll("#detail-related .card").length === pRel, "generat /orase/petrosani/: " + pRel + " obiective din zonă (pre-randate)");
  ok(d.querySelector("#detail-gallery img").getAttribute("srcset").includes(".webp 800w"), "generat /orase/petrosani/: poza principală are srcset webp");
  const roTag = d.querySelector("#detail-tagline").textContent;
  d.querySelector("#lang-toggle").dispatchEvent(new w.Event("click"));
  ok(d.querySelector("#detail-tagline").textContent !== roTag && d.querySelector("#detail-back").textContent === "← All towns", "generat /orase/petrosani/: comutatorul EN re-randează conținutul");
  ok(d.querySelector("#detail-back").getAttribute("href") === "/orase.html", "generat /orase/petrosani/: linkul înapoi e absolut");

  const nophoto = all.find((x) => x.e.images && x.e.images[0] === "images/placeholder.svg" && x.e.hasReviews);
  if (nophoto) {
    const w2 = await load(nophoto.file, "", nophoto.dir + "/" + nophoto.e.id + "/");
    ok(!w2.__err, "generat " + nophoto.file + " (fără poză, cu recenzii): fără erori JS" + (w2.__err ? " — " + w2.__err : ""));
    ok(!!w2.document.querySelector("#reviews .review-form"), "generat " + nophoto.file + ": formularul de recenzii e randat");
    ok(/og\/hunedoara-corvin-castle\.jpg/.test(fs.readFileSync(path.join(ROOT, nophoto.file), "utf8")), "generat " + nophoto.file + ": og:image implicit (fără poză proprie)");
  }

  // sitemap.xml: bine format, fiecare URL are fișier real
  const sm = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
  const doc = new JSDOM(sm, { contentType: "application/xml" }).window.document;
  ok(!doc.querySelector("parsererror"), "sitemap.xml: XML valid");
  const locs = [...doc.getElementsByTagName("loc")].map((n) => n.textContent);
  const toFile = (u) => { const p = u.replace("https://gohd.ro/", ""); return p === "" ? "index.html" : p.endsWith("/") ? p + "index.html" : p; };
  const deadLocs = locs.filter((u) => !fs.existsSync(path.join(ROOT, toFile(u))));
  ok(locs.length === all.length + 11 && deadLocs.length === 0, "sitemap.xml: " + locs.length + " URL-uri, toate cu fișier real" + (deadLocs.length ? " — lipsă: " + deadLocs.join(", ") : ""));
  ok(!locs.some((u) => /multumim|404|oras\.html|destinatie\.html/.test(u)), "sitemap.xml: fără multumim/404/șabloane");
  ok(/Sitemap: https:\/\/gohd\.ro\/sitemap\.xml/.test(fs.readFileSync(path.join(ROOT, "robots.txt"), "utf8")), "robots.txt: indică sitemap.xml");
}

/* -------- fișiere prezente -------- */
{
  const files = [
    "index.html", "destinatii.html", "destinatie.html",
    "natura.html", "natura-loc.html", "turism-activ.html", "activitate.html",
    "mostenire.html", "mostenire-articol.html", "orase.html", "oras.html",
    "stiri.html", "stire.html", "afaceri.html", "afacere.html",
    "utile.html", "contact.html", "multumim.html", "credite.html", "404.html",
    "netlify.toml", "README.md", "SETUP.md", "css/style.css", "supabase/schema.sql",
    "netlify/functions/submit-review.mjs", "images/placeholder.svg",
    "js/config.js", "js/data.js", "js/i18n.js", "js/common.js", "js/reviews.js",
    "js/listing.js", "js/detail.js", "js/home.js", "js/credits.js", "js/images.js",
    "scripts/build-pages.mjs", "scripts/build-images.mjs", "sitemap.xml", "robots.txt"
  ];
  const missing = files.filter((f) => !fs.existsSync(path.join(ROOT, f)));
  ok(missing.length === 0, "toate fișierele există" + (missing.length ? ": lipsesc " + missing.join(", ") : ""));
}

console.log(`\n${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
