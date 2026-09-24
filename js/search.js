/* Căutare globală pe tot site-ul. Butonul de căutare din header (#global-search-btn)
 * deschide un overlay ce caută, live, în toate cele 7 secțiuni de conținut din
 * js/data.js (nume + rezumat), indiferent de pagina curentă. */
(function () {
  var SOURCES = [
    { key: "SITE_DESTINATIONS", page: "destinatie.html", typeKey: "sec.destinatii.name" },
    { key: "SITE_TOWNS", page: "oras.html", typeKey: "sec.orase.name" },
    { key: "SITE_NATURE", page: "natura-loc.html", typeKey: "sec.natura.name" },
    { key: "SITE_ACTIVITIES", page: "activitate.html", typeKey: "sec.turismActiv.name" },
    { key: "SITE_HERITAGE", page: "mostenire-articol.html", typeKey: "sec.mostenire.name" },
    { key: "SITE_BUSINESSES", page: "afacere.html", typeKey: "sec.afaceri.name" },
    { key: "SITE_NEWS", page: "stire.html", typeKey: "sec.stiri.name" }
  ];
  var MAX_RESULTS = 24;
  var DIACRITICS = { ă: "a", â: "a", î: "i", ș: "s", ş: "s", ț: "t", ţ: "t" };

  function norm(s) {
    return String(s || "").toLowerCase().replace(/[ăâîșşțţ]/g, function (c) { return DIACRITICS[c] || c; });
  }

  var overlay, input, resultsEl, panel;

  function buildOverlay() {
    if (overlay) return;
    overlay = document.createElement("div");
    overlay.className = "search-overlay";
    overlay.hidden = true;
    overlay.innerHTML =
      '<div class="search-panel" role="dialog" aria-modal="true">' +
        '<div class="search-panel__row">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>' +
          '<input type="text" id="search-input" autocomplete="off" spellcheck="false">' +
          '<button type="button" class="search-panel__close" aria-label="Close">&times;</button>' +
        "</div>" +
        '<div class="search-panel__results" id="search-results"></div>' +
      "</div>";
    document.body.appendChild(overlay);
    panel = overlay.querySelector(".search-panel");
    input = overlay.querySelector("#search-input");
    resultsEl = overlay.querySelector("#search-results");

    overlay.addEventListener("mousedown", function (e) {
      if (e.target === overlay) close();
    });
    overlay.querySelector(".search-panel__close").addEventListener("click", close);
    input.addEventListener("input", function () { renderResults(input.value); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !overlay.hidden) close();
    });
  }

  function labelFor(src) {
    return (window.I18N && window.I18N.t(src.typeKey)) || src.key;
  }

  function search(query) {
    var q = norm(query).trim();
    if (!q) return [];
    var lang = window.I18N.lang;
    var out = [];
    SOURCES.forEach(function (src) {
      var all = window.RL.dataArray(src.key);
      all.forEach(function (e) {
        if (e.example) return;
        var l = window.RL.loc(e, lang);
        var hay = norm(e.name) + " " + norm(l.tagline) + " " + norm(e.area);
        if (hay.indexOf(q) < 0) return;
        out.push({ entry: e, src: src, loc: l });
      });
    });
    return out.slice(0, MAX_RESULTS);
  }

  function renderResults(query) {
    var q = query.trim();
    if (!q) {
      resultsEl.innerHTML = '<p class="search-panel__hint">' + window.RL.esc(window.I18N.t("search.hint")) + "</p>";
      return;
    }
    var matches = search(q);
    if (!matches.length) {
      resultsEl.innerHTML = '<p class="search-panel__hint">' + window.RL.esc(window.I18N.t("search.none")) + "</p>";
      return;
    }
    resultsEl.innerHTML = matches.map(function (m) {
      return '<a class="search-result" href="' + window.RL.entryUrl(m.src.key, m.entry.id) + '">' +
        '<span class="search-result__type">' + window.RL.esc(labelFor(m.src)) + "</span>" +
        '<span class="search-result__title">' + window.RL.esc(m.entry.name) + "</span>" +
        '<span class="search-result__tagline">' + window.RL.esc(m.loc.tagline || "") + "</span>" +
      "</a>";
    }).join("");
  }

  function open() {
    buildOverlay();
    input.placeholder = window.I18N.t("search.placeholder");
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    renderResults(input.value);
    setTimeout(function () { input.focus(); }, 0);
  }

  function close() {
    if (!overlay) return;
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("global-search-btn");
    if (btn) btn.addEventListener("click", open);
  });
})();
