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
  var SECTIONS = [
    { key: "destinatii", page: "destinatii.html", img: "images/cetatile-dacice-ansamblu.jpg" },
    { key: "orase", page: "orase.html", img: "images/hunedoara-corvin-castle.jpg" },
    { key: "natura", page: "natura.html", img: "images/retezat-bucura.jpg" },
    { key: "turismActiv", page: "turism-activ.html", img: "images/partii-parang.jpg" },
    { key: "mostenire", page: "mostenire.html", img: "images/prislop-manastire.jpg" },
    { key: "afaceri", page: "afaceri.html", img: "images/pensiunea-retezat.jpg" },
    { key: "stiri", page: "stiri.html", img: "images/home-tile-stiri.jpg" },
    { key: "contact", page: "contact.html" }
  ];

  function render() {
    var lang = window.I18N.lang;

    var statsEl = document.getElementById("home-stats");
    if (statsEl) {
      var towns = window.RL.dataArray("SITE_TOWNS").length;
      var places = window.RL.dataArray("SITE_DESTINATIONS").length;
      var trails = window.RL.dataArray("SITE_ACTIVITIES").length;
      statsEl.innerHTML = [
        [towns, window.I18N.t("home.stats.towns")],
        [places, window.I18N.t("home.stats.places")],
        [trails, window.I18N.t("home.stats.trails")],
        [window.I18N.t("home.stats.history.value"), window.I18N.t("home.stats.history")]
      ].map(function (pair) {
        return '<div class="stat"><span class="stat__value">' + window.RL.esc(pair[0]) + '</span>' +
          '<span class="stat__label">' + window.RL.esc(pair[1]) + "</span></div>";
      }).join("");
    }

    var gridEl = document.getElementById("explore-grid");
    if (gridEl) {
      gridEl.innerHTML = SECTIONS.map(function (s) {
        var cls = "tile" + (s.img ? " tile--photo" : " tile--accent");
        var bg = s.img ? ' style="background-image:url(&quot;' + s.img + '&quot;)"' : "";
        return '<a class="' + cls + '" href="' + s.page + '"' + bg + '>' +
          '<span class="tile__mark">' + window.RL.esc(s.key.charAt(0).toUpperCase()) + "</span>" +
          '<span class="tile__title">' + window.RL.esc(window.I18N.t("sec." + s.key + ".name")) + "</span>" +
          '<span class="tile__desc">' + window.RL.esc(window.I18N.t("sec." + s.key + ".desc")) + "</span>" +
        "</a>";
      }).join("");
    }

    var newsEl = document.getElementById("home-news");
    if (newsEl) {
      var news = window.RL.dataArray("SITE_NEWS").slice().sort(function (a, b) {
        return (b.date || "").localeCompare(a.date || "");
      }).slice(0, 3);
      newsEl.innerHTML = news.length
        ? news.map(function (n) {
            var l = window.RL.loc(n, lang);
            return '<a class="news-item" href="stire.html?id=' + encodeURIComponent(n.id) + '">' +
              '<span class="news-item__date">' + window.RL.esc(n.date || "") + "</span>" +
              '<span class="news-item__title">' + window.RL.esc(n.name) + "</span>" +
              '<span class="news-item__tagline">' + window.RL.esc(l.tagline || "") + "</span>" +
            "</a>";
          }).join("")
        : '<p class="muted">' + window.RL.esc(window.I18N.t("home.news.empty")) + "</p>";
    }
  }

  document.addEventListener("DOMContentLoaded", render);
  document.addEventListener("langchange", render);
})();
