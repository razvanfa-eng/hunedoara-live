/*
 * MOTOR GENERIC DE DETALIU / GENERIC DETAIL ENGINE
 * =====================================================================
 * Folosit de toate paginile de detaliu (loc, activitate, poveste
 * istorică, oraș, știre, afacere). Fiecare pagină setează un mic obiect
 * de configurare înainte de a încărca acest fișier:
 *
 *   window.DETAIL_CONFIG = {
 *     dataKey: "SITE_PLACES",
 *     backPage: "locuri.html",
 *     backLabelKey: "detail.back.locuri"
 *   };
 *
 * Markup-ul așteptat pe pagină (vezi loc.html): #detail-root,
 * #detail-notfound, #detail-back, #detail-badge, #detail-title,
 * #detail-tagline, #detail-gallery, #detail-description, #detail-facts,
 * #detail-map, #reviews.
 *
 * #detail-related (opțional): dacă intrarea curentă are `relatedAreas`
 * (listă de nume de zone), afișează grupat pe sezon toate intrările din
 * Natură / Turism activ / Moștenire / Afaceri a căror `area` se regăsește
 * în acea listă — vezi Petroșani în js/data.js pentru un exemplu.
 */
(function () {
  var RELATED_PAGE_MAP = {
    SITE_NATURE: "natura-loc.html",
    SITE_ACTIVITIES: "activitate.html",
    SITE_HERITAGE: "mostenire-articol.html",
    SITE_BUSINESSES: "afacere.html"
  };
  var SEASON_ORDER = ["primavara", "vara", "toamna", "iarna", "tot-anul"];

  function render() {
    var cfg = window.DETAIL_CONFIG;
    if (!cfg) return;
    var lang = window.I18N.lang;
    var id = window.RL.qs("id");
    var entry = id && window.RL.entryById(cfg.dataKey, id);

    var root = document.getElementById("detail-root");
    var notFound = document.getElementById("detail-notfound");

    if (!entry) {
      if (root) root.hidden = true;
      if (notFound) notFound.hidden = false;
      return;
    }
    if (root) root.hidden = false;
    if (notFound) notFound.hidden = true;

    var l = window.RL.loc(entry, lang);
    var siteName = (window.SITE_CONFIG && window.SITE_CONFIG.siteName && window.SITE_CONFIG.siteName[lang]) || "";
    document.title = entry.name + (siteName ? " — " + siteName : "");

    var back = document.getElementById("detail-back");
    if (back) { back.href = cfg.backPage; back.textContent = window.I18N.t(cfg.backLabelKey); }

    var badge = document.getElementById("detail-badge");
    if (badge) {
      badge.innerHTML = window.RL.esc(window.RL.categoryLabel(entry, lang)) +
        (entry.example ? ' <span class="badge badge--example">' + window.RL.esc(window.I18N.t("badge.example")) + "</span>" : "");
    }

    var titleEl = document.getElementById("detail-title");
    if (titleEl) titleEl.textContent = entry.name;

    var taglineEl = document.getElementById("detail-tagline");
    if (taglineEl) taglineEl.textContent = l.tagline || "";

    var gallery = document.getElementById("detail-gallery");
    if (gallery) {
      var images = (entry.images && entry.images.length) ? entry.images : ["images/placeholder.svg"];
      gallery.innerHTML = images.map(function (src) {
        return '<img src="' + window.RL.esc(src) + '" alt="" loading="lazy" onerror="RL.imgError(this)">';
      }).join("");
    }

    var descEl = document.getElementById("detail-description");
    if (descEl) {
      var paras = (l.description || []);
      descEl.innerHTML = paras.map(function (p) { return "<p>" + window.RL.esc(p) + "</p>"; }).join("");
    }

    var factsEl = document.getElementById("detail-facts");
    if (factsEl) {
      var facts = l.facts || [];
      factsEl.innerHTML = facts.length
        ? '<h2 data-i18n="detail.facts">' + window.RL.esc(window.I18N.t("detail.facts")) + "</h2><dl>" +
          facts.map(function (f) {
            return "<dt>" + window.RL.esc(f.label) + "</dt><dd>" + window.RL.esc(f.value) + "</dd>";
          }).join("") + "</dl>"
        : "";
    }

    var mapEl = document.getElementById("detail-map");
    if (mapEl) {
      mapEl.innerHTML = entry.coords
        ? '<a class="btn btn--outline" target="_blank" rel="noopener" href="' + window.RL.wazeUrl(entry.coords) + '">' + window.RL.esc(window.I18N.t("detail.waze")) + "</a>" +
          '<a class="btn btn--outline" target="_blank" rel="noopener" href="' + window.RL.gmapsDirUrl(entry.coords) + '">' + window.RL.esc(window.I18N.t("detail.gmaps")) + "</a>"
        : "";
    }

    var reviewsEl = document.getElementById("reviews");
    if (reviewsEl) {
      if (entry.hasReviews) { reviewsEl.hidden = false; window.Reviews.mount(reviewsEl, entry.id); }
      else { reviewsEl.hidden = true; }
    }

    var relatedEl = document.getElementById("detail-related");
    if (relatedEl) {
      var areas = entry.relatedAreas || [];
      var groups = {};
      Object.keys(RELATED_PAGE_MAP).forEach(function (key) {
        if (key === cfg.dataKey) return;
        window.RL.dataArray(key).forEach(function (item) {
          if (item.example || areas.indexOf(item.area) < 0) return;
          var season = item.season || "tot-anul";
          (groups[season] = groups[season] || []).push({ item: item, page: RELATED_PAGE_MAP[key] });
        });
      });
      var seasons = SEASON_ORDER.filter(function (s) { return groups[s] && groups[s].length; });
      relatedEl.hidden = seasons.length === 0;
      if (seasons.length) {
        function relatedCardHtml(pair) {
          var it = pair.item, l2 = window.RL.loc(it, lang);
          var img = (it.images && it.images[0]) || "images/placeholder.svg";
          return '<a class="card" href="' + pair.page + "?id=" + encodeURIComponent(it.id) + '">' +
            '<div class="card__media"><img src="' + window.RL.esc(img) + '" alt="" loading="lazy" onerror="RL.imgError(this)"></div>' +
            '<div class="card__body">' +
              '<span class="card__cat">' + window.RL.esc(window.RL.categoryLabel(it, lang)) + "</span>" +
              '<h3 class="card__title">' + window.RL.esc(it.name) + "</h3>" +
              '<p class="card__tagline">' + window.RL.esc(l2.tagline || "") + "</p>" +
              (it.area ? '<span class="card__area">' + window.RL.esc(it.area) + "</span>" : "") +
            "</div></a>";
        }
        relatedEl.innerHTML = "<h2>" + window.RL.esc(window.I18N.t("detail.related")) + "</h2>" +
          seasons.map(function (s) {
            return '<h3 class="related-group__title">' + window.RL.esc(window.I18N.t("season." + s)) + "</h3>" +
              '<div class="grid">' + groups[s].map(relatedCardHtml).join("") + "</div>";
          }).join("");
      }
    }
  }

  document.addEventListener("DOMContentLoaded", render);
  document.addEventListener("langchange", render);
})();
