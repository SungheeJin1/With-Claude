/* 오프라인에서도 열리도록 사이트 파일을 저장해 두는 서비스 워커 */
const CACHE = 'pumsa-v3';
const FILES = [
  './', './index.html', './css/style.css', './manifest.webmanifest',
  './fonts/PretendardVariable.woff2', './icons/icon-192.png', './icons/icon-512.png',
  './js/helpers.js', './js/app.js', './js/pwa.js',
  './js/data/01-noun.js', './js/data/02-pronoun.js', './js/data/03-adjective.js',
  './js/data/04-adverb.js', './js/data/05-verb.js', './js/data/06-preposition.js', './js/data/07-conjunction.js', './js/data/08-interjection.js',
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
/* 네트워크 우선, 실패하면 저장본 사용 → 내용을 고치면 온라인에서 바로 반영돼요 */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
