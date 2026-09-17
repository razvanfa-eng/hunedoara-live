/* Interfață bilingvă RO / EN. Limba se ține în localStorage. */
(function () {
  var STRINGS = {
    ro: {
      "nav.home": "Acasă",
      "nav.locuri": "Locuri",
      "nav.activitati": "Activități",
      "nav.istorie": "Istorie",
      "nav.orase": "Orașe",
      "nav.stiri": "Știri",
      "nav.afaceri": "Afaceri",
      "nav.utile": "Utile",
      "nav.contact": "Contact",
      "lang.switch": "EN",
      "lang.switch.aria": "Switch to English",

      "home.hero.eyebrow": "Ghidul digital al județului Hunedoara",
      "home.hero.cta.primary": "Descoperă locuri",
      "home.hero.cta.secondary": "Ce e nou săptămâna asta",
      "home.stats.towns": "orașe și comune",
      "home.stats.places": "locuri de vizitat",
      "home.stats.trails": "trasee montane",
      "home.stats.history": "de istorie și tradiție",
      "home.stats.history.value": "sute de ani",
      "home.explore.heading": "Explorează județul",
      "home.news.heading": "Ultimele știri",
      "home.news.cta": "Toate știrile",
      "home.news.empty": "Nicio știre publicată încă.",

      "sec.locuri.name": "Locuri de vizitat",
      "sec.locuri.desc": "Cascade, peșteri, cetăți și vârfuri montane din tot județul.",
      "sec.activitati.name": "Activități & trasee",
      "sec.activitati.desc": "Trasee de drumeție, schi, alpinism și aventură în aer liber.",
      "sec.istorie.name": "Istorie & patrimoniu",
      "sec.istorie.desc": "Patrimoniu minier, cetăți dacice și moștenire austro-ungară.",
      "sec.orase.name": "Orașe",
      "sec.orase.desc": "Deva, Hunedoara, Petroșani și celelalte orașe ale județului.",
      "sec.stiri.name": "Știri locale",
      "sec.stiri.desc": "Ce se întâmplă în județ — evenimente, anunțuri și noutăți.",
      "sec.afaceri.name": "Afaceri",
      "sec.afaceri.desc": "Restaurante, cazări, ghizi și servicii locale recomandate.",
      "sec.utile.name": "Info utile",
      "sec.utile.desc": "Transport, hărți, contacte utile și informații practice.",
      "sec.contact.name": "Contact",
      "sec.contact.desc": "Scrie-ne, propune un loc sau raportează o informație greșită.",

      "filters.heading": "Caută și filtrează",
      "filters.search": "Caută după nume",
      "filters.search.placeholder": "ex. Petroșani, Deva, cetate…",
      "filters.category": "Categorie",
      "filters.area": "Zonă / localitate",
      "filters.all": "Toate",
      "filters.reset": "Resetează",
      "filters.count.one": "rezultat",
      "filters.count.many": "rezultate",
      "filters.none": "Niciun rezultat nu se potrivește cu filtrele alese.",

      "card.details": "Vezi detalii",
      "badge.example": "exemplu",

      "detail.back.locuri": "← Toate locurile",
      "detail.back.activitati": "← Toate activitățile",
      "detail.back.istorie": "← Toate poveștile",
      "detail.back.orase": "← Toate orașele",
      "detail.back.stiri": "← Toate știrile",
      "detail.back.afaceri": "← Toate afacerile",
      "detail.about": "Despre",
      "detail.facts": "Informații practice",
      "detail.getThere": "Navighează până acolo",
      "detail.waze": "Deschide în Waze",
      "detail.gmaps": "Direcții Google Maps",
      "detail.gmapsView": "Vezi pe Google Maps",
      "detail.gallery": "Galerie",
      "detail.notFound": "Rezultatul căutat nu există.",
      "detail.notFound.link": "← Înapoi",

      "reviews.heading": "Recenzii",
      "reviews.none": "Nicio recenzie încă. Fii primul!",
      "reviews.average": "Media notelor",
      "reviews.count.one": "recenzie",
      "reviews.count.many": "recenzii",
      "reviews.add": "Lasă o recenzie",
      "reviews.form.name": "Numele tău",
      "reviews.form.rating": "Nota ta",
      "reviews.form.title": "Titlu (opțional)",
      "reviews.form.body": "Recenzia ta",
      "reviews.form.photo": "Poză (opțional)",
      "reviews.form.submit": "Trimite recenzia",
      "reviews.form.sending": "Se trimite…",
      "reviews.form.required": "Completează numele, nota și textul.",
      "reviews.form.captcha": "Confirmă că nu ești robot.",
      "reviews.form.ok.moderated": "Mulțumim! Recenzia va apărea după ce este verificată.",
      "reviews.form.ok.live": "Mulțumim! Recenzia ta a fost publicată.",
      "reviews.form.error": "Nu s-a putut trimite recenzia. Încearcă din nou.",
      "reviews.local.note": "Modul de probă: recenziile se salvează doar în acest browser.",
      "reviews.report": "Raportează",

      "footer.tagline": "ghidul digital al județului Hunedoara",
      "footer.newsletter.heading": "Abonează-te la noutăți",
      "footer.newsletter.placeholder": "email@exemplu.ro",
      "footer.newsletter.cta": "Abonează",
      "footer.note": "Proiect independent, necomercial. Textele sunt originale; imaginile sunt încărcate de echipa site-ului.",
      "img.missing": "Imagine în curând",

      "utile.heading": "Informații utile",
      "utile.intro": "Transport, contacte și linkuri practice pentru vizitarea județului Hunedoara.",
      "contact.heading": "Contact",
      "contact.intro": "Ai o întrebare, o sugestie sau vrei să propui un loc? Scrie-ne.",
      "contact.form.name": "Numele tău",
      "contact.form.email": "Adresa ta de e-mail",
      "contact.form.subject": "Subiect",
      "contact.form.message": "Mesajul tău",
      "contact.form.submit": "Trimite mesajul"
    },
    en: {
      "nav.home": "Home",
      "nav.locuri": "Places",
      "nav.activitati": "Activities",
      "nav.istorie": "History",
      "nav.orase": "Towns",
      "nav.stiri": "News",
      "nav.afaceri": "Businesses",
      "nav.utile": "Useful",
      "nav.contact": "Contact",
      "lang.switch": "RO",
      "lang.switch.aria": "Comută pe română",

      "home.hero.eyebrow": "The digital guide to Hunedoara county",
      "home.hero.cta.primary": "Discover places",
      "home.hero.cta.secondary": "What's new this week",
      "home.stats.towns": "towns and communes",
      "home.stats.places": "places to visit",
      "home.stats.trails": "mountain trails",
      "home.stats.history": "of history and tradition",
      "home.stats.history.value": "centuries",
      "home.explore.heading": "Explore the county",
      "home.news.heading": "Latest news",
      "home.news.cta": "All news",
      "home.news.empty": "No news published yet.",

      "sec.locuri.name": "Places to visit",
      "sec.locuri.desc": "Waterfalls, caves, fortresses and mountain peaks across the county.",
      "sec.activitati.name": "Activities & trails",
      "sec.activitati.desc": "Hiking, skiing, climbing and outdoor adventure trails.",
      "sec.istorie.name": "History & heritage",
      "sec.istorie.desc": "Mining heritage, Dacian fortresses and Austro-Hungarian legacy.",
      "sec.orase.name": "Towns",
      "sec.orase.desc": "Deva, Hunedoara, Petroșani and the county's other towns.",
      "sec.stiri.name": "Local news",
      "sec.stiri.desc": "What's happening in the county — events, notices and updates.",
      "sec.afaceri.name": "Businesses",
      "sec.afaceri.desc": "Recommended restaurants, stays, guides and local services.",
      "sec.utile.name": "Useful info",
      "sec.utile.desc": "Transport, maps, useful contacts and practical information.",
      "sec.contact.name": "Contact",
      "sec.contact.desc": "Write to us, suggest a place or report a mistake.",

      "filters.heading": "Search and filter",
      "filters.search": "Search by name",
      "filters.search.placeholder": "e.g. Petroșani, Deva, fortress…",
      "filters.category": "Category",
      "filters.area": "Area / town",
      "filters.all": "All",
      "filters.reset": "Reset",
      "filters.count.one": "result",
      "filters.count.many": "results",
      "filters.none": "No result matches the chosen filters.",

      "card.details": "See details",
      "badge.example": "example",

      "detail.back.locuri": "← All places",
      "detail.back.activitati": "← All activities",
      "detail.back.istorie": "← All stories",
      "detail.back.orase": "← All towns",
      "detail.back.stiri": "← All news",
      "detail.back.afaceri": "← All businesses",
      "detail.about": "About",
      "detail.facts": "Practical information",
      "detail.getThere": "Navigate there",
      "detail.waze": "Open in Waze",
      "detail.gmaps": "Google Maps directions",
      "detail.gmapsView": "View on Google Maps",
      "detail.gallery": "Gallery",
      "detail.notFound": "That entry does not exist.",
      "detail.notFound.link": "← Back",

      "reviews.heading": "Reviews",
      "reviews.none": "No reviews yet. Be the first!",
      "reviews.average": "Average rating",
      "reviews.count.one": "review",
      "reviews.count.many": "reviews",
      "reviews.add": "Leave a review",
      "reviews.form.name": "Your name",
      "reviews.form.rating": "Your rating",
      "reviews.form.title": "Title (optional)",
      "reviews.form.body": "Your review",
      "reviews.form.photo": "Photo (optional)",
      "reviews.form.submit": "Submit review",
      "reviews.form.sending": "Sending…",
      "reviews.form.required": "Please fill in name, rating and text.",
      "reviews.form.captcha": "Please confirm you are not a robot.",
      "reviews.form.ok.moderated": "Thank you! Your review will appear once it is checked.",
      "reviews.form.ok.live": "Thank you! Your review is published.",
      "reviews.form.error": "Could not submit the review. Please try again.",
      "reviews.local.note": "Demo mode: reviews are stored only in this browser.",
      "reviews.report": "Report",

      "footer.tagline": "the digital guide to Hunedoara county",
      "footer.newsletter.heading": "Subscribe for updates",
      "footer.newsletter.placeholder": "email@example.com",
      "footer.newsletter.cta": "Subscribe",
      "footer.note": "Independent, non-commercial project. The texts are original; images are uploaded by the site team.",
      "img.missing": "Image coming soon",

      "utile.heading": "Useful information",
      "utile.intro": "Transport, contacts and practical links for visiting Hunedoara county.",
      "contact.heading": "Contact",
      "contact.intro": "Have a question, a suggestion, or want to propose a place? Write to us.",
      "contact.form.name": "Your name",
      "contact.form.email": "Your e-mail address",
      "contact.form.subject": "Subject",
      "contact.form.message": "Your message",
      "contact.form.submit": "Send message"
    }
  };

  // nume site + tagline din config (config.js se încarcă înaintea acestui fișier)
  try {
    var _n = window.SITE_CONFIG && window.SITE_CONFIG.siteName;
    if (_n) { STRINGS.ro["site.name"] = _n.ro; STRINGS.en["site.name"] = _n.en; }
    var _t = window.SITE_CONFIG && window.SITE_CONFIG.tagline;
    if (_t) { STRINGS.ro["site.tagline"] = _t.ro; STRINGS.en["site.tagline"] = _t.en; }
  } catch (e) {}

  var LANG_KEY = "hl-lang";

  function getLang() {
    var stored = null;
    try { stored = localStorage.getItem(LANG_KEY); } catch (e) {}
    return (stored === "ro" || stored === "en") ? stored : "ro";
  }
  function setLang(lang) {
    if (lang !== "ro" && lang !== "en") return;
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    applyLang(lang);
  }
  function t(key, lang) {
    lang = lang || getLang();
    var table = STRINGS[lang] || STRINGS.ro;
    return (key in table) ? table[key] : key;
  }
  function applyLang(lang) {
    lang = lang || getLang();
    document.documentElement.lang = lang;
    document.documentElement.setAttribute("data-lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"), lang);
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
        var bits = pair.split(":");
        if (bits.length === 2) el.setAttribute(bits[0].trim(), t(bits[1].trim(), lang));
      });
    });
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
  }

  window.I18N = {
    get lang() { return getLang(); },
    set: setLang,
    t: t,
    apply: applyLang,
    toggle: function () { setLang(getLang() === "ro" ? "en" : "ro"); }
  };

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(getLang());
    var btn = document.getElementById("lang-toggle");
    if (btn) btn.addEventListener("click", function () { window.I18N.toggle(); });
  });
})();
