self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('medrep-sim-v1').then((cache) => cache.addAll([
      './',
      './index.html',
      './styles.css',
      './app.js',
      './manifest.json',
      './procedure_tha_actis_demo.json'
    ]))
  );
  self.skipWaiting();
});
self.addEventListener('activate', (e)=>{
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});