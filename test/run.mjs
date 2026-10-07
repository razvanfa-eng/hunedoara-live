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
const dataKeyOf = (file) => (fs.readFileSync(path.join(ROOT, file), "utf8").match(/"?dataKey"?:\s*"([A-Z_]+)"/) || [])[1];
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
  html = html.replace(/<script src="\/?(js\/[^"?]+)(?:\?[^"]*)?"><\/script>/g, (_, src) =>
    "<script>\n" + fs.readFileSync(path.join(ROOT, src), "utf8") + "\n</script>");
  return html;
}
// pref: preferința de limbă salvată deja în localStorage ("ro" / "en") la încărcare
function load(file, query = "", urlPath = file, pref = null) {
  const dom = new JSDOM(prep(fs.readFileSync(path.join(ROOT, file), "utf8")), {
    runScripts: "dangerously", pretendToBeVisual: true,
    url: "http://localhost:5175/" + urlPath + query,
    beforeParse(w) { if (pref) w.localStorage.setItem("hl-lang", pref); }
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
  const lt = d.querySelector("#lang-toggle");
  ok(lt.tagName === "A" && lt.getAttribute("href") === "/en/" && lt.getAttribute("hreflang") === "en", "index: comutatorul de limbă e link spre /en/");
  const we = await load("en/index.html", "", "en/");
  const de = we.document;
  ok(!we.__err, "en/index: fără erori JS" + (we.__err ? " — " + we.__err : ""));
  ok(de.querySelector(".hero h1").textContent === before, "index: numele site-ului nu se traduce (Hunedoara Live rămâne la fel)");
  ok(de.documentElement.getAttribute("data-lang") === "en", "en/index: pagina /en/ e randată în engleză (data-lang)");
  ok([...de.querySelectorAll("#explore-grid .tile")].every((a) => /^\/en\/[a-z-]+\.html$/.test(a.getAttribute("href"))) &&
    [...de.querySelectorAll("#home-highlights .card, #home-news .news-item")].every((a) => /^\/en\/[a-z-]+\/[a-z0-9-]+\/$/.test(a.getAttribute("href"))),
    "en/index: tile-urile, reperele și știrile leagă spre paginile /en/");
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
      /<meta name="description" content="[^"]{20,}">/.test(h) && !/noindex/.test(h) && h.includes('"id":"' + x.e.id + '"'));
  });
  ok(badHead.length === 0, "generate: canonical + og:url/og:image + description + id în config pe toate" + (badHead.length ? " — greșite: " + badHead.map((x) => x.file).join(", ") : ""));
  const badImg = all.filter((x) => {
    const h = fs.existsSync(path.join(ROOT, x.file)) ? fs.readFileSync(path.join(ROOT, x.file), "utf8") : "";
    return [...h.matchAll(/(?:src|href)="(\/[^"]*\.(?:css|js|jpg|webp|svg))"/g)].some((m) => !fs.existsSync(path.join(ROOT, m[1])));
  });
  ok(badImg.length === 0, "generate: toate fișierele css/js/imagini referite există" + (badImg.length ? " — " + badImg.map((x) => x.file).join(", ") : ""));

  // date structurate (JSON-LD): exact un bloc valid, cu entitatea paginii + breadcrumb
  const ldOf = (file) => {
    const h = fs.readFileSync(path.join(ROOT, file), "utf8");
    const m = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    if (m.length !== 1) return null;
    try { return JSON.parse(m[0][1]); } catch (e) { return null; }
  };
  const badLd = all.filter((x) => {
    const ld = x.file && fs.existsSync(path.join(ROOT, x.file)) && ldOf(x.file);
    if (!ld || ld["@context"] !== "https://schema.org" || !Array.isArray(ld["@graph"])) return true;
    const [main, crumbs] = ld["@graph"];
    const url = "https://gohd.ro/" + x.dir + "/" + x.e.id + "/";
    return !main || !main["@type"] || main.name !== x.e.name || main.url !== url ||
      !crumbs || crumbs["@type"] !== "BreadcrumbList" || crumbs.itemListElement.length !== 3 || crumbs.itemListElement[2].item !== url ||
      (main.sameAs && /booking|facebook|@/.test(main.sameAs));
  });
  ok(badLd.length === 0, "generate: JSON-LD valid (entitate + breadcrumb) pe toate paginile" + (badLd.length ? " — greșite: " + badLd.map((x) => x.file).join(", ") : ""));
  const ldTypes = new Set(all.map((x) => { const ld = ldOf(x.file); return ld && ld["@graph"][0]["@type"]; }));
  ok(["City", "Hotel", "Restaurant", "LodgingBusiness", "TouristAttraction", "Event", "NewsArticle"].every((ty) => ldTypes.has(ty)), "generate: JSON-LD folosește tipurile potrivite (" + [...ldTypes].join(", ") + ")");
  const homeLd = ldOf("index.html");
  ok(!!homeLd && homeLd["@graph"].some((n) => n["@type"] === "WebSite") && homeLd["@graph"].some((n) => n["@type"] === "Organization"), "index.html: JSON-LD WebSite + Organization");

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
  ok(d.querySelector("#lang-toggle").getAttribute("href") === "/en/orase/petrosani/", "generat /orase/petrosani/: comutatorul EN duce la /en/orase/petrosani/");
  ok(d.querySelector("#detail-back").getAttribute("href") === "/orase.html", "generat /orase/petrosani/: linkul înapoi e absolut");
  const we = await load("en/orase/petrosani/index.html", "", "en/orase/petrosani/");
  const de = we.document;
  ok(!we.__err, "generat /en/orase/petrosani/: fără erori JS" + (we.__err ? " — " + we.__err : ""));
  ok(de.querySelector("#detail-tagline").textContent !== roTag && de.querySelector("#detail-back").textContent === "← All towns and communes" &&
    de.querySelector("#detail-back").getAttribute("href") === "/en/orase.html", "generat /en/orase/petrosani/: conținut EN, înapoi spre /en/orase.html");
  ok(de.querySelectorAll("#detail-related .card").length === pRel &&
    [...de.querySelectorAll("#detail-related .card")].every((a) => a.getAttribute("href").startsWith("/en/")), "generat /en/orase/petrosani/: obiectivele din zonă leagă spre /en/");

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
  ok(locs.length === 2 * (all.length + 11) && deadLocs.length === 0, "sitemap.xml: " + locs.length + " URL-uri (RO + EN), toate cu fișier real" + (deadLocs.length ? " — lipsă: " + deadLocs.join(", ") : ""));
  ok(!locs.some((u) => /multumim|404|oras\.html|destinatie\.html/.test(u)), "sitemap.xml: fără multumim/404/șabloane");
  ok(/Sitemap: https:\/\/gohd\.ro\/sitemap\.xml/.test(fs.readFileSync(path.join(ROOT, "robots.txt"), "utf8")), "robots.txt: indică sitemap.xml");
}

/* -------- versiunea în engleză: /en/... + hreflang + comutatorul de limbă -------- */
{
  const SITE = "https://gohd.ro";
  const DIRS = { SITE_DESTINATIONS: "destinatii", SITE_TOWNS: "orase", SITE_NATURE: "natura", SITE_ACTIVITIES: "turism-activ",
    SITE_HERITAGE: "mostenire", SITE_NEWS: "stiri", SITE_BUSINESSES: "afaceri" };
  const LISTINGS = Object.values(DIRS).map((d) => d + ".html");
  const htmlEsc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const readF = (f) => fs.existsSync(path.join(ROOT, f)) ? fs.readFileSync(path.join(ROOT, f), "utf8") : "";
  // perechile RO <-> EN: [cale RO, fișier RO, fișier EN]
  const entryPairs = Object.entries(DIRS).flatMap(([k, dir]) => DATA[k].map((e) => ({ k, e, ro: "/" + dir + "/" + e.id + "/" })));
  const topPairs = ["index.html", ...LISTINGS, "utile.html", "contact.html", "credite.html"]
    .map((f) => ({ ro: f === "index.html" ? "/" : "/" + f, roFile: f, enFile: "en/" + f }));
  const pairs = [
    ...topPairs,
    ...entryPairs.map((x) => ({ ro: x.ro, roFile: x.ro.slice(1) + "index.html", enFile: "en" + x.ro + "index.html", x }))
  ].map((p) => ({ ...p, en: "/en" + p.ro }));

  // câte o pagină EN pentru fiecare intrare, în fiecare secțiune
  for (const [k, dir] of Object.entries(DIRS)) {
    const missing = DATA[k].filter((e) => !fs.existsSync(path.join(ROOT, "en", dir, e.id, "index.html")));
    ok(missing.length === 0, "en: /en/" + dir + "/<id>/ există pentru toate cele " + DATA[k].length + " intrări" + (missing.length ? " — lipsesc: " + missing.map((e) => e.id).join(", ") : ""));
  }
  const missingTop = topPairs.filter((p) => !fs.existsSync(path.join(ROOT, p.enFile)));
  ok(missingTop.length === 0 && fs.existsSync(path.join(ROOT, "en/multumim.html")), "en: paginile principale au versiune EN (" + (topPairs.length + 1) + ")" + (missingTop.length ? " — lipsesc: " + missingTop.map((p) => p.enFile).join(", ") : ""));

  // <html lang="en">, canonical spre ea însăși, og:locale, hreflang reciproc (ro, en, x-default = RO)
  const links = (h, lang) => [
    '<link rel="alternate" hreflang="ro" href="' + SITE + lang.ro + '">',
    '<link rel="alternate" hreflang="en" href="' + SITE + lang.en + '">',
    '<link rel="alternate" hreflang="x-default" href="' + SITE + lang.ro + '">'
  ].every((l) => h.includes(l));
  const badLang = pairs.filter((p) => !/<html lang="en" data-page-lang="en">/.test(readF(p.enFile)) || !/<html lang="ro" data-page-lang="ro">/.test(readF(p.roFile)));
  ok(badLang.length === 0, "en: toate paginile EN au <html lang=\"en\">, perechile RO au lang=\"ro\" (" + pairs.length + " perechi)" + (badLang.length ? " — greșite: " + badLang.map((p) => p.enFile).join(", ") : ""));
  const badHreflang = pairs.filter((p) => {
    const ro = readF(p.roFile), en = readF(p.enFile);
    return !links(ro, p) || !links(en, p) ||
      !ro.includes('<link rel="canonical" href="' + SITE + p.ro + '">') || !en.includes('<link rel="canonical" href="' + SITE + p.en + '">') ||
      !en.includes('<meta property="og:url" content="' + SITE + p.en + '">') || !en.includes('<meta property="og:locale" content="en_GB">');
  });
  ok(badHreflang.length === 0, "en: hreflang ro/en/x-default reciproc + canonical propriu + og:locale pe ambele versiuni" + (badHreflang.length ? " — greșite: " + badHreflang.slice(0, 5).map((p) => p.ro).join(", ") : ""));
  ok(!/hreflang/.test(readF("natura-loc.html")) && !/hreflang/.test(readF("404.html")), "en: paginile fără pereche (șabloane, 404) nu au hreflang");

  // title / description / JSON-LD în engleză
  const badText = entryPairs.filter(({ k, e, ro }) => {
    const h = readF("en" + ro + "index.html");
    const desc = (h.match(/<meta name="description" content="([^"]*)">/) || [])[1] || "";
    const ld = JSON.parse((h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) || [, "{}"])[1]);
    const g = ld["@graph"] || [];
    const page = g.find((n) => n["@type"] === "WebPage");
    const crumbs = g.find((n) => n["@type"] === "BreadcrumbList");
    return !h.includes("<title>" + htmlEsc(e.name) + " — Hunedoara Live</title>") ||
      !desc.startsWith(htmlEsc(e.en.tagline).slice(0, 30)) ||
      !h.includes('id="detail-tagline">' + htmlEsc(e.en.tagline) + "</p>") ||
      !page || page.inLanguage !== "en" || page.url !== SITE + "/en" + ro ||
      g[0].description !== desc.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&") ||
      !crumbs || crumbs.itemListElement[0].item !== SITE + "/en/" || crumbs.itemListElement[0].name !== "Home" ||
      !crumbs.itemListElement[1].item.startsWith(SITE + "/en/");
  });
  ok(badText.length === 0, "en: <title>, description, conținut și JSON-LD (inLanguage, breadcrumb /en/) în engleză pe toate intrările" + (badText.length ? " — greșite: " + badText.slice(0, 5).map((x) => x.ro).join(", ") : ""));
  const enHome = readF("en/index.html");
  ok(/<meta property="og:title" content="Hunedoara Live — the digital guide/.test(enHome) && /"inLanguage":"en"/.test(enHome) &&
    /<h2 id="highlights-h" data-i18n="home.highlights.heading">[A-Za-z ]+<\/h2>/.test(enHome), "en/index.html: titlu OG, JSON-LD și textele statice în engleză");

  // linkurile interne din paginile EN duc spre paginile EN (în afară de comutatorul de limbă)
  const roPathRe = new RegExp('href="/(?:|index\\.html|(?:' + [...LISTINGS, "utile.html", "contact.html", "credite.html", "multumim.html"].join("|").replace(/\./g, "\\.") +
    ')|(?:' + Object.values(DIRS).join("|") + ')/[^"/]+/)"');
  const badLinks = pairs.filter((p) => {
    const h = readF(p.enFile).replace(/<a id="lang-toggle"[^>]*>/, "");
    return roPathRe.test(h);
  });
  ok(badLinks.length === 0, "en: linkurile interne (meniu, breadcrumb, înapoi, carduri) din paginile EN duc spre /en/" + (badLinks.length ? " — greșite: " + badLinks.slice(0, 5).map((p) => p.enFile).join(", ") : ""));
  ok(readF("en/contact.html").includes('action="/en/multumim.html"'), "en/contact.html: formularul trimite spre /en/multumim.html");

  // comutatorul de limbă: link spre pagina pereche pe ambele versiuni
  const toggleOf = (h) => (h.match(/<a id="lang-toggle" class="lang-toggle" href="([^"]*)" hreflang="(ro|en)"/) || []).slice(1);
  const badToggle = pairs.filter((p) => {
    const [roHref, roHl] = toggleOf(readF(p.roFile)), [enHref, enHl] = toggleOf(readF(p.enFile));
    return roHref !== p.en || roHl !== "en" || enHref !== p.ro || enHl !== "ro";
  });
  ok(badToggle.length === 0, "en: comutatorul de limbă leagă fiecare pagină de perechea ei (RO -> /en/..., EN -> RO)" + (badToggle.length ? " — greșite: " + badToggle.slice(0, 5).map((p) => p.ro).join(", ") : ""));

  // în browser: o pagină /en/ rămâne în engleză chiar dacă preferința salvată e RO (și invers)
  const ex = entryPairs.find((x) => x.k === "SITE_NATURE").e;
  const w1 = await load("en/natura/" + ex.id + "/index.html", "", "en/natura/" + ex.id + "/", "ro");
  ok(!w1.__err && w1.I18N.lang === "en" && w1.document.documentElement.getAttribute("data-lang") === "en" &&
    w1.document.querySelector("#detail-tagline").textContent === ex.en.tagline && w1.document.querySelector("#lang-toggle").textContent === "RO",
    "en: /en/natura/" + ex.id + "/ e afișată în engleză deși preferința salvată e RO");
  ok(w1.localStorage.getItem("hl-lang") === "en", "en: vizitarea unei pagini /en/ salvează preferința EN");
  let went = null;
  w1.I18N.navigate = (u) => { went = u; };
  w1.I18N.toggle();
  ok(went === "/natura/" + ex.id + "/" && w1.localStorage.getItem("hl-lang") === "ro", "en: comutatorul de pe pagina EN duce la URL-ul RO pereche și salvează RO");
  const w2 = await load("natura/" + ex.id + "/index.html", "", "natura/" + ex.id + "/", "en");
  ok(!w2.__err && w2.I18N.lang === "ro" && w2.document.querySelector("#detail-tagline").textContent === ex.ro.tagline, "en: pagina RO rămâne în română deși preferința salvată e EN");
  went = null;
  w2.I18N.navigate = (u) => { went = u; };
  w2.document.querySelector("#lang-toggle").dispatchEvent(new w2.Event("click"));
  ok(w2.localStorage.getItem("hl-lang") === "en", "en: click pe comutatorul RO salvează preferința EN (browserul urmează linkul)");
  w2.I18N.toggle();
  ok(went === "/en/natura/" + ex.id + "/", "en: I18N.toggle() pe pagina RO duce la /en/natura/" + ex.id + "/");
  // listarea EN: carduri spre /en/<secțiune>/<id>/
  const w3 = await load("en/natura.html", "", "en/natura.html");
  ok(!w3.__err && w3.document.querySelectorAll("#grid .card").length === DATA.SITE_NATURE.length &&
    [...w3.document.querySelectorAll("#grid .card")].every((a) => /^\/en\/natura\/[a-z0-9-]+\/$/.test(a.getAttribute("href"))), "en/natura.html: cardurile leagă spre /en/natura/<id>/");
  // pagină fără pereche (șablon cu ?id=): comutatorul schimbă în continuare limba pe loc
  const w4 = await load("natura-loc.html", "?id=" + ex.id);
  w4.document.querySelector("#lang-toggle").dispatchEvent(new w4.Event("click"));
  ok(w4.document.querySelector("#lang-toggle").tagName === "BUTTON" && w4.document.documentElement.getAttribute("data-lang") === "en" &&
    w4.document.querySelector("#detail-tagline").textContent === ex.en.tagline && w4.document.querySelector("#detail-back").getAttribute("href") === "/en/natura.html",
    "en: pe paginile fără pereche (natura-loc.html?id=) comutatorul schimbă limba pe loc, ca înainte");

  // sitemap.xml: URL-urile EN + xhtml:link hreflang pentru fiecare pereche
  const sm = readF("sitemap.xml");
  const doc = new JSDOM(sm, { contentType: "application/xml" }).window.document;
  ok(doc.documentElement.getAttribute("xmlns:xhtml") === "http://www.w3.org/1999/xhtml", "sitemap.xml: declară namespace-ul xmlns:xhtml");
  const urlEls = [...doc.getElementsByTagName("url")];
  const byLoc = new Map(urlEls.map((u) => [u.getElementsByTagName("loc")[0].textContent,
    [...u.getElementsByTagName("xhtml:link")].map((l) => l.getAttribute("hreflang") + "=" + l.getAttribute("href")).sort().join(" ")]));
  const expAlt = (p) => ["en=" + SITE + p.en, "ro=" + SITE + p.ro, "x-default=" + SITE + p.ro].sort().join(" ");
  const badSm = pairs.filter((p) => byLoc.get(SITE + p.ro) !== expAlt(p) || byLoc.get(SITE + p.en) !== expAlt(p));
  ok(badSm.length === 0, "sitemap.xml: toate cele " + pairs.length + " perechi au URL RO + EN, fiecare cu xhtml:link ro/en/x-default" + (badSm.length ? " — greșite: " + badSm.slice(0, 5).map((p) => p.ro).join(", ") : ""));
  ok([...byLoc.keys()].filter((u) => u.startsWith(SITE + "/en/")).length === pairs.length, "sitemap.xml: " + pairs.length + " URL-uri EN");

  // netlify.toml: știrile EN dispărute -> listarea EN, înainte de regula 404
  const toml = readF("netlify.toml").replace(/\r/g, "");
  const iEn = toml.indexOf('from = "/en/stiri/*"\n  to = "/en/stiri.html"\n  status = 301'), i404 = toml.indexOf('from = "/*"');
  ok(iEn > 0 && iEn < i404, "netlify.toml: /en/stiri/* -> /en/stiri.html (301), înainte de regula 404");
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
    "scripts/build-pages.mjs", "scripts/build-images.mjs", "sitemap.xml", "robots.txt",
    "manifest.webmanifest", "sw.js", "offline.html", "icons/apple-touch-icon.png", "icons/favicon.svg"
  ];
  const missing = files.filter((f) => !fs.existsSync(path.join(ROOT, f)));
  ok(missing.length === 0, "toate fișierele există" + (missing.length ? ": lipsesc " + missing.join(", ") : ""));
}

/* -------- PWA: manifest, etichete în <head>, buton de instalare, service worker -------- */
{
  let man = null;
  try { man = JSON.parse(fs.readFileSync(path.join(ROOT, "manifest.webmanifest"), "utf8")); } catch (e) {}
  ok(!!man, "pwa: manifest.webmanifest e JSON valid");
  ok(man && man.name === "Hunedoara Live" && man.start_url === "/" && man.display === "standalone" &&
    /^#0e7c86$/i.test(man.theme_color) && /^#fff(fff)?$/i.test(man.background_color) && man.lang === "ro",
    "pwa: manifest are name, start_url, display, culori, lang");
  const icons = (man && man.icons) || [];
  ok(["192x192", "512x512"].every((sz) => icons.some((i) => i.sizes === sz && /any/.test(i.purpose || "any"))) &&
    icons.some((i) => /maskable/.test(i.purpose || "")), "pwa: iconițe 192 + 512 + maskable");
  ok(icons.every((i) => fs.existsSync(path.join(ROOT, i.src.replace(/^\//, "")))), "pwa: fișierele iconițelor există");

  const pages = fs.readdirSync(ROOT, { recursive: true }).map((f) => String(f).split(path.sep).join("/"))
    .filter((f) => f.endsWith(".html") && !f.startsWith("node_modules/") && !f.startsWith(".git/"));
  const noHead = pages.filter((f) => {
    const h = fs.readFileSync(path.join(ROOT, f), "utf8");
    return !/<link rel="manifest" href="\/manifest\.webmanifest">/.test(h) || !/<meta name="theme-color"/.test(h) ||
      !/<link rel="apple-touch-icon"/.test(h);
  });
  ok(noHead.length === 0, "pwa: toate paginile (" + pages.length + ") au manifest, theme-color, apple-touch-icon" + (noHead.length ? " — lipsesc în " + noHead.join(", ") : ""));

  const w = await load("index.html");
  const d = w.document;
  ok(!/App Store|Google Play|În curând/.test(d.body.textContent), "pwa: index nu mai promite App Store / Google Play");
  const boxes = [...d.querySelectorAll("[data-pwa-install]")];
  ok(boxes.length >= 1 && boxes.every((b) => b.hidden), "pwa: butonul „Instalează aplicația” e ascuns până când browserul permite instalarea");
  const ev = new w.Event("beforeinstallprompt", { cancelable: true });
  let prompted = 0;
  ev.prompt = () => { prompted++; return Promise.resolve(); };
  ev.userChoice = Promise.resolve({ outcome: "accepted" });
  w.dispatchEvent(ev);
  ok(boxes.every((b) => !b.hidden) && ev.defaultPrevented, "pwa: beforeinstallprompt arată butonul");
  d.querySelector("[data-pwa-install-btn]").dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  ok(prompted === 1, "pwa: click pe buton deschide dialogul de instalare");
  const wEn = await load("en/index.html", "", "en/");
  ok(wEn.document.querySelector("[data-pwa-install-btn] [data-i18n]").textContent === "Install the app", "pwa: textul butonului e tradus (EN)");

  // service worker rulat într-un mediu simulat (cache + rețea false)
  const ORIGIN = "https://gohd.ro";
  const stores = new Map();
  const keyOf = (r, ignoreSearch) => { const u = new URL(typeof r === "string" ? r : r.url, ORIGIN); if (ignoreSearch) u.search = ""; return u.href; };
  const mkCache = () => {
    const m = new Map();
    return {
      match: async (r, o) => { if (!(o && o.ignoreSearch)) return m.get(keyOf(r)); for (const [k, v] of m) if (keyOf(k, true) === keyOf(r, true)) return v; },
      put: async (r, res) => { m.set(keyOf(r), res); }, keys: async () => [...m.keys()], delete: async (k) => m.delete(keyOf(k))
    };
  };
  const caches = {
    open: async (n) => { if (!stores.has(n)) stores.set(n, mkCache()); return stores.get(n); },
    match: async (r, o) => { for (const c of stores.values()) { const hit = await c.match(r, o); if (hit) return hit; } },
    keys: async () => [...stores.keys()], delete: async (n) => stores.delete(n)
  };
  let online = true, fetched = [];
  const fetchMock = async (r) => {
    fetched.push(typeof r === "string" ? r : r.url);
    if (!online) throw new TypeError("offline");
    const res = new Response("net:" + new URL(typeof r === "string" ? r : r.url, ORIGIN).pathname, { status: 200 });
    Object.defineProperty(res, "type", { value: "basic" });
    return res;
  };
  const handlers = {};
  const swSelf = { location: new URL(ORIGIN + "/sw.js"), addEventListener: (t, fn) => { handlers[t] = fn; },
    skipWaiting: async () => {}, clients: { claim: async () => {} } };
  const ctx = { self: swSelf, caches, fetch: fetchMock, URL, Response, Promise, Request: function (u, o) { return Object.assign({ url: new URL(u, ORIGIN).href, method: "GET" }, o); }, console };
  vm.createContext(ctx);
  let swOk = true;
  try { vm.runInContext(fs.readFileSync(path.join(ROOT, "sw.js"), "utf8"), ctx); } catch (e) { swOk = false; }
  ok(swOk && handlers.install && handlers.activate && handlers.fetch, "pwa: sw.js se încarcă și ascultă install/activate/fetch");
  const fire = async (req) => {
    let p = null;
    handlers.fetch({ request: Object.assign({ method: "GET", mode: "cors", destination: "" }, req), respondWith: (x) => { p = x; } });
    return p ? await p : null;
  };
  // install: precache (inclusiv offline.html)
  let waits = [];
  handlers.install({ waitUntil: (x) => waits.push(x) });
  await Promise.all(waits);
  ok(!!(await caches.match(ORIGIN + "/offline.html")) && !!(await caches.match(ORIGIN + "/js/data.js")), "pwa: la instalare se salvează offline.html și resursele de bază");
  ok(!!(await caches.match(ORIGIN + "/en/")), "pwa: la instalare se salvează și prima pagină EN (/en/)");

  ok((await fire({ url: ORIGIN + "/contact.html", method: "POST", mode: "navigate" })) === null, "pwa: cererile POST (Netlify Forms) nu trec prin service worker");
  ok((await fire({ url: ORIGIN + "/.netlify/functions/submit-review" })) === null &&
    (await fire({ url: ORIGIN + "/.netlify/functions/reviews?id=x", mode: "navigate" })) === null &&
    (await fire({ url: ORIGIN + "/.netlify/functions/x.js" })) === null, "pwa: /.netlify/functions nu trece prin service worker");
  ok((await fire({ url: "https://fonts.googleapis.com/css2?family=Inter" })) === null, "pwa: cererile către alte domenii nu sunt interceptate");

  fetched = [];
  const r1 = await fire({ url: ORIGIN + "/stire.html?id=abc", mode: "navigate", destination: "document" });
  ok(r1 && (await r1.text()) === "net:/stire.html" && fetched.length === 1, "pwa: paginile HTML vin întâi din rețea (network-first)");
  online = false;
  const r2 = await fire({ url: ORIGIN + "/stire.html?id=alt-id", mode: "navigate", destination: "document" });
  ok(r2 && (await r2.text()) === "net:/stire.html", "pwa: offline, o pagină de detaliu deja vizitată se deschide din cache (alt ?id=)");
  const r3 = await fire({ url: ORIGIN + "/pagina-nevizitata.html", mode: "navigate", destination: "document" });
  ok(r3 && (await r3.text()) === "net:/offline.html", "pwa: offline, o pagină nevizitată afișează offline.html");
  online = true;
  await fire({ url: ORIGIN + "/en/natura/x/", mode: "navigate", destination: "document" });
  await new Promise((r) => setTimeout(r, 10));
  online = false;
  const rEn = await fire({ url: ORIGIN + "/en/natura/x/", mode: "navigate", destination: "document" });
  ok(rEn && (await rEn.text()) === "net:/en/natura/x/", "pwa: offline, o pagină EN deja vizitată se deschide din cache");
  const r4 = await fire({ url: ORIGIN + "/css/style.css", destination: "style" });
  ok(r4 && (await r4.text()) === "net:/css/style.css", "pwa: CSS servit din cache când nu e rețea");
  const r5 = await fire({ url: ORIGIN + "/images/nu-exista.jpg", destination: "image" });
  ok(r5 && (await r5.text()) === "net:/images/placeholder.svg", "pwa: imagine lipsă offline -> placeholder");
}

/* -------- securitate: CSP (netlify.toml) vs. paginile reale -------- */
{
  const { createHash } = await import("crypto");
  const toml = fs.readFileSync(path.join(ROOT, "netlify.toml"), "utf8");
  const csp = (toml.match(/Content-Security-Policy = "([^"]+)"/) || [])[1] || "";
  const scriptSrc = (csp.match(/script-src ([^;]+)/) || [])[1] || "";
  ok(!!csp && !/'unsafe-inline'|'unsafe-eval'/.test(scriptSrc), "csp: script-src fără 'unsafe-inline' / 'unsafe-eval'");
  const htmlFiles = [];
  (function walk(dir) {
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      if (f.name === "node_modules" || f.name.startsWith(".")) continue;
      const p = path.join(dir, f.name);
      if (f.isDirectory()) walk(p); else if (f.name.endsWith(".html")) htmlFiles.push(p);
    }
  })(ROOT);
  // <script> fără src și fără un type de date (JSON / JSON-LD) = cod inline -> blocat de CSP
  const inline = htmlFiles.filter((f) => /<script(?![^>]*\bsrc=)(?![^>]*type="application\/(?:ld\+)?json")[^>]*>/.test(fs.readFileSync(f, "utf8")));
  ok(inline.length === 0, "csp: nicio pagină nu are <script> inline executabil" + (inline.length ? " — " + inline.slice(0, 5).map((f) => path.relative(ROOT, f)).join(", ") : ""));
  // fiecare handler inline (onerror=..., onclick=...) din pagini și din JS are hash-ul în CSP
  const sources = [...htmlFiles, ...fs.readdirSync(path.join(ROOT, "js")).map((f) => path.join(ROOT, "js", f))];
  const handlers = new Set();
  for (const f of sources) for (const m of fs.readFileSync(f, "utf8").matchAll(/\son[a-z]+="([^"]*)"/g)) handlers.add(m[1]);
  const missing = [...handlers].filter((h) => !scriptSrc.includes("'sha256-" + createHash("sha256").update(h).digest("base64") + "'"));
  ok(handlers.size > 0 && missing.length === 0, "csp: hash pentru fiecare handler inline (" + handlers.size + ")" + (missing.length ? " — lipsesc: " + missing.join(" | ") : ""));
  const blocked = ["/package.json", "/README.md", "/SETUP.md", "/serve.js", "/scripts/*", "/test/*", "/supabase/*", "/netlify/*"];
  const notBlocked = blocked.filter((p) => !new RegExp('from = "' + p.replace(/[.*]/g, "\\$&") + '"\\s+to = "/404.html"\\s+status = 404\\s+force = true').test(toml));
  ok(notBlocked.length === 0, "securitate: fișierele proiectului (surse, teste, configurări) răspund 404" + (notBlocked.length ? " — lipsesc: " + notBlocked.join(", ") : ""));
}

console.log(`\n${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
