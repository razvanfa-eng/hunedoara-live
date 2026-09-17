/* Logica paginii de start: statistici reale (din datele existente),
   grid-ul celor 8 secțiuni și ultimele știri. */
(function () {
  var SECTIONS = [
    { key: "locuri", page: "locuri.html" },
    { key: "activitati", page: "activitati.html" },
    { key: "istorie", page: "istorie.html" },
    { key: "orase", page: "orase.html" },
    { key: "stiri", page: "stiri.html" },
    { key: "afaceri", page: "afaceri.html" },
    { key: "utile", page: "utile.html" },
    { key: "contact", page: "contact.html" }
  ];

  function render() {
    var lang = window.I18N.lang;

    var statsEl = document.getElementById("home-stats");
    if (statsEl) {
      var towns = window.RL.dataArray("SITE_TOWNS").length;
      var places = window.RL.dataArray("SITE_PLACES").length;
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
        return '<a class="tile" href="' + s.page + '">' +
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
