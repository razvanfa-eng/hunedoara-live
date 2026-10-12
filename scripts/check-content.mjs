/* Verificări de conținut (rulează: node scripts/check-content.mjs):
 *  - știri/evenimente al căror text indică o dată deja trecută (de revizuit sau de scos);
 *  - intrări fără poză (folosesc placeholder);
 *  - intrări cu program/preț/telefon lipsă în afaceri;
 *  - pagini fără meta description sau cu description prea scurtă/lungă.
 * Doar raportează (cod de ieșire 0), ca să nu blocheze un deploy; ținem lista la zi manual. */
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ctx = { console }; ctx.window = ctx; vm.createContext(ctx);
for (const f of ["js/data.js", "js/evenimente-data.js"]) vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx);
const today = new Date().toISOString().slice(0, 10);
const KEYS = ["SITE_DESTINATIONS", "SITE_TOWNS", "SITE_NATURE", "SITE_ACTIVITIES", "SITE_HERITAGE", "SITE_BUSINESSES", "SITE_NEWS"];

console.log("== Evenimente încheiate (din evenimente.ics; build-pages le scoate din știri dacă le ștergi din data.js) ==");
const ics = fs.readFileSync(path.join(ROOT, "evenimente.ics"), "utf8");
let ended = 0;
for (const ev of ics.split("BEGIN:VEVENT").slice(1)) {
  const uid = (ev.match(/UID:([^@\r\n]+)/) || [])[1];
  const end = (ev.match(/DTEND;VALUE=DATE:(\d{8})/) || [])[1];
  if (!uid || !end) continue;
  const iso = end.slice(0, 4) + "-" + end.slice(4, 6) + "-" + end.slice(6, 8);
  if (iso <= today) { ended++; console.log("  s-a încheiat " + iso + "  " + uid); }
}
if (!ended) console.log("  niciun eveniment încheiat");

console.log("== Intrări fără poză reală ==");
const noPic = [];
for (const k of KEYS) for (const e of ctx[k] || []) if (!e.images || !e.images.length) noPic.push(k.replace("SITE_", "") + "/" + e.id);
console.log("  " + noPic.length + " intrări" + (noPic.length ? ": " + noPic.join(", ") : ""));

console.log("== Afaceri fără contact (telefon/e-mail/site în fapte) ==");
const noContact = (ctx.SITE_BUSINESSES || []).filter((b) => {
  const facts = JSON.stringify((b.ro || {}).facts || []);
  return !/tel|@|www|\.ro|\.com/i.test(facts);
}).map((b) => b.id);
console.log("  " + noContact.length + (noContact.length ? ": " + noContact.join(", ") : ""));

console.log("== Meta description (pagini generate) ==");
let bad = 0;
(function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    if (["node_modules", ".git", "vendor", "supabase", "netlify", "test", "scripts"].includes(f.name)) continue;
    const p = path.join(d, f.name);
    if (f.isDirectory()) { walk(p); continue; }
    if (!p.endsWith(".html")) continue;
    const h = fs.readFileSync(p, "utf8");
    if (h.includes("noindex")) continue;
    const m = h.match(/<meta name="description" content="([^"]*)"/);
    const len = m ? m[1].length : 0;
    if (len < 50 || len > 170) { bad++; if (bad <= 15) console.log("  " + path.relative(ROOT, p).split(path.sep).join("/") + " (" + len + " caractere)"); }
  }
})(ROOT);
console.log("  " + bad + " pagini cu description în afara 50–170 caractere");
