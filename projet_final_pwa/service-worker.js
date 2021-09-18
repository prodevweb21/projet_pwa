//Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v20';
//Add list of files to cache here.
const FILES_TO_CACHE = [
    "offline.html",
    "index.html",
    "gastronomies.html",
    "activites.html",
    "patrimoine.html",
    "guide_voyage.html",
    "js/validation.js",
    "js/install.js",
    "img/nature7.jpg",
    "img/nature6.jpg",
    "img/nature5.jpg",
    "img/nature4.jpg",
    "img/nature3.jpg",
    "img/nature2.jpg",
    "img/nature.jpg",
     "img/icon19.jpg",
     "img/icon18.jpg",
     "img/icon16.jpg",
     "img/icon15.jpg",
     "img/icon14.jpeg",
     "img/icon13.jpg",
     "img/icon12.jpg",
     "img/icon11.jpg",
     "img/icon10.jpg",
     "img/icon9.jpg",
     "img/icon8.jpg",
     "img/icon7.jpg",
     "img/icon6.jpg",
     "img/icon5.jpg",
     "img/icon4.jpg",
     "img/icon3.jpg",
     "img/icon2.png",
     "img/icon.png",
     "img/gastronomie.jpg",
     "img/gastronomie1.jpg",
     "img/gastronomie2.jpg",
     "img/gastronomie3.jpg",
     "img/gastronomie6.jpg",
     "img/gastronomie7.jpg",
     "img/gastronomie9.jpg",
     "img/activite1.jpg",
     "img/activite2.jpg",
     "img/activite3.jpg",
     "img/activite4.jpg",
     "img/activite5.jpg",
     "img/activite6.jpg",
     "img/activite7.jpg",
     "img/activite8.jpg",
     "img/activite9.jpg",
     "img/activite10.jpg",
     "img/activite11.jpg",
     "img/carte1.jpg",
     "img/carte2.jpg",
     "img/carte3.jpg",
     "img/carte5.gif",
     "img/carte.gif",
 

];

    self.addEventListener('install', (evt) => {
        console.log('[ServiceWorker] Install');
    // Precache static resources here.

        evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
            })
        );
   
            self.skipWaiting();
        });

        self.addEventListener('activate', (evt) => {
        console.log('[ServiceWorker] Activate');
        //Remove previous cached data from disk.
        evt.waitUntil(
            caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
            if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache',
           key);
            return caches.delete(key);
            }
            }));
            })
            );
        self.clients.claim();
        });
        self.addEventListener('fetch', (evt) => {
        console.log('[ServiceWorker] Fetch', evt.request.url);
        //Add fetch event handler here.
        if (evt.request.mode !== 'navigate') {
            // Not a page navigation, bail.
            return;
            }
            evt.respondWith(
            fetch(evt.request)
            .catch(() => {
            return caches.open(CACHE_NAME)
            .then((cache) => {
           return cache.match('/projet_pwa/projet_final_pwa/offline.html' );
            });
            })
            );
           
        });

        // Register service worker.
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
            navigator.serviceWorker.register('service-worker.js')
            .then((reg) => {
            console.log('Service worker registered.', reg);
            });
            });
        }