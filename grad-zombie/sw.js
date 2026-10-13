/* 오프라인에서도 열리도록 앱 파일을 저장해 두는 서비스 워커 (Claude API 요청은 건드리지 않아요) */
const CACHE = 'gz-v2';
const FILES = [
  './', './index.html', './css/style.css', './manifest.webmanifest',
  '../fonts/PretendardVariable.woff2', './icons/icon-192.png', './icons/icon-512.png',
  './js/util.js', './js/store.js', './js/ai.js', './js/paper.js', './js/chase.js', './js/app.js', './js/pwa.js',
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('gz-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
/* 네트워크 우선, 실패하면 저장본 사용 */
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.hostname === 'api.anthropic.com') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
