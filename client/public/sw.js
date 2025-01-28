const CACHE_NAME = "buddypair-cache-v1";
const OFFLINE_URL = "/offline.html";

const ASSETS_TO_CACHE = [
  "/",
  "/offline.html",
  "/web-app-manifest-192x192.png",
  "/web-app-manifest-512x512.png",
  "/favicon-96x96.png",
  "/favicon.ico",
  "/favicon.svg",
  "/logo.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching offline page and assets");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[Service Worker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
  } /*else if (event.request.url.includes("/api/")) {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(event.request);
          if (!response.ok) {
            // If the response status is not OK, return a custom error response
            return new Response(
              JSON.stringify({
                message: "API Gateway is unavailable",
                orginalResponse: response,
              }),
              { status: 503, headers: { "Content-Type": "application/json" } }
            );
          }
          return response; // Return the successful response
        } catch (error) {
          return new Response(
            JSON.stringify({ message: "Network error or API unavailable", orginalError:error }),
            { status: 503, headers: { "Content-Type": "application/json" } }
          );
        }
      })()
    );
  } */else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
