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
  ok(d.querySelector("#home-stats .stat__value").textContent === "1" || d.querySelector("#home-stats .stat__value").textContent === "2",
    "index: statisticile sunt numere reale (nu placeholder)");
  ok(d.querySelectorAll("#explore-grid .tile").length === 8, "index: 8 module în grid-ul de explorare");
  ok([...d.querySelectorAll("#explore-grid .tile")].every(a => /\.html$/.test(a.getAttribute("href"))), "index: toate tile-urile leagă spre o pagină");
  ok(d.querySelectorAll("#home-news .news-item").length === 1, "index: 1 știre randată (exemplu)");
  const before = d.querySelector(".hero h1").textContent;
  d.querySelector("#lang-toggle").dispatchEvent(new w.Event("click"));
  ok(d.querySelector(".hero h1").textContent === before, "index: numele site-ului nu se traduce (Hunedoara Live rămâne la fel)");
  ok(d.documentElement.getAttribute("data-lang") === "en", "index: comutatorul de limbă schimbă data-lang");
}

/* -------- locuri.html (listare + filtre) -------- */
{
  const w = await load("locuri.html");
  const d = w.document;
  ok(!w.__err, "locuri: fără erori JS" + (w.__err ? " — " + w.__err : ""));
  ok(d.querySelectorAll("#grid .card").length === 2, "locuri: 2 carduri (exemple)");
  ok([...d.querySelectorAll("#grid .card")].every(a => /^loc\.html\?id=[a-z-]+$/.test(a.getAttribute("href"))), "locuri: href-uri carduri valide");
  ok(d.querySelectorAll("#f-area option").length === 1 + 2, "locuri: filtru zonă = 2 + Toate");
  const area = d.querySelector("#f-area"); area.value = "Orăștie"; area.dispatchEvent(new w.Event("change"));
  ok(d.querySelectorAll("#grid .card").length === 1, "locuri: filtru zonă=Orăștie -> 1 card");
  d.querySelector("#f-reset").dispatchEvent(new w.Event("click"));
  ok(d.querySelectorAll("#grid .card").length === 2, "locuri: reset -> 2 carduri");
}

/* -------- loc.html + recenzii (mod local) -------- */
{
  const w = await load("loc.html", "?id=exemplu-cascada-valea-jiului");
  const d = w.document;
  ok(!w.__err, "loc: fără erori JS" + (w.__err ? " — " + w.__err : ""));
  ok(/Cascadă/.test(d.querySelector("#detail-title")?.textContent || ""), "loc: titlu randat");
  ok(!d.getElementById("detail-notfound").hidden === false, "loc: blocul 'nu există' e ascuns");
  ok(!!d.querySelector("#detail-map a"), "loc: linkuri hartă (Waze/Maps) prezente pentru coordonate");
  ok(!!d.querySelector("#reviews .review-form"), "recenzii: formularul e randat");
  ok(!!d.querySelector("#reviews .rv-note"), "recenzii: nota 'mod de probă' vizibilă (provider local)");
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

/* -------- loc.html id invalid -------- */
{
  const w = await load("loc.html", "?id=nope");
  const d = w.document;
  ok(!w.__err, "loc invalid: fără erori JS");
  ok(d.getElementById("detail-root").hidden === true, "loc invalid: conținutul e ascuns");
  ok(d.getElementById("detail-notfound").hidden === false, "loc invalid: mesajul 'nu există' e vizibil");
}

/* -------- afaceri.html + afacere.html (recenzii, altă secțiune) -------- */
{
  const w1 = await load("afaceri.html");
  ok(w1.document.querySelectorAll("#grid .card").length === 2, "afaceri: 2 carduri (exemple)");

  const w2 = await load("afacere.html", "?id=exemplu-restaurant-local");
  const d2 = w2.document;
  ok(!w2.__err, "afacere: fără erori JS" + (w2.__err ? " — " + w2.__err : ""));
  ok(/Restaurant/.test(d2.querySelector("#detail-title")?.textContent || ""), "afacere: titlu randat");
  ok(!!d2.querySelector("#reviews .review-form"), "afacere: motorul de recenzii funcționează și aici (reutilizat)");
}

/* -------- restul secțiunilor: doar randare fără erori + numărul corect de carduri -------- */
{
  const pairs = [
    ["activitati.html", 1], ["istorie.html", 1], ["orase.html", 1], ["stiri.html", 1]
  ];
  for (const [file, count] of pairs) {
    const w = await load(file);
    ok(!w.__err, file + ": fără erori JS" + (w.__err ? " — " + w.__err : ""));
    ok(w.document.querySelectorAll("#grid .card").length === count, file + ": " + count + " card(uri) randate");
  }
  const details = [
    ["activitate.html", "exemplu-traseu-parang", "Traseu"],
    ["istorie-detaliu.html", "exemplu-patrimoniu-minier", "Patrimoniu"],
    ["oras.html", "exemplu-petrosani", "Petroșani"],
    ["stire.html", "exemplu-eveniment-local", "eveniment"]
  ];
  for (const [file, id, needle] of details) {
    const w = await load(file, "?id=" + id);
    ok(!w.__err, file + ": fără erori JS" + (w.__err ? " — " + w.__err : ""));
    ok(new RegExp(needle, "i").test(w.document.querySelector("#detail-title")?.textContent || ""), file + ": titlu randat corect");
  }
}

/* -------- stiri.html sortare descrescătoare -------- */
{
  const w = await load("stiri.html");
  const d = w.document;
  ok(d.querySelector("#result-count").textContent.indexOf("1") === 0, "stiri: numărătoarea de rezultate e randată");
}

/* -------- pagini statice -------- */
{
  for (const file of ["utile.html", "contact.html", "404.html", "credite.html"]) {
    const w = await load(file);
    ok(!w.__err, file + ": fără erori JS" + (w.__err ? " — " + w.__err : ""));
  }
  const w = await load("credite.html");
  ok(w.document.querySelectorAll(".credit-card").length === 8, "credite: 8 intrări (2+1+1+1+1+2, toate secțiunile)");
}

/* -------- fișiere prezente -------- */
{
  const files = [
    "index.html", "locuri.html", "loc.html", "activitati.html", "activitate.html",
    "istorie.html", "istorie-detaliu.html", "orase.html", "oras.html",
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
