/*
 * MOTOR GENERIC DE LISTARE / GENERIC LISTING ENGINE
 * =====================================================================
 * Folosit de toate paginile de listare (locuri, activități, istorie,
 * orașe, știri, afaceri). Fiecare pagină setează un mic obiect de
 * configurare înainte de a încărca acest fișier:
 *
 *   window.LISTING_CONFIG = {
 *     dataKey: "SITE_PLACES",   // cheia din js/data.js
 *     (linkurile spre detalii: RL.entryUrl -> /<secțiune>/<id>/)
 *     sortByDateDesc: false     // true pentru Știri
 *   };
 *
 * Markup-ul așteptat pe pagină (vezi locuri.html):
 *   #f-search, #f-category, #f-area, #f-reset, #grid, #empty, #result-count
 * (categoria/zona sunt opționale — dacă lipsesc din HTML, sunt ignorate)
 */
(function () {
  function render() {
    var cfg = window.LISTING_CONFIG;
    if (!cfg) return;
    var lang = window.I18N.lang;
    var all = window.RL.dataArray(cfg.dataKey);

    var searchEl = document.getElementById("f-search");
    var catEl = document.getElementById("f-category");
    var areaEl = document.getElementById("f-area");
    var resetBtn = document.getElementById("f-reset");
    var grid = document.getElementById("grid");
    var empty = document.getElementById("empty");
    var countEl = document.getElementById("result-count");
    if (!grid) return;

    function uniqueValues(getter) {
      var seen = {}, out = [];
      all.forEach(function (e) {
        var v = getter(e);
        if (v && !seen[v]) { seen[v] = 1; out.push(v); }
      });
      return out;
    }

    function populateSelect(el, values) {
      if (!el) return;
      var current = el.value;
      el.innerHTML = '<option value="">' + window.RL.esc(window.I18N.t("filters.all")) + "</option>" +
        values.map(function (v) { return '<option value="' + window.RL.esc(v) + '">' + window.RL.esc(v) + "</option>"; }).join("");
      el.value = values.indexOf(current) >= 0 ? current : "";
    }

    function fmtDate(iso) {
      if (!iso) return "";
      try {
        return new Date(iso + "T00:00:00").toLocaleDateString(lang === "ro" ? "ro-RO" : "en-GB",
          { year: "numeric", month: "short", day: "numeric" });
      } catch (e) { return iso; }
    }

    function cardHtml(e, i) {
      var l = window.RL.loc(e, lang);
      var img = (e.images && e.images[0]) || "";
      var badge = e.example ? '<span class="badge badge--example">' + window.RL.esc(window.I18N.t("badge.example")) + "</span>" : "";
      var meta = window.RL.esc(window.RL.categoryLabel(e, lang)) + (e.date ? " · " + window.RL.esc(fmtDate(e.date)) : "");
      // primele carduri sunt de regulă vizibile fără scroll -> fără lazy-load
      return '<a class="card" href="' + window.RL.entryUrl(cfg.dataKey, e.id) + '">' +
        '<div class="card__media">' + window.RL.imgHtml(img, { sizes: "card", eager: i < 2 }) + badge + "</div>" +
        '<div class="card__body">' +
          '<span class="card__cat">' + meta + "</span>" +
          '<h3 class="card__title">' + window.RL.esc(e.name) + "</h3>" +
          '<p class="card__tagline">' + window.RL.esc(l.tagline || "") + "</p>" +
          (e.area ? '<span class="card__area">' + window.RL.esc(e.area) + "</span>" : "") +
        "</div>" +
      "</a>";
    }

    function apply() {
      var q = ((searchEl && searchEl.value) || "").trim().toLowerCase();
      var cat = (catEl && catEl.value) || "";
      var area = (areaEl && areaEl.value) || "";
      var list = all.filter(function (e) {
        if (cat && window.RL.categoryLabel(e, lang) !== cat) return false;
        if (area && e.area !== area) return false;
        if (q && e.name.toLowerCase().indexOf(q) < 0) return false;
        return true;
      });
      if (cfg.sortByDateDesc) {
        list = list.slice().sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); });
      }
      grid.innerHTML = list.map(cardHtml).join("");
      if (empty) empty.hidden = list.length !== 0;
      if (countEl) {
        var unit = list.length === 1 ? window.I18N.t("filters.count.one") : window.I18N.t("filters.count.many");
        countEl.textContent = list.length + " " + unit;
      }
    }

    populateSelect(catEl, uniqueValues(function (e) { return window.RL.categoryLabel(e, lang); }));
    populateSelect(areaEl, uniqueValues(function (e) { return e.area; }));

    [searchEl, catEl, areaEl].forEach(function (el) {
      if (!el) return;
      el.addEventListener("input", apply);
      el.addEventListener("change", apply);
    });
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        if (searchEl) searchEl.value = "";
        if (catEl) catEl.value = "";
        if (areaEl) areaEl.value = "";
        apply();
      });
    }

    apply();
  }

  document.addEventListener("DOMContentLoaded", render);
  document.addEventListener("langchange", render);
})();
