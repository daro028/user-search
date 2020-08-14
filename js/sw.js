;
const CACHE_NAME = 'v1_cache_buscador_de_usuarios',
urlsToCache = [
'/',
'css/reset.css',
'css/bootstrap-grid.min.css',
'https://fonts.googleapis.com/css?family=Archivo:400,500,700&display=swap',
'css/styles.css',
'json/manifest.json'
]

self.addEventListener('install', e =>{
    e.waitUntil(
    caches.open(CACHE_NAME)
        .then(cache =>{
            return cache.addAll(urlsToCache)
            .then(() =>  self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err) )
    )
})

self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys
        .then(cachesNames => {
            cachesNames.map(cacheName =>{
                if (cacheWhitelist.indexOf(cacheName)===-1) {
                    return caches.delete(cacheName)
                }
            })
        })
        .then(() => self.clients.claim())
    )
})

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then (res => {
            if(res){
                return res
            }

            return fetch(e.request)
        })
    )
})