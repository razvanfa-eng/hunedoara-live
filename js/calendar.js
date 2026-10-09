/* Calendar (calendar.html): ascunde evenimentele deja încheiate (data de sfârșit < azi), în ora locală a vizitatorului.
 * Lista e generată static de scripts/build-pages.mjs (fiecare <li> are data-start / data-end); fără JavaScript apar toate. */
(function () {
  var list = document.getElementById("cal-upcoming");
  if (!list) return;
  var d = new Date();
  var today = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
  var visible = 0;
  list.querySelectorAll("[data-end]").forEach(function (li) {
    var past = li.getAttribute("data-end") < today;
    li.hidden = past;
    if (!past) visible++;
  });
  var none = document.getElementById("cal-none");
  if (none) none.hidden = visible > 0;
})();
