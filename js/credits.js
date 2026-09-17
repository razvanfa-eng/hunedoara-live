/* Listează sloturile de imagini pentru fiecare intrare, din toate cele 6 secțiuni. */
(function () {
  var DATA_KEYS = ["SITE_PLACES", "SITE_ACTIVITIES", "SITE_HISTORY", "SITE_TOWNS", "SITE_NEWS", "SITE_BUSINESSES"];
  var root = document.getElementById("credits-list");

  function render() {
    var lang = window.I18N.lang;
    var cards = [];
    DATA_KEYS.forEach(function (key) {
      window.RL.dataArray(key).forEach(function (e) {
        var rows = (e.images || []).map(function (src) {
          return "<li><code>" + window.RL.esc(src.split("/").pop()) + "</code></li>";
        }).join("");
        cards.push('<div class="credit-card"><h3>' + window.RL.esc(e.name) +
          ' <span class="muted">· ' + window.RL.esc(e.area || "") + "</span></h3>" +
          '<p class="muted">' + window.RL.esc(window.RL.categoryLabel(e, lang)) + "</p>" +
          '<ul class="credit-files">' + rows + "</ul></div>");
      });
    });
    root.innerHTML = cards.join("");
  }

  document.addEventListener("langchange", render);
  render();
})();
