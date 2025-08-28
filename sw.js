// Service Worker for Sundown Studio PWA
const CACHE_NAME = 'sundown-studio-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/demo-features.html',
  '/css/style.css',
  '/css/theme.css',
  '/css/enhanced-features.css',
  '/Js/script.js',
  '/Js/theme.js',
  '/Js/enhanced-features.js',
  '/assets/icon.png',
  '/assets/logo.svg',
  '/assets/video.mp4',
  '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.log('Cache failed:', error);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200) {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              })
              .catch(error => {
                console.log('Failed to cache response:', error);
              });

            return response;
          })
          .catch(error => {
            console.log('Fetch failed:', error);
            
            // Return offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            
            // Return a basic error response for other requests
            return new Response('Network error', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline data
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/assets/icon.png',
    badge: '/assets/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View',
        icon: '/assets/icon.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/assets/icon.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Sundown Studio', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background sync function
function doBackgroundSync() {
  // Sync any pending data when connection is restored
  return new Promise((resolve) => {
    try {
      // Check for any pending operations in IndexedDB
      const request = indexedDB.open('sundown_studio_data', 1);
      
      request.onsuccess = function(event) {
        const db = event.target.result;
        if (db.objectStoreNames.contains('pendingOperations')) {
          const transaction = db.transaction(['pendingOperations'], 'readonly');
          const store = transaction.objectStore('pendingOperations');
          const getRequest = store.getAll();
          
          getRequest.onsuccess = function() {
            const pendingOperations = getRequest.result;
            
            if (pendingOperations.length > 0) {
              // Process pending operations
              pendingOperations.forEach(operation => {
                console.log('Processing pending operation:', operation);
              });
            }
            
            resolve();
          };
        } else {
          resolve();
        }
      };
      
      request.onerror = function() {
        console.log('IndexedDB access failed');
        resolve();
      };
    } catch (error) {
      console.log('Background sync error:', error);
      resolve();
    }
  });
}

// Handle offline/online status
self.addEventListener('online', event => {
  console.log('App is online');
  // Sync any pending data
  doBackgroundSync();
});

self.addEventListener('offline', event => {
  console.log('App is offline');
}); 