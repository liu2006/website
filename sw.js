const cacheName = self.location.pathname
const pages = [

  "/website/",
    "/website/posts/20260704211352-enable/",
    "/website/posts/20260704201436-fdisk/",
    "/website/posts/20260704212100-font/",
    "/website/posts/20260704203724-format/",
    "/website/posts/20260704212154-grub/",
    "/website/posts/20260706070507-iwctl/",
    "/website/posts/20260704211528-local/",
    "/website/posts/20260704210004-mount/",
    "/website/posts/20260704210454-origin/",
    "/website/posts/20260704210707-pacstrap/",
    "/website/posts/20260704211928-password/",
    "/website/posts/20260704211013-setting/",
    "/website/posts/20260704211248-setting/",
    "/website/categories/",
    "/website/posts/",
    "/website/tags/",
    "/website/book.min.64ab3279514b7f9a7b1ec50a47d8bc6f9bed31454a6363d9f98214862cb1a617.css",
  "/website/en.search-data.min.379ad52917fd81c4ca377612b5574f8fec0f997842df2b5450b29ff101453aff.json",
  "/website/en.search.min.f04fc64d169d35bdda89cffcd5476f0e9940037fa8dd63c43a845a86324f97ce.js",
  
];

self.addEventListener("install", function (event) {
  self.skipWaiting();

  caches.open(cacheName).then((cache) => {
    return cache.addAll(pages);
  });
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    return;
  }

  /**
   * @param {Response} response
   * @returns {Promise<Response>}
   */
  function saveToCache(response) {
    if (cacheable(response)) {
      return caches
        .open(cacheName)
        .then((cache) => cache.put(request, response.clone()))
        .then(() => response);
    } else {
      return response;
    }
  }

  /**
   * @param {Error} error
   */
  function serveFromCache(error) {
    return caches.open(cacheName).then((cache) => cache.match(request.url));
  }

  /**
   * @param {Response} response
   * @returns {Boolean}
   */
  function cacheable(response) {
    return response.type === "basic" && response.ok && !response.headers.has("Content-Disposition")
  }

  event.respondWith(fetch(request).then(saveToCache).catch(serveFromCache));
});
