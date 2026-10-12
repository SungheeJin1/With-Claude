/* 웹앱(홈 화면에 추가) 지원: https 또는 localhost에서만 서비스 워커를 등록해요 */
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
