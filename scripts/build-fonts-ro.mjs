/* Generează subseturile minuscule „ro” ale fonturilor (doar diacriticele românești Ă ă Ş ş Ș ș Ţ ţ Ț ț),
   preîncărcate în loc de latin-ext (85 KB + 18 KB) — latin-ext rămâne pentru restul caracterelor, fără preload.
   Necesită: npm i --no-save subset-font
   Rulare: node scripts/build-fonts-ro.mjs */
import fs from "node:fs";
import subsetFont from "subset-font";

const TEXT = "ĂăŞşȘșŢţȚț";
for (const name of ["dm-sans", "inter"]) {
  const src = fs.readFileSync(`fonts/${name}-latin-ext.woff2`);
  const out = await subsetFont(src, TEXT, { targetFormat: "woff2" });
  fs.writeFileSync(`fonts/${name}-ro.woff2`, out);
  console.log(name + "-ro.woff2", out.length, "bytes");
}
