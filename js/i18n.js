/* Interfață bilingvă RO / EN. Limba se ține în localStorage. */
(function () {
  var STRINGS = {
    ro: {
      "nav.destinatii": "Destinații",
      "nav.orase": "Orașe",
      "nav.natura": "Natură",
      "nav.turismActiv": "Turism activ",
      "nav.mostenire": "Moștenire culturală",
      "nav.afaceri": "Afaceri",
      "nav.stiri": "Știri",
      "nav.utile": "Utile",
      "nav.contact": "Contact",
      "nav.ai": "Întreabă-ne",
      "nav.search.aria": "Căutare",
      "lang.switch": "EN",
      "lang.switch.aria": "Switch to English",

      "home.hero.eyebrow": "Ghidul digital al județului Hunedoara",
      "home.hero.cta.primary": "Explorează destinații",
      "home.hero.cta.secondary": "Vezi harta interactivă",
      "home.hero.apps.label": "Disponibil și ca aplicație",
      "home.stats.towns": "orașe și comune",
      "home.stats.places": "destinații & locuri",
      "home.stats.trails": "trasee montane",
      "home.stats.history": "de istorie și tradiție",
      "home.stats.history.value": "sute de ani",
      "home.explore.heading": "Explorează județul",
      "home.news.heading": "Ultimele știri",
      "home.news.cta": "Toate știrile",
      "home.news.empty": "Nicio știre publicată încă.",

      "sec.destinatii.name": "Destinații",
      "sec.destinatii.desc": "Zonele și regiunile turistice ale județului, dintr-o privire.",
      "sec.orase.name": "Orașe",
      "sec.orase.desc": "Deva, Hunedoara, Petroșani și celelalte orașe ale județului.",
      "sec.natura.name": "Natură",
      "sec.natura.desc": "Parcuri naționale, munți, peșteri și arii protejate.",
      "sec.turismActiv.name": "Turism activ",
      "sec.turismActiv.desc": "Drumeție, schi, alpinism, ciclism și aventură în aer liber.",
      "sec.mostenire.name": "Moștenire culturală",
      "sec.mostenire.desc": "Patrimoniu minier, cetăți dacice și tradiții locale.",
      "sec.afaceri.name": "Afaceri",
      "sec.afaceri.desc": "Restaurante, cazări, ghizi și servicii locale recomandate.",
      "sec.stiri.name": "Știri",
      "sec.stiri.desc": "Ce se întâmplă în județ — evenimente și noutăți.",
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

      "detail.back.destinatii": "← Toate destinațiile",
      "detail.back.orase": "← Toate orașele",
      "detail.back.natura": "← Toată natura",
      "detail.back.turismActiv": "← Tot turismul activ",
      "detail.back.mostenire": "← Toată moștenirea culturală",
      "detail.back.afaceri": "← Toate afacerile",
      "detail.back.stiri": "← Toate știrile",
      "detail.about": "Despre",
      "detail.facts": "Informații practice",
      "detail.getThere": "Navighează până acolo",
      "detail.waze": "Deschide în Waze",
      "detail.gmaps": "Direcții Google Maps",
      "detail.gmapsView": "Vezi pe Google Maps",
      "detail.gallery": "Galerie",
      "detail.notFound": "Rezultatul căutat nu există.",
      "detail.notFound.link": "← Înapoi",
      "detail.related": "Obiective din zonă",
      "season.primavara": "Primăvară",
      "season.vara": "Vară",
      "season.toamna": "Toamnă",
      "season.iarna": "Iarnă",
      "season.tot-anul": "Tot anul",

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
      "footer.apps.appstore": "App Store",
      "footer.apps.googleplay": "Google Play",
      "img.missing": "Imagine în curând",
      "credits.photo": "Foto",

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
      "nav.destinatii": "Destinations",
      "nav.orase": "Towns",
      "nav.natura": "Nature",
      "nav.turismActiv": "Active tourism",
      "nav.mostenire": "Cultural heritage",
      "nav.afaceri": "Businesses",
      "nav.stiri": "News",
      "nav.utile": "Useful",
      "nav.contact": "Contact",
      "nav.ai": "Ask us",
      "nav.search.aria": "Search",
      "lang.switch": "RO",
      "lang.switch.aria": "Comută pe română",

      "home.hero.eyebrow": "The digital guide to Hunedoara county",
      "home.hero.cta.primary": "Explore destinations",
      "home.hero.cta.secondary": "See the interactive map",
      "home.hero.apps.label": "Also available as an app",
      "home.stats.towns": "towns and communes",
      "home.stats.places": "destinations & places",
      "home.stats.trails": "mountain trails",
      "home.stats.history": "of history and tradition",
      "home.stats.history.value": "centuries",
      "home.explore.heading": "Explore the county",
      "home.news.heading": "Latest news",
      "home.news.cta": "All news",
      "home.news.empty": "No news published yet.",

      "sec.destinatii.name": "Destinations",
      "sec.destinatii.desc": "The county's tourist zones and regions, at a glance.",
      "sec.orase.name": "Towns",
      "sec.orase.desc": "Deva, Hunedoara, Petroșani and the county's other towns.",
      "sec.natura.name": "Nature",
      "sec.natura.desc": "National parks, mountains, caves and protected areas.",
      "sec.turismActiv.name": "Active tourism",
      "sec.turismActiv.desc": "Hiking, skiing, climbing, cycling and outdoor adventure.",
      "sec.mostenire.name": "Cultural heritage",
      "sec.mostenire.desc": "Mining heritage, Dacian fortresses and local traditions.",
      "sec.afaceri.name": "Businesses",
      "sec.afaceri.desc": "Recommended restaurants, stays, guides and local services.",
      "sec.stiri.name": "News",
      "sec.stiri.desc": "What's happening in the county — events and updates.",
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

      "detail.back.destinatii": "← All destinations",
      "detail.back.orase": "← All towns",
      "detail.back.natura": "← All of nature",
      "detail.back.turismActiv": "← All active tourism",
      "detail.back.mostenire": "← All cultural heritage",
      "detail.back.afaceri": "← All businesses",
      "detail.back.stiri": "← All news",
      "detail.about": "About",
      "detail.facts": "Practical information",
      "detail.getThere": "Navigate there",
      "detail.waze": "Open in Waze",
      "detail.gmaps": "Google Maps directions",
      "detail.gmapsView": "View on Google Maps",
      "detail.gallery": "Gallery",
      "detail.notFound": "That entry does not exist.",
      "detail.notFound.link": "← Back",
      "detail.related": "Nearby highlights",
      "season.primavara": "Spring",
      "season.vara": "Summer",
      "season.toamna": "Autumn",
      "season.iarna": "Winter",
      "season.tot-anul": "All year",

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
      "footer.apps.appstore": "App Store",
      "footer.apps.googleplay": "Google Play",
      "img.missing": "Image coming soon",
      "credits.photo": "Photo",

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
