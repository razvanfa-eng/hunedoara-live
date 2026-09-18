/* Test headless (jsdom): randare, motor generic de listare/detaliu, recenzii (mod local). */
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(DIR, "..");
let pass = 0, fail = 0;
const ok = (c, m) => { (c ? pass++ : fail++); console.log((c ? "  ok  " : " FAIL ") + m); };

function prep(html) {
  html = html.replace(/<head>/, `<head><script>window.addEventListener("error",e=>{window.__err=(window.__err||"")+String(e.message||e.error)+" | ";});</script>`);
  html = html.replace(/<link[^>]+href="https?:\/\/[^"]*"[^>]*>/g, "");
  html = html.replace(/<script[^>]+src="https?:\/\/[^"]*"[^>]*><\/script>/g, "");
  html = html.replace(/<script src="(js\/[^"]+)"><\/script>/g, (_, src) =>
    "<script>\n" + fs.readFileSync(path.join(ROOT, src), "utf8") + "\n</script>");
  return html;
}
function load(file, query = "") {
  const dom = new JSDOM(prep(fs.readFileSync(path.join(ROOT, file), "utf8")), {
    runScripts: "dangerously", pretendToBeVisual: true,
    url: "http://localhost:5175/" + file + query
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
  ok(d.querySelectorAll("#home-news .news-item").length === 2, "index: 2 știri randate (conținut real)");
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
  ok(d1.querySelectorAll("#grid .card").length === 4, "destinatii: 4 carduri (conținut real)");
  ok([...d1.querySelectorAll("#grid .card")].every((a) => /^destinatie\.html\?id=[a-z-]+$/.test(a.getAttribute("href"))), "destinatii: href-uri carduri valide");

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
  ok(d1.querySelectorAll("#grid .card").length === 10, "natura: 10 carduri (conținut real)");
  ok(d1.querySelectorAll("#f-area option").length === 1 + 6, "natura: filtru zonă = 6 + Toate");

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
  const w1 = await load("afaceri.html");
  ok(w1.document.querySelectorAll("#grid .card").length === 33, "afaceri: 33 carduri");

  const w2 = await load("afacere.html", "?id=exemplu-restaurant-local");
  const d2 = w2.document;
  ok(!w2.__err, "afacere: fără erori JS" + (w2.__err ? " — " + w2.__err : ""));
  ok(/Restaurant/.test(d2.querySelector("#detail-title")?.textContent || ""), "afacere: titlu randat");
  ok(!!d2.querySelector("#reviews .review-form"), "afacere: motorul de recenzii funcționează și aici (reutilizat)");
}

/* -------- restul secțiunilor: randare fără erori + numărul corect de carduri -------- */
{
  const pairs = [
    ["turism-activ.html", 39], ["mostenire.html", 4], ["orase.html", 6], ["stiri.html", 2]
  ];
  for (const [file, count] of pairs) {
    const w = await load(file);
    ok(!w.__err, file + ": fără erori JS" + (w.__err ? " — " + w.__err : ""));
    ok(w.document.querySelectorAll("#grid .card").length === count, file + ": " + count + " card(uri) randate");
  }
  const details = [
    ["activitate.html", "traseu-pietrele-bucura-peleaga", "Pietrele"],
    ["mostenire-articol.html", "sarmizegetusa-regia", "Sarmizegetusa"],
    ["oras.html", "petrosani", "Petroșani"],
    ["stire.html", "istorie-natura-cultura-costesti-2026", "Costești"]
  ];
  for (const [file, id, needle] of details) {
    const w = await load(file, "?id=" + id);
    ok(!w.__err, file + ": fără erori JS" + (w.__err ? " — " + w.__err : ""));
    ok(new RegExp(needle, "i").test(w.document.querySelector("#detail-title")?.textContent || ""), file + ": titlu randat corect");
  }
}

/* -------- oras.html?id=petrosani: secțiunea "Obiective din zonă" (relatedAreas) -------- */
{
  const w = await load("oras.html", "?id=petrosani");
  ok(!w.__err, "oras petrosani: fără erori JS" + (w.__err ? " — " + w.__err : ""));
  const rel = w.document.querySelector("#detail-related");
  ok(!!rel && !rel.hidden, "oras petrosani: #detail-related vizibil");
  ok(rel.querySelectorAll(".card").length === 18, "oras petrosani: 18 obiective din zonă");
  ok(rel.querySelectorAll(".related-group__title").length >= 3, "oras petrosani: grupate pe cel puțin 3 sezoane");
}

/* -------- pagini statice -------- */
{
  for (const file of ["utile.html", "contact.html", "404.html", "credite.html"]) {
    const w = await load(file);
    ok(!w.__err, file + ": fără erori JS" + (w.__err ? " — " + w.__err : ""));
  }
  const w = await load("credite.html");
  ok(w.document.querySelectorAll(".credit-card").length === 121, "credite: 121 intrări (6+14+39+17+9+3+33, toate secțiunile)");
}

/* -------- fișiere prezente -------- */
{
  const files = [
    "index.html", "destinatii.html", "destinatie.html",
    "natura.html", "natura-loc.html", "turism-activ.html", "activitate.html",
    "mostenire.html", "mostenire-articol.html", "orase.html", "oras.html",
    "stiri.html", "stire.html", "afaceri.html", "afacere.html",
    "utile.html", "contact.html", "credite.html", "404.html",
    "netlify.toml", "README.md", "SETUP.md", "css/style.css", "supabase/schema.sql",
    "netlify/functions/submit-review.mjs", "images/placeholder.svg",
    "js/config.js", "js/data.js", "js/i18n.js", "js/common.js", "js/reviews.js",
    "js/listing.js", "js/detail.js", "js/home.js", "js/credits.js"
  ];
  const missing = files.filter((f) => !fs.existsSync(path.join(ROOT, f)));
  ok(missing.length === 0, "toate fișierele există" + (missing.length ? ": lipsesc " + missing.join(", ") : ""));
}

console.log(`\n${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
