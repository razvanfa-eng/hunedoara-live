/* Logica paginii de start: statistici reale (din datele existente),
   grid-ul celor 8 secțiuni și ultimele știri. */
(function () {
  // Foto tile-uri (folosite doar decorativ, în grid-ul "Explorează județul"):
  // majoritatea sunt poze deja existente în images/ (vezi js/data.js -> photoCredit
  // pentru autor/licență/sursă a fiecăreia). Singura poză nouă e cea de la "stiri":
  //   images/home-tile-stiri.jpg — Palatul Administrativ (Prefectura) Deva,
  //   autor Codrinb, licență CC BY-SA 3.0 RO, sursă:
  //   https://commons.wikimedia.org/wiki/File:Deva_Prefecture_2011-4.jpg
  // "contact" rămâne fără fundal foto (nu are un subiect vizual firesc) — folosește
  // un stil distinct (accent), vezi .tile--accent în css/style.css.
  // Câteva repere emblematice ale județului, afișate cu poză mare pe prima
  // pagină — sunt intrări deja existente în seturile de date (aceleași poze
  // și credite foto ca pe paginile lor de detaliu, fără duplicare de conținut).
  var HIGHLIGHTS = [
    { dataKey: "SITE_TOWNS", id: "deva" },
    { dataKey: "SITE_TOWNS", id: "hunedoara" },
    { dataKey: "SITE_ACTIVITIES", id: "statiunea-straja" },
    { dataKey: "SITE_HERITAGE", id: "sarmizegetusa-regia" },
    { dataKey: "SITE_NATURE", id: "parcul-national-retezat" },
    { dataKey: "SITE_HERITAGE", id: "manastirea-prislop" }
  ];

  var SECTIONS = [
    { key: "destinatii", page: "destinatii.html", img: "images/cetatile-dacice-ansamblu.jpg" },
    { key: "orase", page: "orase.html", img: "images/hunedoara-corvin-castle.jpg" },
    { key: "natura", page: "natura.html", img: "images/retezat-bucura.jpg" },
    { key: "turismActiv", page: "turism-activ.html", img: "images/partii-parang.jpg" },
    { key: "mostenire", page: "mostenire.html", img: "images/prislop-manastire.jpg" },
    { key: "afaceri", page: "afaceri.html", img: "images/pensiunea-retezat.jpg" },
    { key: "vreme", page: "vreme.html" },
    { key: "stiri", page: "stiri.html", img: "images/home-tile-stiri.jpg" },
    { key: "contact", page: "contact.html" }
  ];

  // HTML-ul celor 4 zone, pentru o limbă dată — folosit și de scripts/build-pages.mjs
  // (pre-randare în index.html / en/index.html: cardurile apar fără să aștepte JS-ul).
  function build(lang) {
    var t = function (k) { return window.I18N.t(k, lang); };
    var RL = window.RL;
    var out = {};

    var towns = RL.dataArray("SITE_TOWNS").length;
    var places = RL.dataArray("SITE_DESTINATIONS").length;
    var trails = RL.dataArray("SITE_ACTIVITIES").length;
    out.stats = [
      [towns, t("home.stats.towns")],
      [places, t("home.stats.places")],
      [trails, t("home.stats.trails")],
      [t("home.stats.history.value"), t("home.stats.history")]
    ].map(function (pair) {
      return '<div class="stat"><span class="stat__value">' + RL.esc(pair[0]) + '</span>' +
        '<span class="stat__label">' + RL.esc(pair[1]) + "</span></div>";
    }).join("");

    out.explore = SECTIONS.map(function (s) {
      var cls = "tile" + (s.img ? " tile--photo" : " tile--accent");
      // fundal: varianta webp de ~800 px (tile-urile au max. ~560 px lățime pe ecran)
      var bg = s.img ? ' style="background-image:url(&quot;' + RL.imgVariant(s.img, 800) + '&quot;)"' : "";
      return '<a class="' + cls + '" href="' + RL.pageUrl(s.page, lang) + '"' + bg + '>' +
        '<span class="tile__mark">' + RL.esc(s.key.charAt(0).toUpperCase()) + "</span>" +
        '<span class="tile__title">' + RL.esc(t("sec." + s.key + ".name")) + "</span>" +
        '<span class="tile__desc">' + RL.esc(t("sec." + s.key + ".desc")) + "</span>" +
      "</a>";
    }).join("");

    out.highlights = HIGHLIGHTS.map(function (h, i) {
      var e = RL.entryById(h.dataKey, h.id);
      if (!e) return "";
      var l = RL.loc(e, lang);
      var img = (e.images && e.images[0]) || "";
      return '<a class="card" href="' + RL.entryUrl(h.dataKey, e.id, lang) + '">' +
        '<div class="card__media">' + RL.imgHtml(img, { sizes: "card", eager: i < 2 }) + "</div>" +
        '<div class="card__body">' +
          '<span class="card__cat">' + RL.esc(RL.categoryLabel(e, lang)) + "</span>" +
          '<h3 class="card__title">' + RL.esc(RL.entryName(e, lang)) + "</h3>" +
          '<p class="card__tagline">' + RL.esc(l.tagline || "") + "</p>" +
        "</div>" +
      "</a>";
    }).join("");

    var news = RL.dataArray("SITE_NEWS").slice().sort(function (a, b) {
      return (b.date || "").localeCompare(a.date || "");
    }).slice(0, 3);
    out.news = news.length
      ? news.map(function (n) {
          var l = RL.loc(n, lang);
          return '<a class="news-item" href="' + RL.entryUrl("SITE_NEWS", n.id, lang) + '">' +
            '<span class="news-item__date">' + RL.esc(n.date || "") + "</span>" +
            '<span class="news-item__title">' + RL.esc(RL.entryName(n, lang)) + "</span>" +
            '<span class="news-item__tagline">' + RL.esc(l.tagline || "") + "</span>" +
          "</a>";
        }).join("")
      : '<p class="muted">' + RL.esc(t("home.news.empty")) + "</p>";
    return out;
  }
  window.RL_HOME = { build: build };

  var ZONES = { stats: "home-stats", explore: "explore-grid", highlights: "home-highlights", news: "home-news" };

  function render() {
    var lang = window.I18N.lang;
    var html = null;
    Object.keys(ZONES).forEach(function (k) {
      var el = document.getElementById(ZONES[k]);
      if (!el) return;
      // pre-randat de build-pages în aceeași limbă: nu-l mai refacem (evită reîncărcarea pozelor)
      if (el.getAttribute("data-prerendered") === lang) { el.removeAttribute("data-prerendered"); return; }
      el.removeAttribute("data-prerendered");
      html = html || build(lang);
      el.innerHTML = html[k];
    });
  }

  document.addEventListener("DOMContentLoaded", function () { render(); document.documentElement.classList.add("js-rendered"); });   // js-rendered: vezi CSS (CLS)
  document.addEventListener("langchange", render);
})();
