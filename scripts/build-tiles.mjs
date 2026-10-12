/* Variante mici (560 px, WebP q62) pentru pozele de fundal ale tile-urilor de pe prima pagină:
 * images/tile/<nume>.webp. Tile-urile sunt sub „Locuri emblematice” și au max. ~560 px lățime,
 * deci varianta de 800 px (~90 KB fiecare) doar încetinea poza LCP pe mobil.
 * Lista pozelor vine din SECTIONS din js/home.js (câmpul img). Rulat automat de build-pages.mjs. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "images", "tile");

export async function buildTiles() {
  const home = fs.readFileSync(path.join(ROOT, "js", "home.js"), "utf8");
  const files = [...new Set([...home.matchAll(/img: "images\/([^"\/]+)\.jpe?g"/g)].map((m) => m[1]))];
  let sharp = null, made = 0;
  fs.mkdirSync(OUT, { recursive: true });
  for (const base of files) {
    const src = ["jpg", "jpeg"].map((e) => path.join(ROOT, "images", base + "." + e)).find((p) => fs.existsSync(p));
    if (!src) throw new Error("Tile: lipsește images/" + base + ".jpg");
    const dest = path.join(OUT, base + ".webp");
    if (fs.existsSync(dest) && fs.statSync(dest).mtimeMs >= fs.statSync(src).mtimeMs) continue;
    if (!sharp) sharp = (await import("sharp")).default;
    await sharp(src).rotate().resize({ width: 560, withoutEnlargement: true }).webp({ quality: 62, effort: 6 }).toFile(dest);
    made++;
  }
  // variante orfane (poza nu mai e folosită în tile-uri)
  for (const f of fs.readdirSync(OUT)) if (!files.includes(f.replace(/\.webp$/, ""))) fs.unlinkSync(path.join(OUT, f));
  return made;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log("tile-uri generate: " + (await buildTiles()));
}
