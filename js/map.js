/*
 * HARTA / MAP (harta.html) — Leaflet self-hosted (vendor/leaflet) + tile-uri OpenStreetMap.
 * Punctele sunt toate intrările din js/data.js care au `coords`. Filtrele pe categorie (secțiune)
 * ascund și markerele, și lista de sub hartă. Dacă Leaflet sau tile-urile nu se încarcă, lista
 * de sub hartă (generată static de scripts/build-pages.mjs) rămâne utilizabilă.
 * Atribuire: © OpenStreetMap contributors (control Leaflet + text sub hartă).
 */
(function () {
  var GROUPS = [
    { key: "SITE_TOWNS", nav: "nav.orase", color: "#0E7C86" },
    { key: "SITE_HERITAGE", nav: "nav.mostenire", color: "#B45309" },
    { key: "SITE_NATURE", nav: "nav.natura", color: "#15803D" },
    { key: "SITE_ACTIVITIES", nav: "nav.turismActiv", color: "#1D4ED8" },
    { key: "SITE_BUSINESSES", nav: "nav.afaceri", color: "#BE185D" },
    { key: "SITE_DESTINATIONS", nav: "nav.destinatii", color: "#52525B" }
  ];

  function points() {
    var out = [];
    GROUPS.forEach(function (g) {
      window.RL.dataArray(g.key).forEach(function (e) {
        if (e.coords && e.coords.length === 2) out.push({ group: g, entry: e });
      });
    });
    return out;
  }
  // exportat pentru teste
  window.RL_MAP = { points: points, GROUPS: GROUPS };

  var mapEl = document.getElementById("map");
  if (!mapEl || !window.L) return;
  var L = window.L, RL = window.RL, I18N = window.I18N;
  var lang = I18N.lang;

  var map = L.map(mapEl, { scrollWheelZoom: false, zoomControl: true }).setView([45.75, 23.0], 9);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
  }).addTo(map);

  var layers = {};   // cheia secțiunii -> L.layerGroup
  var bounds = [];
  points().forEach(function (p) {
    var e = p.entry, c = e.coords;
    var m = L.circleMarker(c, { radius: 7, weight: 2, color: "#ffffff", fillColor: p.group.color, fillOpacity: 0.95 });
    m.bindPopup(function () {
      var l = I18N.lang;
      return '<strong>' + RL.esc(RL.entryName(e, l)) + '</strong><br>' +
        '<span>' + RL.esc(RL.categoryLabel(e, l)) + (e.area ? " · " + RL.esc(RL.areaLabel(e.area, l)) : "") + '</span><br>' +
        '<a href="' + RL.esc(RL.entryUrl(p.group.key, e.id, l)) + '">' + RL.esc(I18N.t("map.open", l)) + ' →</a>';
    });
    (layers[p.group.key] = layers[p.group.key] || L.layerGroup()).addLayer(m);
    bounds.push(c);
  });
  Object.keys(layers).forEach(function (k) { layers[k].addTo(map); });
  if (bounds.length) map.fitBounds(bounds, { padding: [24, 24] });

  // filtre: casete bifate = grupuri vizibile
  var boxes = document.querySelectorAll("[data-map-group]");
  var countEl = document.getElementById("map-count");
  function apply() {
    var visible = 0;
    boxes.forEach(function (b) {
      var key = b.getAttribute("data-map-group"), on = b.checked;
      if (layers[key]) { if (on && !map.hasLayer(layers[key])) layers[key].addTo(map); if (!on && map.hasLayer(layers[key])) map.removeLayer(layers[key]); }
      document.querySelectorAll('[data-map-list="' + key + '"]').forEach(function (el) { el.hidden = !on; });
      if (on) visible += (layers[key] ? layers[key].getLayers().length : 0);
    });
    if (countEl) countEl.textContent = I18N.t("map.count", I18N.lang).replace("{n}", visible);
  }
  boxes.forEach(function (b) { b.addEventListener("change", apply); });
  apply();
  document.addEventListener("langchange", function () { apply(); });
})();
