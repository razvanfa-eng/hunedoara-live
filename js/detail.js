/*
 * MOTOR GENERIC DE DETALIU / GENERIC DETAIL ENGINE
 * =====================================================================
 * Folosit de toate paginile de detaliu (destinație, oraș, natură,
 * activitate, moștenire, știre, afacere). Fiecare pagină setează un mic
 * obiect de configurare înainte de a încărca acest fișier:
 *
 *   window.DETAIL_CONFIG = {
 *     dataKey: "SITE_NATURE",
 *     backPage: "/natura.html",
 *     backLabelKey: "detail.back.natura",
 *     id: "pestera-bolii"        // opțional — altfel se citește ?id= din URL
 *   };
 *
 * Paginile statice /<secțiune>/<id>/ sunt generate de scripts/build-pages.mjs
 * din șabloanele natura-loc.html, oras.html etc.: conținutul în română e deja
 * în HTML (pentru Google/Facebook), marcat cu data-prerendered="ro" pe
 * #detail-root; aici îl re-randăm doar când limba diferă (EN).
 * Șabloanele merg în continuare și direct, cu ?id= (fallback).
 *
 * Markup-ul așteptat pe pagină (vezi natura-loc.html): #detail-root,
 * #detail-notfound, #detail-back, #detail-badge, #detail-title,
 * #detail-tagline, #detail-gallery, #detail-description, #detail-facts,
 * #detail-map, #reviews.
 *
 * #detail-related (opțional): dacă intrarea curentă are `relatedAreas`
 * (listă de nume de zone), afișează grupat pe sezon toate intrările din
 * Natură / Turism activ / Moștenire / Afaceri a căror `area` se regăsește
 * în acea listă — vezi Petroșani în js/data.js pentru un exemplu.
 *
 * build() e o funcție pură (fără DOM) — o folosește și generatorul Node,
 * ca HTML-ul pre-randat să fie identic cu cel randat în browser.
 */
(function () {
  var RELATED_KEYS = ["SITE_NATURE", "SITE_ACTIVITIES", "SITE_HERITAGE", "SITE_BUSINESSES"];
  var SEASON_ORDER = ["primavara", "vara", "toamna", "iarna", "tot-anul"];

  function build(cfg, entry, lang) {
    var RL = window.RL, t = function (k) { return window.I18N.t(k, lang); };
    var l = RL.loc(entry, lang);
    var siteName = (window.SITE_CONFIG && window.SITE_CONFIG.siteName && window.SITE_CONFIG.siteName[lang]) || "";
    var out = {};

    out.docTitle = entry.name + (siteName ? " — " + siteName : "");
    out.backHref = cfg.backPage;
    out.backLabel = t(cfg.backLabelKey);
    out.badge = RL.esc(RL.categoryLabel(entry, lang)) +
      (entry.example ? ' <span class="badge badge--example">' + RL.esc(t("badge.example")) + "</span>" : "");
    out.title = entry.name;
    out.tagline = l.tagline || "";

    var images = (entry.images && entry.images.length) ? entry.images : [""];
    out.gallery = images.map(function (src, i) {
      return RL.imgHtml(src, { sizes: images.length === 1 ? "hero" : "card", eager: i === 0, alt: i === 0 ? entry.name : "" });
    }).join("");

    out.description = (l.description || []).map(function (p) { return "<p>" + RL.esc(p) + "</p>"; }).join("");

    var facts = l.facts || [];
    out.facts = facts.length
      ? '<h2 data-i18n="detail.facts">' + RL.esc(t("detail.facts")) + "</h2><dl>" +
        facts.map(function (f) {
          return "<dt>" + RL.esc(f.label) + "</dt><dd>" + RL.esc(f.value) + "</dd>";
        }).join("") + "</dl>"
      : "";

    out.map = entry.coords
      ? '<a class="btn btn--outline" target="_blank" rel="noopener" href="' + RL.wazeUrl(entry.coords) + '">' + RL.esc(t("detail.waze")) + "</a>" +
        '<a class="btn btn--outline" target="_blank" rel="noopener" href="' + RL.gmapsDirUrl(entry.coords) + '">' + RL.esc(t("detail.gmaps")) + "</a>"
      : "";

    var areas = entry.relatedAreas || [];
    var groups = {};
    RELATED_KEYS.forEach(function (key) {
      if (key === cfg.dataKey) return;
      RL.dataArray(key).forEach(function (item) {
        if (item.example || areas.indexOf(item.area) < 0) return;
        var season = item.season || "tot-anul";
        (groups[season] = groups[season] || []).push({ item: item, key: key });
      });
    });
    var seasons = SEASON_ORDER.filter(function (s) { return groups[s] && groups[s].length; });
    function relatedCardHtml(pair) {
      var it = pair.item, l2 = RL.loc(it, lang);
      var img = (it.images && it.images[0]) || "";
      return '<a class="card" href="' + RL.entryUrl(pair.key, it.id) + '">' +
        '<div class="card__media">' + RL.imgHtml(img, { sizes: "card" }) + "</div>" +
        '<div class="card__body">' +
          '<span class="card__cat">' + RL.esc(RL.categoryLabel(it, lang)) + "</span>" +
          '<h3 class="card__title">' + RL.esc(it.name) + "</h3>" +
          '<p class="card__tagline">' + RL.esc(l2.tagline || "") + "</p>" +
          (it.area ? '<span class="card__area">' + RL.esc(it.area) + "</span>" : "") +
        "</div></a>";
    }
    out.related = seasons.length
      ? "<h2>" + RL.esc(t("detail.related")) + "</h2>" +
        seasons.map(function (s) {
          return '<h3 class="related-group__title">' + RL.esc(t("season." + s)) + "</h3>" +
            '<div class="grid">' + groups[s].map(relatedCardHtml).join("") + "</div>";
        }).join("")
      : "";
    return out;
  }

  var renderedLang = null;

  function render() {
    var cfg = window.DETAIL_CONFIG;
    if (!cfg) return;
    var lang = window.I18N.lang;
    var id = cfg.id || window.RL.qs("id");
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

    var out = build(cfg, entry, lang);
    document.title = out.docTitle;

    var back = document.getElementById("detail-back");
    if (back) { back.href = out.backHref; back.textContent = out.backLabel; }

    // render() e chemat și la DOMContentLoaded, și la „langchange” — nu refacem
    // conținutul dacă limba e aceeași (nici pe cel pre-randat în HTML).
    if (renderedLang === null && root && root.getAttribute("data-prerendered")) {
      renderedLang = root.getAttribute("data-prerendered");
    }
    if (renderedLang !== lang) {
      renderedLang = lang;
      var set = function (elId, html) { var el = document.getElementById(elId); if (el) el.innerHTML = html; };
      set("detail-badge", out.badge);
      var titleEl = document.getElementById("detail-title");
      if (titleEl) titleEl.textContent = out.title;
      var taglineEl = document.getElementById("detail-tagline");
      if (taglineEl) taglineEl.textContent = out.tagline;
      set("detail-gallery", out.gallery);
      set("detail-description", out.description);
      set("detail-facts", out.facts);
      set("detail-map", out.map);
      var relatedEl = document.getElementById("detail-related");
      if (relatedEl) { relatedEl.innerHTML = out.related; relatedEl.hidden = !out.related; }
      mountReviews(entry, true);
    } else {
      mountReviews(entry, false);
    }
  }

  var reviewsMounted = false;
  function mountReviews(entry, force) {
    var reviewsEl = document.getElementById("reviews");
    if (!reviewsEl) return;
    if (!entry.hasReviews || !window.Reviews) { reviewsEl.hidden = true; return; }
    if (reviewsMounted && !force) return;
    reviewsMounted = true;
    reviewsEl.hidden = false;
    window.Reviews.mount(reviewsEl, entry.id);
  }

  window.RL_DETAIL = { build: build };
  if (typeof document !== "undefined" && document.addEventListener) {
    document.addEventListener("DOMContentLoaded", render);
    document.addEventListener("langchange", render);
  }
})();
