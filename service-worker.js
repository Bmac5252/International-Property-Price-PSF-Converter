const CACHE_NAME = 'international-property-converter-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/converter.html',
  '/icon-192x192.png',
  '/icon-512x512.png',
  'https://v6.exchangerate-api.com/v6/bd5a904113f08d2c2a94bc51/latest/USD'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response or fetch from network
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
