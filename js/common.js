/* Funcții comune / Shared helpers. */
(function () {
  function wazeUrl(c) { return "https://www.waze.com/ul?ll=" + c[0] + "%2C" + c[1] + "&navigate=yes"; }
  function gmapsDirUrl(c) { return "https://www.google.com/maps/dir/?api=1&destination=" + c[0] + "%2C" + c[1]; }
  function gmapsViewUrl(c) { return "https://www.google.com/maps/search/?api=1&query=" + c[0] + "%2C" + c[1]; }

  // Toate cele 6 seturi de date au aceeași formă (vezi js/data.js).
  function dataArray(key) { return window[key] || []; }
  function entryById(key, id) {
    var l = dataArray(key);
    for (var i = 0; i < l.length; i++) if (l[i].id === id) return l[i];
    return null;
  }

  function loc(obj, lang) { return (obj && (obj[lang] || obj.ro)) || {}; }
  function categoryLabel(entry, lang) { return (entry.category && (entry.category[lang] || entry.category.ro)) || ""; }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // stele: rating 0..5 (poate fi zecimal pentru medie)
  function starsHtml(rating) {
    var full = Math.round(rating * 2) / 2;
    var out = "";
    for (var i = 1; i <= 5; i++) {
      if (full >= i) out += '<span class="star star--full">★</span>';
      else if (full >= i - 0.5) out += '<span class="star star--half">★</span>';
      else out += '<span class="star">★</span>';
    }
    return '<span class="stars" aria-hidden="true">' + out + '</span>';
  }

  /* ---------- URL-uri curate pentru intrări ----------
   * Fiecare intrare are o pagină statică proprie, generată de
   * scripts/build-pages.mjs: /<secțiune>/<id>/ (ex. /orase/deva/).
   * Paginile vechi (oras.html?id=deva) redirecționează 301 spre ele (netlify.toml). */
  var SECTIONS = {
    SITE_DESTINATIONS: { dir: "destinatii", listing: "destinatii.html", template: "destinatie.html" },
    SITE_TOWNS: { dir: "orase", listing: "orase.html", template: "oras.html" },
    SITE_NATURE: { dir: "natura", listing: "natura.html", template: "natura-loc.html" },
    SITE_ACTIVITIES: { dir: "turism-activ", listing: "turism-activ.html", template: "activitate.html" },
    SITE_HERITAGE: { dir: "mostenire", listing: "mostenire.html", template: "mostenire-articol.html" },
    SITE_NEWS: { dir: "stiri", listing: "stiri.html", template: "stire.html" },
    SITE_BUSINESSES: { dir: "afaceri", listing: "afaceri.html", template: "afacere.html" }
  };
  function entryUrl(key, id) {
    var s = SECTIONS[key];
    return s ? "/" + s.dir + "/" + encodeURIComponent(id) + "/" : "#";
  }

  /* ---------- Imagini optimizate ----------
   * Pentru fiecare images/<nume>.jpg există (generate de scripts/build-images.mjs):
   * images/800/<nume>.webp, images/1600/<nume>.webp (dacă originalul are > 800 px)
   * și images/og/<nume>.jpg; dimensiunile originale sunt în js/images.js. */
  var PLACEHOLDER = "/images/placeholder.svg";
  var SIZES = {
    card: "(max-width: 560px) calc(100vw - 48px), (max-width: 960px) calc(50vw - 32px), 280px",
    hero: "(max-width: 1160px) calc(100vw - 48px), 1112px"
  };
  function absUrl(src) { return /^(https?:)?\/\//.test(src) || src.charAt(0) === "/" ? src : "/" + src; }
  function imgInfo(src) {
    var m = src && window.SITE_IMAGES && window.SITE_IMAGES[src.replace(/^\//, "")];
    if (!m) return null;
    var base = src.replace(/^\/?images\//, "").replace(/\.jpe?g$/i, "");
    var w = m[0], h = m[1];
    var list = [{ url: "/images/800/" + base + ".webp", w: Math.min(w, 800) }];
    if (w > 800) list.push({ url: "/images/1600/" + base + ".webp", w: Math.min(w, 1600) });
    var big = list[list.length - 1];
    return { list: list, width: big.w, height: Math.round(h * big.w / w), base: base };
  }
  // URL-ul unei variante webp (ex. fundal CSS); fallback: originalul.
  function imgVariant(src, width) {
    var info = imgInfo(src);
    if (!info) return absUrl(src || PLACEHOLDER);
    // cea mai mică variantă cel puțin la fel de lată ca `width`, altfel cea mai mare
    for (var i = 0; i < info.list.length; i++) if (info.list[i].w >= width) return info.list[i].url;
    return info.list[info.list.length - 1].url;
  }
  /* <img> cu srcset webp + width/height (fără salt de layout).
   * opts: { sizes: "card" | "hero" | "<valoare sizes>", eager: bool, alt: text } */
  function imgHtml(src, opts) {
    opts = opts || {};
    src = src || PLACEHOLDER;
    var info = imgInfo(src);
    var attrs = ' alt="' + esc(opts.alt || "") + '"';
    if (info) {
      attrs = ' src="' + esc(absUrl(src)) + '"' +
        ' srcset="' + info.list.map(function (v) { return esc(v.url) + " " + v.w + "w"; }).join(", ") + '"' +
        ' sizes="' + esc(SIZES[opts.sizes] || opts.sizes || SIZES.card) + '"' +
        ' width="' + info.width + '" height="' + info.height + '"' + attrs;
    } else {
      attrs = ' src="' + esc(absUrl(src)) + '"' + attrs;
    }
    attrs += opts.eager ? ' fetchpriority="high"' : ' loading="lazy"';
    return "<img" + attrs + ' decoding="async" onerror="RL.imgError(this)">';
  }

  // 1) webp-ul lipsește -> încearcă originalul .jpg; 2) nici acesta -> placeholder
  function imgError(img) {
    if (img.hasAttribute("srcset")) {
      img.removeAttribute("srcset");
      img.removeAttribute("sizes");
      return;
    }
    if (img.dataset.fallback === "1") return;
    img.dataset.fallback = "1";
    img.src = PLACEHOLDER;
    img.classList.add("is-placeholder");
  }

  function qs(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  window.RL = {
    wazeUrl: wazeUrl, gmapsDirUrl: gmapsDirUrl, gmapsViewUrl: gmapsViewUrl,
    dataArray: dataArray, entryById: entryById,
    loc: loc, categoryLabel: categoryLabel, esc: esc, starsHtml: starsHtml, imgError: imgError,
    qs: qs,
    SECTIONS: SECTIONS, entryUrl: entryUrl,
    absUrl: absUrl, imgInfo: imgInfo, imgVariant: imgVariant, imgHtml: imgHtml
  };
})();

/* Aplicație instalabilă (PWA) / Installable app.
   - înregistrează service worker-ul (/sw.js) pe toate paginile care încarcă common.js;
   - butoanele [data-pwa-install-btn] (pe index.html): pe Android/Chrome/Edge folosesc
     evenimentul beforeinstallprompt; pe iPhone/iPad arată indicația „Partajează →
     Adaugă pe ecranul principal”; sunt ascunse dacă site-ul rulează deja ca aplicație
     sau dacă browserul nu permite instalarea. */
(function () {
  // rulat și de scripts/build-pages.mjs într-un „browser” minimal, fără navigator/location
  if (typeof navigator === "undefined" || typeof location === "undefined" || !window.addEventListener) return;
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(function () {});
    });
  }

  function isStandalone() {
    return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      window.navigator.standalone === true;
  }
  function isIOS() {
    var ua = navigator.userAgent || "";
    return /iphone|ipad|ipod/i.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1); // iPadOS
  }

  var deferredPrompt = null;
  function show(on) {
    document.querySelectorAll("[data-pwa-install]").forEach(function (b) { b.hidden = !on; });
  }

  if (isStandalone()) return;   // rulează deja ca aplicație instalată: nu arătăm nimic
  var ios = isIOS();

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferredPrompt = e;
    show(true);
  });
  window.addEventListener("appinstalled", function () {
    deferredPrompt = null;
    show(false);
  });

  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest("[data-pwa-install-btn]");
    if (!btn) return;
    if (deferredPrompt) {
      var p = deferredPrompt;
      deferredPrompt = null;
      show(false);            // reapare dacă browserul trimite din nou beforeinstallprompt
      p.prompt();
      if (p.userChoice) p.userChoice.catch(function () {});
    } else if (ios) {
      var hint = btn.parentNode && btn.parentNode.querySelector("[data-pwa-ios-hint]");
      if (hint) hint.hidden = !hint.hidden;
    }
  });

  // iOS nu are beforeinstallprompt: arătăm butonul, care deschide indicația
  if (ios) show(true);
})();
