/*
 * SERVICE WORKER — Hunedoara Live (PWA)
 * =====================================================================
 * - Paginile HTML (navigări): întâi rețeaua, ca actualizările de conținut să
 *   apară imediat; fără rețea -> copia din cache (aceeași pagină, chiar și cu
 *   alt ?id=, pentru că paginile de detaliu sunt randate în browser) -> offline.html.
 * - js/data.js: tot întâi rețeaua (e conținutul site-ului), cu cache ca rezervă.
 * - CSS / JS / imagini / iconițe: din cache imediat, reîmprospătate în fundal
 *   (stale-while-revalidate).
 * - NU se ating: cererile non-GET (formularul de contact -> Netlify Forms),
 *   /.netlify/... (funcțiile pentru recenzii) și cererile către alte domenii.
 *
 * La orice schimbare a listei de mai jos sau a strategiei, crește VERSION.
 */
var VERSION = "v1";
var STATIC_CACHE = "hl-static-" + VERSION;
var PAGES_CACHE = "hl-pages-" + VERSION;
var IMG_CACHE = "hl-img-" + VERSION;
var IMG_LIMIT = 120;
var OFFLINE_URL = "/offline.html";

var PRECACHE = [
  "/", "/index.html",
  OFFLINE_URL,
  "/css/style.css",
  "/js/data.js", "/js/config.js", "/js/i18n.js", "/js/common.js", "/js/search.js",
  "/js/home.js", "/js/listing.js", "/js/detail.js", "/js/reviews.js", "/js/credits.js", "/js/images.js",
  "/images/placeholder.svg",
  "/manifest.webmanifest",
  "/icons/icon-192.png", "/icons/favicon.svg"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(function (cache) {
        // cache: "reload" -> ocolește cache-ul HTTP, ca să nu precache-uim versiuni vechi
        return Promise.all(PRECACHE.map(function (url) {
          return fetch(new Request(url, { cache: "reload" })).then(function (res) {
            if (!res.ok) return;
            // un răspuns redirecționat nu poate fi servit la o navigare -> îl „curățăm”
            if (res.redirected) {
              return res.blob().then(function (body) {
                return cache.put(url, new Response(body, { status: 200, headers: res.headers }));
              });
            }
            return cache.put(url, res);
          }).catch(function () {});
        }));
      })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  var keep = [STATIC_CACHE, PAGES_CACHE, IMG_CACHE];
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k.indexOf("hl-") === 0 && keep.indexOf(k) < 0) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

function isCacheable(res) {
  return res && res.ok && res.type === "basic" && !res.redirected;
}

function trim(cacheName, max) {
  caches.open(cacheName).then(function (cache) {
    cache.keys().then(function (keys) {
      if (keys.length > max) cache.delete(keys[0]).then(function () { trim(cacheName, max); });
    });
  });
}

// HTML: rețea -> cache (aceeași adresă) -> cache (aceeași pagină, alt ?id=) -> offline.html
function networkFirstPage(request) {
  return fetch(request).then(function (res) {
    if (isCacheable(res)) {
      var copy = res.clone();
      caches.open(PAGES_CACHE).then(function (c) { c.put(request, copy); });
    }
    return res;
  }).catch(function () {
    return caches.match(request).then(function (hit) {
      return hit || caches.match(request, { ignoreSearch: true });
    }).then(function (hit) {
      return hit || caches.match(OFFLINE_URL);
    });
  });
}

function networkFirst(request, cacheName) {
  return fetch(request).then(function (res) {
    if (isCacheable(res)) {
      var copy = res.clone();
      caches.open(cacheName).then(function (c) { c.put(request, copy); });
    }
    return res;
  }).catch(function () {
    return caches.match(request, { ignoreSearch: true });
  });
}

function staleWhileRevalidate(request, cacheName, limit) {
  return caches.open(cacheName).then(function (cache) {
    return cache.match(request).then(function (hit) {
      var update = fetch(request).then(function (res) {
        if (isCacheable(res)) {
          cache.put(request, res.clone());
          if (limit) trim(cacheName, limit);
        }
        return res;
      });
      if (hit) {
        update.catch(function () {});
        return hit;
      }
      return update.catch(function () {
        return caches.match(request, { ignoreSearch: true }).then(function (any) {
          if (any) return any;
          if (request.destination === "image") return caches.match("/images/placeholder.svg");
          return Response.error();
        });
      });
    });
  });
}

self.addEventListener("fetch", function (event) {
  var request = event.request;
  if (request.method !== "GET") return;                          // Netlify Forms (POST) etc.
  var url = new URL(request.url);
  if (url.origin !== self.location.origin) return;               // fonturi Google, hărți, Supabase...
  if (url.pathname.indexOf("/.netlify/") === 0) return;          // funcții Netlify (recenzii)
  if (url.pathname === "/sw.js") return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(request));
    return;
  }
  if (url.pathname === "/js/data.js") {
    event.respondWith(networkFirst(request, STATIC_CACHE));
    return;
  }
  if (request.destination === "image" || /\.(png|jpe?g|webp|avif|gif|svg|ico)$/i.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request, IMG_CACHE, IMG_LIMIT));
    return;
  }
  if (/\.(css|js|mjs|webmanifest|json|woff2?)$/i.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
  }
  // orice altceva: comportamentul normal al browserului
});
