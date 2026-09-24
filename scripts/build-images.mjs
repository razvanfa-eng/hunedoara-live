/*
 * Generează variantele optimizate ale pozelor din images/ (rulat automat de
 * scripts/build-pages.mjs, dar se poate rula și separat):
 *
 *   images/800/<nume>.webp    ~800 px lățime  (carduri, mobil)
 *   images/1600/<nume>.webp   ~1600 px lățime (pagina de detaliu pe desktop)
 *   images/og/<nume>.jpg      1200×630, decupaj centrat pe subiect — og:image
 *                             pentru Facebook / previzualizări de link
 *   js/images.js              manifestul cu dimensiunile originale
 *                             (window.SITE_IMAGES), folosit de js/common.js
 *                             pentru srcset + width/height
 *
 * Originalele .jpg rămân neatinse (fallback + sursa pentru variante).
 * Se procesează doar pozele noi sau modificate, deci rularea repetată e rapidă.
 * Are nevoie de `sharp` (devDependency: `npm i`) DOAR când există poze noi.
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMG = path.join(ROOT, "images");
const MANIFEST = path.join(ROOT, "js", "images.js");
export const OG_W = 1200, OG_H = 630;

function readManifest() {
  if (!fs.existsSync(MANIFEST)) return {};
  const ctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(MANIFEST, "utf8"), ctx);
  return ctx.window.SITE_IMAGES || {};
}

function outputsFor(file, w) {
  const base = file.replace(/\.jpe?g$/i, "");
  const outs = [path.join(IMG, "800", base + ".webp"), path.join(IMG, "og", base + ".jpg")];
  if (w > 800) outs.push(path.join(IMG, "1600", base + ".webp"));
  return outs;
}

function upToDate(src, outs) {
  const t = fs.statSync(src).mtimeMs;
  return outs.every((o) => fs.existsSync(o) && fs.statSync(o).mtimeMs >= t);
}

export async function buildImages({ quiet = false } = {}) {
  const log = quiet ? () => {} : console.log;
  const old = readManifest();
  const files = fs.readdirSync(IMG).filter((f) => /\.jpe?g$/i.test(f)).sort();
  const manifest = {};
  let sharp = null, made = 0;

  for (const file of files) {
    const src = path.join(IMG, file);
    const key = "images/" + file;
    const prev = old[key];
    if (prev && upToDate(src, outputsFor(file, prev[0]))) { manifest[key] = prev; continue; }

    if (!sharp) {
      try { sharp = (await import("sharp")).default; }
      catch (e) {
        throw new Error("Poze noi/modificate în images/ (" + file + "), dar `sharp` nu e instalat. Rulează `npm i` și apoi din nou scriptul.");
      }
    }
    const meta = await sharp(src).rotate().metadata();
    // după .rotate() (EXIF), lățimea/înălțimea pot fi inversate
    const swap = meta.orientation && meta.orientation >= 5;
    const w = swap ? meta.height : meta.width, h = swap ? meta.width : meta.height;
    const base = file.replace(/\.jpe?g$/i, "");
    for (const dir of ["800", "1600", "og"]) fs.mkdirSync(path.join(IMG, dir), { recursive: true });

    await sharp(src).rotate().resize({ width: Math.min(w, 800), withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 }).toFile(path.join(IMG, "800", base + ".webp"));
    if (w > 800) {
      await sharp(src).rotate().resize({ width: Math.min(w, 1600), withoutEnlargement: true })
        .webp({ quality: 76, effort: 5 }).toFile(path.join(IMG, "1600", base + ".webp"));
    }
    await sharp(src).rotate().resize(OG_W, OG_H, { fit: "cover", position: sharp.strategy.attention })
      .jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(IMG, "og", base + ".jpg"));

    manifest[key] = [w, h];
    made++;
    log("  imagine: " + file + " (" + w + "×" + h + ")");
  }

  // variante orfane (originalul a fost șters) — le scoatem
  for (const dir of ["800", "1600", "og"]) {
    const d = path.join(IMG, dir);
    if (!fs.existsSync(d)) continue;
    for (const f of fs.readdirSync(d)) {
      const base = f.replace(/\.(webp|jpe?g)$/i, "");
      if (!manifest["images/" + base + ".jpg"] && !manifest["images/" + base + ".jpeg"]) {
        fs.unlinkSync(path.join(d, f));
        log("  șters (orfan): images/" + dir + "/" + f);
      }
    }
  }

  const body = Object.keys(manifest).sort()
    .map((k) => "  " + JSON.stringify(k) + ": [" + manifest[k].join(", ") + "]").join(",\n");
  const out =
    "/* GENERAT AUTOMAT de scripts/build-images.mjs — nu edita manual.\n" +
    " * Dimensiunile originale [lățime, înălțime] ale pozelor din images/.\n" +
    " * Variante: images/800/<nume>.webp, images/1600/<nume>.webp (doar dacă lățimea > 800),\n" +
    " * images/og/<nume>.jpg (1200×630, pentru og:image). */\n" +
    "window.SITE_IMAGES = {\n" + body + "\n};\n";
  const prevText = fs.existsSync(MANIFEST) ? fs.readFileSync(MANIFEST, "utf8") : "";
  if (prevText !== out) fs.writeFileSync(MANIFEST, out);
  log("Imagini: " + files.length + " originale, " + made + " (re)generate.");
  return manifest;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  buildImages().catch((e) => { console.error(e.message || e); process.exit(1); });
}
