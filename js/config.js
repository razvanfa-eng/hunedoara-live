/*
 * Configurare site / Site configuration.
 * =====================================================================
 * Aici se schimbă TOT ce ține de setări, fără să atingi restul codului.
 * Everything configurable lives here.
 */
window.SITE_CONFIG = {

  /* Numele site-ului (apare în header și în <title>). Bilingv. */
  siteName: {
    ro: "Hunedoara Live",
    en: "Hunedoara Live"
  },
  /* Subtitlu scurt pe prima pagină. */
  tagline: {
    ro: "Locuri, orașe, activități, istorie și afaceri din tot județul Hunedoara — la zi.",
    en: "Places, towns, activities, history and businesses across Hunedoara county — up to date."
  },

  /* -------------------------------------------------------------------
   * RECENZII
   * provider:
   *   "local"  -> recenziile se salvează în browserul vizitatorului
   *               (localStorage). Bun pentru dezvoltare / probe.
   *               NU sunt partajate între vizitatori.
   *   "remote" -> recenziile se citesc din Supabase și se trimit prin
   *               funcția Netlify (cu verificare captcha + moderare).
   *               Vezi SETUP.md pentru pași.
   * ------------------------------------------------------------------- */
  reviews: {
    provider: "local",

    // completează după ce creezi proiectul Supabase (SETUP.md)
    supabaseUrl: "",            // ex: https://abcdefgh.supabase.co
    supabaseAnonKey: "",        // cheia "anon public" din Supabase

    // endpointul funcției care primește recenzia (rulează pe Netlify)
    submitEndpoint: "/.netlify/functions/submit-review",

    // Cloudflare Turnstile (captcha) — cheia publică "site key"
    turnstileSiteKey: "",

    // câmpuri active în formular
    allowPhoto: true,           // vizitatorul poate atașa o poză
    requireCaptcha: true,       // cere captcha înainte de trimitere (doar în modul "remote")
    moderated: true             // recenziile apar doar după aprobarea ta
  }
};
