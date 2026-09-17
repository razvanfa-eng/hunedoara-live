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
 */
(function () {
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
  }

  document.addEventListener("DOMContentLoaded", render);
  document.addEventListener("langchange", render);
})();
