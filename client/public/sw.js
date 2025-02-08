const CACHE_NAME = "jobportal-cache-v2";
const CACHE_NAME_PREFIX = "jobportal-cache";
const OFFLINE_PAGE = "/offline.html";
const SERVER_DOWN_PAGE = "/server-down.html";
const SYNC_QUEUE = "sync-requests";

// Static assets to cache
const STATIC_ASSETS = [
  "/",
  "/web-app-manifest-192x192.png",
  "/web-app-manifest-512x512.png",
  "/assets/sounds/message-pop-alert.mp3",
  "/assets/sounds/positive-notification.wav",
  "/assets/sounds/message-long-pop.wav",
  "/site.webmanifest",
  "/favicon-96x96.png",
  "/favicon.ico",
  "/favicon.svg",
  "/logo.png",
  OFFLINE_PAGE,
  SERVER_DOWN_PAGE,
];

// API routes to cache (stale-while-revalidate strategy)
const CACHED_API_ROUTES = [
  "/api/jobs",
  "/api/user/findjobs",
  "/api/user/similarprofiles",
  "/api/employee/applied-jobs",
  "/api/message/chat/all",
  "/api/user/profile",
];

// Install event - Cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return Promise.all(
          STATIC_ASSETS.map((asset) =>
            cache
              .add(asset)
              .catch((err) => console.warn("Failed to cache:", asset, err))
          )
        );
      })
      .then(() => self.skipWaiting()) // ✅ Ensures immediate activation
  );
});

// Activate event - Cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter(
              (name) =>
                name.startsWith(CACHE_NAME_PREFIX) && name !== CACHE_NAME
            ) // ✅ Safer cache deletion
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim()) // ✅ Ensures immediate control
  );
});

// Fetch event - Handle requests properly
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Check if frontend server is down
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => {
        if (!navigator.onLine) {
          return caches.match(OFFLINE_PAGE);
        }
        return caches.match(SERVER_DOWN_PAGE);
      })
    );
    return;
  }

  // Cache static assets
  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((cachedResponse) => {
          return (
            cachedResponse ||
            fetch(request)
              .then((networkResponse) => {
                if (!networkResponse || !networkResponse.ok) {
                  throw new Error("Failed to fetch static asset");
                }
                cache.put(request, networkResponse.clone()); // ✅ Store in cache
                return networkResponse;
              })
              .catch(() => cachedResponse) // ✅ Return cache if fetch fails
          );
        })
      )
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
            if (!networkResponse || !networkResponse.ok) {
              throw new Error("Network response not OK");
            }
            cache.put(request, networkResponse.clone());
            return networkResponse;
          })
          .catch(() => {
            return caches.match(request).then((cachedResponse) => {
              return cachedResponse;
            });
          });
      })
    );
    return;
  }

  // Handle general fetch failures
  event.respondWith(
    fetch(request).catch(() =>
      caches.match(request).then((cachedResponse) => cachedResponse)
    )
  );
});

// Background Sync - Retry failed requests
self.addEventListener("sync", (event) => {
  if (event.tag === "retry-requests") {
    event.waitUntil(
      new Promise((resolve, reject) => {
        const request = indexedDB.open(SYNC_QUEUE, 1);

        request.onsuccess = () => {
          const db = request.result;
          const transaction = db.transaction(SYNC_QUEUE, "readwrite");
          const store = transaction.objectStore(SYNC_QUEUE);

          const getAllRequest = store.getAll();

          getAllRequest.onsuccess = () => {
            const requests = getAllRequest.result;
            if (requests.length === 0) return resolve(); // No requests to retry

            let promises = requests.map(({ id, url, options }) =>
              fetch(url, options)
                .then(() => store.delete(id)) // ✅ Use `id` to delete from IndexedDB
                .catch(() => console.error("Failed to retry:", url))
            );

            Promise.all(promises).then(resolve).catch(reject);
          };

          getAllRequest.onerror = reject;
        };

        request.onerror = reject;
      })
    );
  }
});
