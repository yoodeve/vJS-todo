const cacheName = 'pwa-test';
const fileToCache = ['./', './index.html', './manifest.json'];

self.addEventListener('install', pEvent => {
    console.log('서비스워커 설치');
    pEvent.waitUntil(
        caches.open(cacheName)
            .then(pCache => {
                console.log('파일 캐시에 저장');
                return pCache.addAll(fileToCache);
            })
    )
});

self.addEventListener('active', pEvent => {
    console.log('서비스워커 시작', pEvent);
});