/* Listează sloturile de imagini + creditele foto pentru fiecare intrare, din toate cele 7 secțiuni. */
(function () {
  var DATA_KEYS = ["SITE_DESTINATIONS", "SITE_NATURE", "SITE_ACTIVITIES", "SITE_HERITAGE", "SITE_TOWNS", "SITE_NEWS", "SITE_BUSINESSES"];
  var root = document.getElementById("credits-list");

  function render() {
    var lang = window.I18N.lang;
    var cards = [];
    DATA_KEYS.forEach(function (key) {
      window.RL.dataArray(key).forEach(function (e) {
        var rows = (e.images || []).map(function (src) {
          return "<li><code>" + window.RL.esc(src.split("/").pop()) + "</code></li>";
        }).join("");
        var credit = e.photoCredit
          ? '<p class="photo-credit">' + window.RL.esc(window.I18N.t("credits.photo")) + ": " +
            window.RL.esc(e.photoCredit.author) + " — " + window.RL.esc(e.photoCredit.license) +
            ' (<a href="' + window.RL.esc(e.photoCredit.source) + '" target="_blank" rel="noopener">Wikimedia Commons</a>)</p>'
          : "";
        cards.push('<div class="credit-card"><h3>' + window.RL.esc(e.name) +
          ' <span class="muted">· ' + window.RL.esc(e.area || "") + "</span></h3>" +
          '<p class="muted">' + window.RL.esc(window.RL.categoryLabel(e, lang)) + "</p>" +
          '<ul class="credit-files">' + rows + "</ul>" + credit + "</div>");
      });
    });
    root.innerHTML = cards.join("");
  }

  document.addEventListener("langchange", render);
  render();
})();
