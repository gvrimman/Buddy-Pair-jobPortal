const CACHE_NAME = "jobportal-cache-v1";
const OFFLINE_PAGE = "/offline.html";
const SERVER_UNAVAILABLE_PAGE = "/server-unavailable.html";
const GATEWAY_UNAVAILABLE_PAGE = "/gateway-unavailable.html";
const SYNC_QUEUE = "sync-requests";

let backendURL = null; // Dynamically detected backend URL

// Static assets to cache
const STATIC_ASSETS = [
  "/",
  "/web-app-manifest-192x192.png",
  "/web-app-manifest-512x512.png",
  "/assets/sounds/message-pop-alert.mp3",
  "/assets/sounds/positive-notification.wav",
  "/site.webmanifest",
  "/favicon-96x96.png",
  "/favicon.ico",
  "/favicon.svg",
  "/logo.png",
  OFFLINE_PAGE,
  SERVER_UNAVAILABLE_PAGE,
  GATEWAY_UNAVAILABLE_PAGE,
];

// API routes to cache (stale-while-revalidate strategy)
const CACHED_API_ROUTES = ["/api/jobs", "/api/categories"];

// Install event - Cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate event - Cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Handle requests properly
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Check if frontend server is down
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match(SERVER_UNAVAILABLE_PAGE))
    );
    return;
  }

  // Detect API requests dynamically (Assuming API requests contain "/api/")
  if (!backendURL && request.url.includes("/api/")) {
    const url = new URL(request.url);
    backendURL = `${url.origin}`; // Extract backend domain
    console.log("Detected backend URL:", backendURL);
  }

  // Cache static assets
  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches
        .match(request)
        .then((cachedResponse) => cachedResponse || fetch(request))
    );
    return;
  }

  // Cache images
  if (request.destination === "image") {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          return (
            cachedResponse ||
            fetch(request).then((networkResponse) => {
              cache.put(request, networkResponse.clone());
              return networkResponse;
            })
          );
        });
      })
    );
    return;
  }

  // Handle API caching with stale-while-revalidate
  if (CACHED_API_ROUTES.some((route) => url.pathname.startsWith(route))) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(request)
          .then((networkResponse) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          })
          .catch(
            () =>
              caches.match(request) || caches.match(GATEWAY_UNAVAILABLE_PAGE)
          );
      })
    );
    return;
  }

  // Handle general fetch failures
  event.respondWith(
    fetch(request).catch(() => {
      if (!navigator.onLine) {
        return caches.match(OFFLINE_PAGE);
      }
      return caches.match(request);
    })
  );
});

// Background Sync - Retry failed requests
self.addEventListener("sync", (event) => {
  if (event.tag === "retry-requests") {
    event.waitUntil(
      self.indexedDB.open(SYNC_QUEUE, 1).then((db) => {
        const transaction = db.transaction(SYNC_QUEUE, "readwrite");
        const store = transaction.objectStore(SYNC_QUEUE);
        store.getAll().then((requests) => {
          requests.forEach(({ url, options }) => {
            fetch(url, options)
              .then(() => store.delete(url))
              .catch(() => console.error("Failed to retry:", url));
          });
        });
      })
    );
  }
});

// Function to check backend availability
async function isBackendAvailable() {
  if (!backendURL) return false; // No backend detected yet
  try {
    const response = await fetch(`${backendURL}/api/health`, { mode: "no-cors" });
    return response.ok;
  } catch {
    return false;
  }
}

// Auto-reload when backend becomes available
async function checkAndReloadClients() {
  const clients = await self.clients.matchAll();
  clients.forEach((client) => {
    client.postMessage({ type: "VITE_NAVIGATE_RELOAD" });
  });
}

self.addEventListener("online", async () => {
  if (await isBackendAvailable()) {
    checkAndReloadClients();
  }
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "CHECK_AND_RELOAD") {
    checkAndReloadClients();
  }
});

self.addEventListener("offline", checkAndReloadClients);