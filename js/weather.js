/*
 * VREME / WEATHER (vreme.html) — prognoză pe 4 zile din Open-Meteo (https://open-meteo.com, CC BY 4.0).
 * Fără cheie, fără cookie-uri, fără stocare: o singură cerere GET direct din browser spre api.open-meteo.com
 * (autorizată în CSP la connect-src, doar acest domeniu). Locurile vin din js/data.js (coordonatele intrărilor),
 * configurate în blocul JSON #weather-config. Dacă cererea eșuează, rămân linkurile către sursele oficiale.
 * NU afișăm starea pârtiilor sau a zăpezii pe pârtie — nu avem o sursă oficială pentru ea.
 */
(function () {
  var cfgEl = document.getElementById("weather-config");
  var grid = document.getElementById("wx-grid");
  var statusEl = document.getElementById("wx-status");
  if (!cfgEl || !grid) return;
  var cfg;
  try { cfg = JSON.parse(cfgEl.textContent); } catch (e) { return; }
  var RL = window.RL, I18N = window.I18N;

  var places = (cfg.places || []).map(function (p) {
    var e = RL.entryById(p.key, p.id);
    return e && e.coords ? { entry: e, coords: e.coords } : null;
  }).filter(Boolean);

  // codurile WMO -> cheie de traducere
  function codeKey(c) {
    if (c === 0) return "clear";
    if (c === 1 || c === 2) return "cloudy";
    if (c === 3) return "overcast";
    if (c === 45 || c === 48) return "fog";
    if (c >= 51 && c <= 57) return "drizzle";
    if (c >= 61 && c <= 67) return "rain";
    if (c >= 71 && c <= 77) return "snow";
    if (c >= 80 && c <= 82) return "showers";
    if (c === 85 || c === 86) return "snowshowers";
    if (c >= 95 && c <= 99) return "thunder";
    return "unknown";
  }
  var data = null, failed = false;

  function t(k) { return I18N.t(k); }
  function fmtDay(iso, i) {
    if (i === 0) return t("wx.today");
    var loc = I18N.lang === "en" ? "en-GB" : "ro-RO";
    try { return new Intl.DateTimeFormat(loc, { weekday: "short", day: "numeric", month: "short" }).format(new Date(iso + "T12:00:00")); }
    catch (e) { return iso; }
  }
  function round(n) { return Math.round(n); }
  function tenth(n) { return Math.round(n * 10) / 10; }

  function render() {
    if (!data) return;
    grid.innerHTML = places.map(function (p, idx) {
      var r = data[idx];
      if (!r || !r.daily) return "";
      var cur = r.current || {};
      var days = r.daily.time.map(function (day, i) {
        return '<li><span class="wx-day">' + RL.esc(fmtDay(day, i)) + "</span>" +
          '<span class="wx-temp">' + round(r.daily.temperature_2m_min[i]) + "° / " + round(r.daily.temperature_2m_max[i]) + "°</span>" +
          '<span class="wx-sky">' + RL.esc(t("wx.c." + codeKey(r.daily.weather_code[i]))) + "</span>" +
          '<span class="wx-extra">' + RL.esc(t("wx.precip")) + " " + tenth(r.daily.precipitation_sum[i]) + " mm" +
          (r.daily.snowfall_sum && r.daily.snowfall_sum[i] > 0 ? " · " + RL.esc(t("wx.snow")) + " " + tenth(r.daily.snowfall_sum[i]) + " cm" : "") + "</span></li>";
      }).join("");
      return '<article class="wx-card"><h2>' + RL.esc(RL.entryName(p.entry, I18N.lang)) + "</h2>" +
        '<p class="muted wx-elev">' + RL.esc(t("wx.elev")) + " " + round(r.elevation) + " m</p>" +
        '<p class="wx-now"><strong>' + RL.esc(t("wx.now")) + ":</strong> " + round(cur.temperature_2m) + "° · " + RL.esc(t("wx.c." + codeKey(cur.weather_code))) +
        " · " + RL.esc(t("wx.wind")) + " " + round(cur.wind_speed_10m) + " km/h</p>" +
        '<ul class="wx-days">' + days + "</ul></article>";
    }).join("");
  }

  function fail() {
    failed = true;
    if (statusEl) { statusEl.hidden = false; statusEl.removeAttribute("data-i18n"); statusEl.textContent = t("wx.error"); }
  }

  var q = "latitude=" + places.map(function (p) { return p.coords[0]; }).join(",") +
    "&longitude=" + places.map(function (p) { return p.coords[1]; }).join(",") +
    "&current=temperature_2m,weather_code,wind_speed_10m" +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum" +
    "&timezone=Europe%2FBucharest&forecast_days=" + (cfg.days || 4);

  if (!places.length || typeof fetch !== "function") { fail(); return; }
  fetch("https://api.open-meteo.com/v1/forecast?" + q, { credentials: "omit", referrerPolicy: "no-referrer" })
    .then(function (res) { if (!res.ok) throw new Error("HTTP " + res.status); return res.json(); })
    .then(function (json) {
      data = Array.isArray(json) ? json : [json];
      if (statusEl) statusEl.hidden = true;
      render();
    })
    .catch(fail);
  document.addEventListener("langchange", function () {
    render();
    if (failed && statusEl) statusEl.textContent = t("wx.error");
  });
})();
