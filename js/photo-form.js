/* Formularul „Trimite o poză” (trimite-poza.html): preselectează obiectivul din ?obiectiv=<secțiune>/<id>
 * și avertizează (fără să blocheze) când fișierul e prea mic sau prea mare. Imaginea se citește local
 * printr-un URL blob: (permis de CSP la img-src), nu se trimite nicăieri înainte de apăsarea butonului. */
(function () {
  var MIN_W = 1600, MAX_BYTES = 8 * 1024 * 1024;
  var sel = document.getElementById("photo-target");
  var other = document.getElementById("photo-other");
  var file = document.getElementById("photo-file");
  var warn = document.getElementById("photo-warn");
  if (!sel || !file) return;

  var q = new URLSearchParams(window.location.search).get("obiectiv");
  if (q) {
    var found = false;
    for (var i = 0; i < sel.options.length; i++) {
      if (sel.options[i].value.split(" — ")[0] === q) { sel.selectedIndex = i; found = true; break; }
    }
    if (!found && other) { sel.value = "altul"; other.value = q.slice(0, 200); }
  }

  function show(msg) { warn.textContent = msg || ""; warn.hidden = !msg; }
  function t(key) { return window.I18N ? window.I18N.t(key) : key; }

  file.addEventListener("change", function () {
    show("");
    file.setCustomValidity("");
    var f = file.files && file.files[0];
    if (!f) return;
    if (!/^image\/(jpeg|png)$/.test(f.type)) { file.setCustomValidity(t("photo.warn.type")); show(t("photo.warn.type")); return; }
    if (f.size > MAX_BYTES) { file.setCustomValidity(t("photo.warn.big")); show(t("photo.warn.big")); return; }
    var url = URL.createObjectURL(f), img = new Image();
    img.onload = function () {
      URL.revokeObjectURL(url);
      if (img.naturalWidth < MIN_W) show(t("photo.warn.small").replace("{w}", img.naturalWidth));
    };
    img.onerror = function () { URL.revokeObjectURL(url); };
    img.src = url;
  });
})();
