/*
 * Funcție Netlify — primește o recenzie, verifică captcha (Cloudflare
 * Turnstile), încarcă opțional poza în Supabase Storage și inserează
 * rândul cu status = "pending" (moderare). Funcționează pentru orice
 * intrare din site (loc sau afacere) — identificată prin placeId.
 *
 * Variabile de mediu necesare (Netlify -> Site settings -> Environment):
 *   SUPABASE_URL                 https://xxxx.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY    cheia "service_role" (SECRETĂ — doar aici)
 *   TURNSTILE_SECRET_KEY         secret key de la Cloudflare Turnstile
 *                                (obligatorie pe Netlify: dacă lipsește, recenziile
 *                                sunt refuzate; doar sub `netlify dev` poate lipsi)
 *
 * Bucket Storage (public) așteptat:  review-photos
 *
 * Securitate:
 *   - doar POST cu JSON, doar de pe același domeniu (Origin / Sec-Fetch-Site);
 *   - câmpuri validate (tipuri, lungimi, rating întreg 1..5, placeId = slug);
 *   - poza: max. 3 MB, tipul verificat și după conținut (semnătura fișierului);
 *   - capcană anti-spam (câmpul ascuns "website") + limită simplă pe IP;
 *   - erorile interne (Supabase etc.) merg în logurile funcției, nu la client.
 */

const MAX_BODY = 4.5 * 1024 * 1024;          // JSON-ul cu poza (3 MB) în base64 + text
const MAX_IMAGE = 3 * 1024 * 1024;
const PLACE_ID_RE = /^[a-z0-9][a-z0-9-]{0,119}$/;
const ALLOWED_ORIGINS = ["https://gohd.ro", "https://www.gohd.ro"];

// limită best-effort pe instanța funcției (nu e globală, dar oprește rafalele simple)
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map();
function rateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > RATE_MAX;
}

const json = (obj, status = 200, extra = {}) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store", "x-content-type-options": "nosniff", ...extra }
  });

// același domeniu ca site-ul (gohd.ro, deploy preview-uri, `netlify dev` pe localhost)
function sameOrigin(req) {
  const origin = req.headers.get("origin");
  const site = req.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return false;
  if (!origin) return true;                       // clienți fără Origin (nu browsere) -> decide captcha
  let self = "";
  try { self = new URL(req.url).origin; } catch { /* ignoră */ }
  return origin === self || ALLOWED_ORIGINS.includes(origin);
}

const str = (v) => (typeof v === "string" ? v : v == null ? "" : null);
// fără caractere de control (în afară de tab / rând nou), fără spații la capete
const clean = (s) => s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();

function imageMatches(bytes, type) {
  if (type === "image/png") return bytes.length > 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  if (type === "image/jpeg" || type === "image/jpg") return bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (type === "image/webp") return bytes.length > 12 && bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP";
  return false;
}

export default async (req, context) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405, { allow: "POST" });
  if (!sameOrigin(req)) return json({ error: "Forbidden" }, 403);
  if (!/^application\/json\b/i.test(req.headers.get("content-type") || "")) {
    return json({ error: "Unsupported content type" }, 415);
  }
  const len = Number(req.headers.get("content-length") || 0);
  if (len > MAX_BODY) return json({ error: "Payload too large" }, 413);

  const ip = (context && context.ip) || req.headers.get("x-nf-client-connection-ip") || "";
  if (rateLimited(ip)) return json({ error: "Too many requests" }, 429, { "retry-after": "600" });

  let p;
  try { p = await req.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
  if (!p || typeof p !== "object" || Array.isArray(p)) return json({ error: "Invalid JSON" }, 400);

  // capcană anti-spam: un om nu vede câmpul "website"; un robot îl completează.
  // Răspundem „ok”, ca robotul să nu afle, dar nu salvăm nimic.
  if (str(p.website)) return json({ ok: true, moderated: true });

  const fields = [p.placeId, p.name, p.title, p.body, p.token, p.imageBase64, p.imageType].map(str);
  if (fields.some((f) => f === null)) return json({ error: "Missing or invalid fields" }, 400);
  let [placeId, name, title, body, token, imageBase64, imageType] = fields;
  placeId = placeId.trim(); name = clean(name); title = clean(title); body = clean(body);
  const rating = Number(p.rating);

  if (!PLACE_ID_RE.test(placeId) || !name || !body || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return json({ error: "Missing or invalid fields" }, 400);
  }
  if (name.length > 80 || title.length > 120 || body.length > 4000) {
    return json({ error: "Field too long" }, 400);
  }

  // --- Captcha (Cloudflare Turnstile) — obligatoriu, în afară de `netlify dev` ---
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    if (!token || token.length > 2048) return json({ error: "Captcha failed" }, 400);
    const form = new URLSearchParams({ secret: turnstileSecret, response: token });
    if (ip) form.set("remoteip", ip);
    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: form
    }).then((r) => r.json()).catch(() => ({ success: false }));
    if (!verify.success) return json({ error: "Captcha failed" }, 400);
  } else if (process.env.NETLIFY_DEV !== "true") {
    console.error("submit-review: TURNSTILE_SECRET_KEY lipsește — recenzie refuzată");
    return json({ error: "Server not configured" }, 503);
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SERVICE_KEY) return json({ error: "Server not configured" }, 503);
  const base = SUPABASE_URL.replace(/\/$/, "");

  // --- Poză opțională -> Supabase Storage ---
  let image_url = null;
  if (imageBase64 && /^image\/(png|jpe?g|webp)$/.test(imageType)) {
    try {
      if (imageBase64.length <= Math.ceil(MAX_IMAGE / 3) * 4 + 4) {
        const bytes = Buffer.from(imageBase64, "base64");
        if (bytes.length > 0 && bytes.length <= MAX_IMAGE && imageMatches(bytes, imageType)) {
          const ext = imageType === "image/png" ? "png" : imageType === "image/webp" ? "webp" : "jpg";
          const ctype = ext === "jpg" ? "image/jpeg" : imageType;
          const objPath = `review-photos/${Date.now()}-${crypto.randomUUID()}.${ext}`;
          const up = await fetch(`${base}/storage/v1/object/${objPath}`, {
            method: "POST",
            headers: {
              authorization: `Bearer ${SERVICE_KEY}`,
              apikey: SERVICE_KEY,
              "content-type": ctype,
              "x-upsert": "false"
            },
            body: bytes
          });
          if (up.ok) image_url = `${base}/storage/v1/object/public/${objPath}`;
          else console.error("submit-review: încărcarea pozei a eșuat", up.status);
        }
      }
    } catch (e) { console.error("submit-review: poză", e && e.message); /* salvează recenzia oricum */ }
  }

  // --- Inserare rând (moderare: status pending) ---
  let ins;
  try {
    ins = await fetch(`${base}/rest/v1/reviews`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${SERVICE_KEY}`,
        apikey: SERVICE_KEY,
        "content-type": "application/json",
        prefer: "return=minimal"
      },
      body: JSON.stringify({
        place_id: placeId,
        rating,
        author_name: name,
        title: title || null,
        body,
        image_url,
        status: "pending"
      })
    });
  } catch (e) {
    console.error("submit-review: Supabase indisponibil", e && e.message);
    return json({ error: "Could not save review" }, 502);
  }

  if (!ins.ok) {
    // detaliile erorii rămân în logurile funcției (Netlify), nu ajung la client
    const detail = await ins.text().catch(() => "");
    console.error("submit-review: inserarea a eșuat", ins.status, detail.slice(0, 300));
    return json({ error: "Could not save review" }, 502);
  }
  return json({ ok: true, moderated: true });
};
